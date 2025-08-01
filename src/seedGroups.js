const sampleGroups = [
  {
    name: 'Photography Enthusiasts',
    category: 'Photography',
    description:
      'Capture the beauty of everyday moments through your lens. Weekly photo challenges, technique sharing, and group exhibitions. All skill levels welcome.',
    location: 'Dhaka City Center',
    maxMembers: 25,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    isActive: true,
  },
  {
    name: 'Chess Masters Club',
    category: 'Chess',
    description:
      'Strategic thinking and friendly competition. Weekly tournaments, beginner lessons, and analysis of famous games. From novices to grandmasters, all are welcome.',
    location: 'Gulshan Chess Club',
    maxMembers: 20,
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1560174038-594a6e5e8c7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    isActive: true,
  },
  {
    name: 'Urban Cyclists',
    category: 'Cycling',
    description:
      'Explore the city on two wheels. Weekend rides, bike maintenance workshops, and advocacy for cycling infrastructure. Bring your own bike or borrow one from us.',
    location: 'Hatirjheel Lake',
    maxMembers: 30,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80',
    isActive: true,
  },
  {
    name: 'Cooking Adventures',
    category: 'Cooking',
    description:
      'Explore global cuisines and culinary techniques. Monthly cooking classes, recipe exchanges, and food tasting events. Ingredients and equipment provided.',
    location: 'Banani Community Kitchen',
    maxMembers: 15,
    startDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1968&q=80',
    isActive: true,
  },
  {
    name: 'DIY Craft Circle',
    category: 'DIY Craft',
    description:
      'Get creative with hands-on projects. Learn upcycling, paper crafts, jewelry making, and more. Materials provided, just bring your creativity.',
    location: 'Dhanmondi Art Center',
    maxMembers: 20,
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1499689496495-5bdf4421b725?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80',
    isActive: true,
  },
  {
    name: 'Book Club Explorers',
    category: 'Reading',
    description:
      'Dive into literary worlds together. Monthly book selections across genres, thoughtful discussions, and author spotlights. Digital and physical copies available.',
    location: 'Dhaka Public Library',
    maxMembers: 25,
    startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80',
    isActive: true,
  },
  {
    name: 'Yoga & Mindfulness',
    category: 'Wellness',
    description:
      'Connect body and mind through practice. Weekly sessions for all levels, meditation guidance, and wellness discussions. Mats and props provided.',
    location: 'Banani Park',
    maxMembers: 20,
    startDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80',
    isActive: true,
  },
  {
    name: 'Film Appreciation Society',
    category: 'Cinema',
    description:
      'Explore the art of filmmaking. Weekly screenings of classics and indie gems, director studies, and film theory discussions. Popcorn always provided.',
    location: 'Star Cineplex, Bashundhara',
    maxMembers: 30,
    startDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1979&q=80',
    isActive: true,
  },
  {
    name: 'Urban Sketchers',
    category: 'Art',
    description:
      'Document the city through drawing. Weekend sketch walks, technique demonstrations, and quarterly exhibitions. All drawing mediums and skill levels welcome.',
    location: 'Ramna Park',
    maxMembers: 15,
    startDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80',
    isActive: true,
  },
  {
    name: 'Coding & Tech Meetup',
    category: 'Technology',
    description:
      'Share knowledge and build together. Project collaborations, learning sessions, and hackathons. Bring your laptop and curiosity.',
    location: 'Innovation Hub, Gulshan',
    maxMembers: 25,
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80',
    isActive: true,
  },
]

async function createSampleGroups() {
  const currentUser = JSON.parse(
    localStorage.getItem(
      'firebase:authUser:AIzaSyC7T8sSgSksLxvMRNb4qwuS9XD81jM9YM:[DEFAULT]'
    )
  )

  if (!currentUser) {
    console.error('No user is currently logged in. Please log in first.')
    return
  }

  const { email, displayName, photoURL } = currentUser

  if (!email || !displayName) {
    console.error(
      'User information is incomplete. Please ensure you have a display name and email.'
    )
    return
  }

  console.log(`Creating 10 sample groups for ${displayName} (${email})...`)

  const groupsWithUserInfo = sampleGroups.map((group) => ({
    ...group,
    userName: displayName,
    userEmail: email,
    createdAt: new Date().toISOString(),
  }))

  let successCount = 0
  let failCount = 0

  for (const group of groupsWithUserInfo) {
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE + '/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group),
      })

      const result = await response.json()

      if (result.success) {
        console.log(`✅ Created group: ${group.name}`)
        successCount++
      } else {
        console.error(`❌ Failed to create group: ${group.name}`, result)
        failCount++
      }
    } catch (error) {
      console.error(`❌ Error creating group: ${group.name}`, error)
      failCount++
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  console.log(
    `✨ Finished creating sample groups: ${successCount} succeeded, ${failCount} failed`
  )
  console.log('You can now view your groups in the "My Groups" section!')
}

console.log(`
----------------------------------------------------
HobbyHub Group Generator
----------------------------------------------------
This script will create 10 diverse hobby groups for your account.
Make sure you're logged in before running this script.

To create the groups, call:
  createSampleGroups()

Example:
  createSampleGroups().then(() => console.log('All done!'))
----------------------------------------------------
`)

window.createSampleGroups = createSampleGroups
