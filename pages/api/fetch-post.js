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

  console.log('req', req.body)
  let detailedTitle = null

  try {
    const titleRequest = await axios.get(`https://api.instagram.com/oembed/?url=${req.body.url}`)
    detailedTitle = titleRequest.data.title
  } catch (error) {

  }

  const request = await axios.post('https://wg2q96jx3d.execute-api.us-east-1.amazonaws.com/prod/collect-return', {
    ...req.body
  })

  //   await axios.post('https://wg2q96jx3d.execute-api.us-east-1.amazonaws.com/prod/collect', {
  //     input: req.body.input,
  //     stateMachineArn: 'arn:aws:states:us-east-1:855360957117:stateMachine:InvokeCollectStateFunc'
  //   })

  res.status(200).json({
    data: {
      ...request.data,
      title: detailedTitle || request.data.title
    }
  })
}
