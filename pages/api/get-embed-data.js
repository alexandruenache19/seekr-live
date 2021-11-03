import Cors from "cors";
import axios from "axios";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"]
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const url = req.body.url;
  const omitScript = !(req.body.omit_script && req.body.omit_script === "0");

  let iframelyUrl = `https://iframe.ly/api/oembed?url=${url}&api_key=dcd7f036f1b5ac3da6c341&_showcaption=true&_theme=dark`;
  if (omitScript === true) {
    iframelyUrl += "&iframe=1&omit_script=1";
  }
  const oembedReq = await axios.get(iframelyUrl);
  res.status(200).json({ data: oembedReq.data });
}
