import Cors from 'cors'
import Instagram from 'instagram-web-api'

// const instagram = require('user-instagram');

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST']
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware (req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler (req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const client = new Instagram({ username: 'seekrlive', password: 'Fftb97Seekr' })
  await client.login()

  const response = await client.getPhotosByUsername({
    username: req.body.instagramUsername
  })

  console.log('response.user', response.user)

  // console.log('eq.body.instagramUsername', req.body.instagramUsername)
  // const request = await axios.get(`https://www.instagram.com/${req.body.instagramUsername}/channel/?__a=1`)
  // console.log('request', request.data.graphql.user.edge_owner_to_timeline_media.edges)
  // const request = await axios.get(`https://graph.instagram.com/v11.0/${}&access_token={access-token}`)

  // const profile = await InstaClient.getProfile(req.body.instagramUsername)

  // console.log('profile', profile)
  // .then(profile => console.log('profile', profile))
  // .catch(err => console.error(err))

  res.status(200).json({
    data: {
      profile_pic: response.user.profile_pic_url,
      posts: response.user.edge_owner_to_timeline_media.edges.map(post => post.node)
    }
  })
}
