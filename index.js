import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
)
app.use(express.json())

let clientPromise
let groupsCol, joinedCol

async function connectDB() {
  try {
    if (!clientPromise) {
      const client = new MongoClient(process.env.MONGODB_URI)
      clientPromise = client.connect()
    }
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME || 'hobbyHubDB')
    groupsCol = db.collection('groups')
    joinedCol = db.collection('joinedGroups')
    return { groupsCol, joinedCol }
  } catch (err) {
    console.error('MongoDB Connection Error:', err)
    throw err
  }
}

if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => console.log('✅ MongoDB connected'))
}

async function ensureDbConnected(req, res, next) {
  try {
    if (!groupsCol || !joinedCol) {
      const { groupsCol: gCol, joinedCol: jCol } = await connectDB()
      groupsCol = gCol
      joinedCol = jCol
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    })
  }
}

app.use('/api', ensureDbConnected)

app.get('/', (_, res) => res.send('HobbyHub API is running 🚀'))

app.post('/api/groups', async (req, res) => {
  try {
    const result = await groupsCol.insertOne(req.body)
    res.json({ success: true, id: result.insertedId })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

app.get('/api/groups', async (_, res) => {
  try {
    const groups = await groupsCol.find().sort({ startDate: 1 }).toArray()
    res.json(groups)
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

app.get('/api/groups/:id', async (req, res) => {
  try {
    const group = await groupsCol.findOne({
      _id: new ObjectId(req.params.id),
    })
    if (!group) return res.status(404).json({ message: 'Group not found' })
    res.json(group)
  } catch (e) {
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
  } catch (e) {
    res.status(400).json({ message: 'Invalid ID' })
  }
})

app.delete('/api/groups/:id', async (req, res) => {
  try {
    const result = await groupsCol.deleteOne({
      _id: new ObjectId(req.params.id),
    })
    res.json({ success: result.deletedCount > 0 })
  } catch (e) {
    res.status(400).json({ message: 'Invalid ID' })
  }
})

app.get('/api/myGroups', async (req, res) => {
  const { email } = req.query
  if (!email) return res.status(400).json({ message: 'Email required' })
  try {
    const myGroups = await groupsCol.find({ userEmail: email }).toArray()
    res.json(myGroups)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.post('/api/joinGroup', async (req, res) => {
  try {
    const { groupId, email } = req.body
    if (!groupId || !email)
      return res.status(400).json({ message: 'groupId & email required' })

    const group = await groupsCol.findOne({ _id: new ObjectId(groupId) })
    if (!group) return res.status(404).json({ message: 'Group not found' })

    if (group.isActive === false)
      return res.status(400).json({ message: 'Group is no longer active' })

    const currentJoined = await joinedCol.countDocuments({ groupId })
    if (currentJoined >= group.maxMembers)
      return res.status(400).json({ message: 'Group is full' })

    const already = await joinedCol.findOne({ groupId, email })
    if (already)
      return res
        .status(400)
        .json({ message: 'You have already joined this group' })

    await joinedCol.insertOne({
      groupId,
      email,
      joinedAt: new Date(),
    })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/api/joinedGroups', async (req, res) => {
  const { groupId } = req.query
  if (!groupId) return res.status(400).json({ message: 'groupId required' })

  try {
    const joinedUsers = await joinedCol.find({ groupId }).toArray()
    res.json(joinedUsers)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/api/hasJoined', async (req, res) => {
  const { groupId, email } = req.query
  if (!groupId || !email)
    return res.status(400).json({ message: 'groupId & email required' })

  try {
    const record = await joinedCol.findOne({ groupId, email })
    res.json({ hasJoined: !!record })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/api/joinedCount/:groupId', async (req, res) => {
  try {
    const count = await joinedCol.countDocuments({
      groupId: req.params.groupId,
    })
    res.json({ count })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () =>
    console.log(`Server ready on http://localhost:${PORT}`)
  )
}

export default app
