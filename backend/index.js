import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import functions from 'firebase-functions'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

let MONGODB_URI, DB_NAME

try {
  const config = functions.config()
  MONGODB_URI = process.env.MONGODB_URI || config.hobbyhub?.mongodb_uri
  DB_NAME = process.env.DB_NAME || config.hobbyhub?.db_name || 'hobbyHubDB'
  console.log('MongoDB URI:', MONGODB_URI ? 'Set' : 'Not set')
  console.log('DB Name:', DB_NAME)
} catch (error) {
  console.error('Config error:', error)
  MONGODB_URI = process.env.MONGODB_URI
  DB_NAME = process.env.DB_NAME || 'hobbyHubDB'
}

let client, groupsCol, joinedCol

async function connectDB() {
  if (groupsCol) return
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not configured')
  }
  console.log('Attempting to connect to MongoDB...')

  try {
    client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    })
  } catch (error) {
    console.log('First connection attempt failed, trying with SSL disabled...')

    const uriWithoutSSL = MONGODB_URI.replace('ssl=true', 'ssl=false').replace(
      '&tlsInsecure=true',
      ''
    )
    client = await MongoClient.connect(uriWithoutSSL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    })
  }

  const db = client.db(DB_NAME)
  groupsCol = db.collection('groups')
  joinedCol = db.collection('joinedGroups')
  console.log('✅ MongoDB connected successfully')
}

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    console.error('DB connection error:', error.message)
    return res
      .status(500)
      .json({ message: 'DB connection failed', error: error.message })
  }
})

app.get('/', (req, res) => res.send('HobbyHub API v2'))

app.post('/api/groups', async (req, res) => {
  try {
    // Ensure isActive is always set to true by default
    const groupData = { ...req.body, isActive: req.body.isActive ?? true }
    const result = await groupsCol.insertOne(groupData)
    res.json({ success: true, id: result.insertedId })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/groups', async (req, res) => {
  try {
    const groups = await groupsCol.find().sort({ startDate: 1 }).toArray()
    res.json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/groups/:id', async (req, res) => {
  try {
    const group = await groupsCol.findOne({ _id: new ObjectId(req.params.id) })
    if (!group) return res.status(404).json({ message: 'Not found' })
    res.json(group)
  } catch {
    res.status(400).json({ message: 'Invalid ID' })
  }
})

app.put('/api/groups/:id', async (req, res) => {
  try {
    const result = await groupsCol.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    )
    res.json({ success: result.modifiedCount > 0 })
  } catch {
    res.status(400).json({ message: 'Invalid ID' })
  }
})

app.delete('/api/groups/:id', async (req, res) => {
  try {
    const result = await groupsCol.deleteOne({
      _id: new ObjectId(req.params.id),
    })
    res.json({ success: result.deletedCount > 0 })
  } catch {
    res.status(400).json({ message: 'Invalid ID' })
  }
})

app.get('/api/myGroups', async (req, res) => {
  if (!req.query.email)
    return res.status(400).json({ message: 'Email required' })
  try {
    const groups = await groupsCol
      .find({ userEmail: req.query.email })
      .toArray()
    res.json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/joinGroup', async (req, res) => {
  const { groupId, email } = req.body
  if (!groupId || !email)
    return res.status(400).json({ message: 'groupId & email required' })

  try {
    const group = await groupsCol.findOne({ _id: new ObjectId(groupId) })
    if (!group) return res.status(404).json({ message: 'Group not found' })
    // Only block joining if isActive is explicitly set to false
    // This allows joining both for groups without the property and those with isActive=true
    if (group.isActive === false)
      return res.status(400).json({ message: 'Group is no longer active' })

    // Check for joined users with different possible formats of groupId
    const joinedCount = await joinedCol.countDocuments({
      $or: [
        { groupId },
        { groupId: groupId.toString() },
        { groupId: new ObjectId(groupId).toString() },
      ],
    })

    if (joinedCount >= group.maxMembers)
      return res.status(400).json({ message: 'Group is full' })

    // Check if already joined with different possible formats of groupId
    const alreadyJoined = await joinedCol.findOne({
      $or: [
        { groupId, email },
        { groupId: groupId.toString(), email },
        { groupId: new ObjectId(groupId).toString(), email },
      ],
    })

    if (alreadyJoined)
      return res.status(400).json({ message: 'Already joined' })

    // Always store groupId as string to maintain consistency
    await joinedCol.insertOne({
      groupId: groupId.toString(),
      email,
      joinedAt: new Date(),
    })

    console.log(`User ${email} joined group ${groupId}`)
    res.json({ success: true })
  } catch (error) {
    console.error('Join group error:', error)
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/hasJoined', async (req, res) => {
  const { groupId, email } = req.query
  if (!groupId || !email)
    return res.status(400).json({ message: 'groupId & email required' })
  try {
    // Check for different possible formats of groupId
    const joined = await joinedCol.findOne({
      $or: [
        { groupId, email },
        { groupId: groupId.toString(), email },
        { groupId: new ObjectId(groupId).toString(), email },
      ],
    })

    // For debugging
    console.log(
      `Checking if user ${email} has joined group ${groupId}:`,
      !!joined
    )

    res.json({ hasJoined: !!joined })
  } catch (error) {
    console.error('hasJoined error:', error)
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/joinedGroups', async (req, res) => {
  const { groupId } = req.query
  if (!groupId) return res.status(400).json({ message: 'groupId required' })
  try {
    console.log(`Fetching joined users for group ${groupId}`)

    // Check if the groupId might be stored in different formats
    const joinedUsers = await joinedCol
      .find({
        $or: [
          { groupId },
          { groupId: groupId.toString() },
          { groupId: new ObjectId(groupId).toString() },
        ],
      })
      .toArray()

    console.log(`Found ${joinedUsers.length} joined users`)
    res.json(joinedUsers)
  } catch (error) {
    console.error('Error fetching joined users:', error)
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/joinedCount/:groupId', async (req, res) => {
  try {
    const count = await joinedCol.countDocuments({
      groupId: req.params.groupId,
    })
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Debug endpoint to help diagnose join issues
app.get('/api/debugJoinStatus/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params
    const { email } = req.query

    // Get all joined users for this group
    const joinedUsers = await joinedCol.find({ groupId }).toArray()

    // Check if specific user has joined (if email provided)
    let userJoinStatus = null
    if (email) {
      const userJoined = await joinedCol.findOne({ groupId, email })
      userJoinStatus = { hasJoined: !!userJoined, joinRecord: userJoined }
    }

    // Get group details
    const group = await groupsCol.findOne({ _id: new ObjectId(groupId) })

    res.json({
      groupDetails: group,
      joinedCount: joinedUsers.length,
      joinedUsers,
      userJoinStatus,
    })
  } catch (error) {
    console.error('Debug join status error:', error)
    res.status(500).json({ message: error.message })
  }
})

export const api = functions.https.onRequest(app)

if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
