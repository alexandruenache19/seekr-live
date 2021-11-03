import Cors from "cors";

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

  const base64file = req.body.base64file;
  const bucket = req.body.bucket;
  const objectId = req.body.objectId;
  const keyPrefix = req.body.keyPrefix || null;

  const data = Buffer.from(
    base64file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64file.split(";")[0].split("/")[1];
  const key = `${keyPrefix}/${objectId}.${type}`;

  const AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: "AKIA4OJ34NK6RYRG4REF",
    secretAccessKey: "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"
  });

  const params = {
    Bucket: bucket,
    Key: key,
    Body: data,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: `image/${type}` // required. Notice the back ticks
  };

  const { Location, Key } = await s3.upload(params).promise();

  res.status(200).json({ data: "https://s3.amazonaws.com/odin-images/" + key });

  // await axios.get(`https://odin-ba050-default-rtdb.firebaseio.com/public-items.json?orderBy="timestamp"&endAt=${toTimestamp}&limitToLast=${8}&auth=${FIREBASE_SECRET}`)
  //   .then(({ data }) => {
  //     res.status(200).json({ data })
  //   }).catch((err) => {
  //     res.status(400).json({ err })
  //   })
}
