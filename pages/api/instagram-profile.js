import Cors from "cors";
import Instagram from "instagram-web-api";

// const instagram = require('user-instagram');

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

  const client = new Instagram({
    username: "seekrlive",
    password: "Fftb97Seekr"
  });
  await client.login();

  const response = await client.getPhotosByUsername({
    username: req.body.instagramUsername
  });

  res.status(200).json({
    data: {
      profile_pic: response.user.profile_pic_url,
      posts: response.user.edge_owner_to_timeline_media.edges.map(
        post => post.node
      )
    }
  });
}
