import Cors from 'cors'
import axios from 'axios'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST']
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware (req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
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

  const request = await axios.post('https://ivs.us-east-1.amazonaws.com/GetStream', {
    channelArn: 'arn:aws:ivs:us-east-1:655514092918:channel/IBqDDsJKrvYj',
    accessKeyId: 'AKIAZRH5PIV3F7DAMRZ2',
    secretAccessKey: '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'
  })

  console.log('req', request.data)
  res.status(200).json({ data: null })
}
