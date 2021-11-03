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

  const orderDetails = {
    sender: {
      contact: {
        name: "Test test",
        phone: "+40722222222",
        phone2: "0722222223",
        email: "contact@example.com"
      },
      address: {
        countryCode: "RO",
        postalCode: "300375",
        city: "Timișoara",
        county: "Timiș",
        street: "Piața Avram Iancu",
        number: "6",
        block: "15",
        entrance: "A",
        intercom: "32",
        floor: "2",
        apartment: "15"
      }
    },
    recipient: {
      contact: {
        name: "Test2 test2",
        phone: "+40722222222",
        company: "Test Company"
      },
      address: {
        countryCode: "RO",
        postalCode: "310152",
        city: "Arad",
        county: "Arad",
        street: "Băncilă Octav",
        number: "123"
      }
    },
    packages: {
      type: 2,
      content: "Test content",
      list: [
        {
          weight: 2.3,
          width: 15,
          height: 17,
          length: 19
        }
      ]
    },
    service: {
      selectionType: "bestPrice",
      serviceIds: [1, 2, 3, 4]
    },
    extraOptions: []
  };

  const authorizationReq = await axios.post(
    "https://auth.colete-online.ro/token",
    { grant_type: "client_credentials" }
  );

  res.status(200).json({ data: {} });
}
