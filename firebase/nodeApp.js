import * as admin from "firebase-admin";

const NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyAhpfn4y_u8T8MT9sVXfrZ_Hq3gP3s7AOg";
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "seekr-live.firebaseapp.com";
const NEXT_PUBLIC_FIREBASE_DATABASE_URL =
  "https://seekr-live-default-rtdb.firebaseio.com";
const NEXT_PUBLIC_FIREBASE_PROJECT_ID = "seekr-live";
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "seekr-live.appspot.com";
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "729457766335";
const NEXT_PUBLIC_FIREBASE_APP_ID = "1:729457766335:web:06ca5153842eef5357fb0a";

const FIREBASE_CLIENT_EMAIL =
  "firebase-adminsdk-pw61v@seekr-live.iam.gserviceaccount.com";
const FIREBASE_PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtbQNQdEa9Saa0\nt6JvT3VAzrC4pV3YCqYCCkM/ZO5N4cbXJm6x5imta01xOlj+fMabfa9d10qV1R2S\nXnm4AoxZ5qur3uoLFhpDmKjVNS1JM8JDNhjqLtvYoD65639PFvgvrqU1GIog0PGo\nvkjkgzE2NQ67nAziXLwJyKETYAOMDGI3nADwbVkLnIyTTo5nl0G51DGxulcmTgE8\nY98IbUmTsMGryalZ7/NY4+NI6uNHWCbG2KZ8oeylvKuRnY+P2EX9iobNnXeOl3w7\nw5JoNx5csmnRSQ0TNgPY2WxUPFXY4L1PM+7CDcB8OVJas2jiF4S+lphvBfrPwmAK\nKwS8r1qZAgMBAAECggEAASmvGkptTLZ5I641PuZkWSkuMrx21TEmOqnYGHHdYFTh\ngQDyrjRmlpFf5450BuDOKK3jD7RN2N2g82rdm8f2Tqrd2qrhHJMPppfO4NqGbOxe\nx17gWHY0iyon5hYX3QGcIrEj8nDoQMOBUioLUe82HdU3hu3vyncMtyZdO9bhiqLX\nyhq/863FDAcmn839xelF2f7MrK5gwAvNayFVqBz6ekTylrfHtRN1y22ycFho9MU8\nNRsJOHML3CEdwvnTQKqhhjFEVWmIDCjrxAf7SfxU7jR8HQGJ02ESOBOQxlPLIt3z\nZaeNou2rTKxiuxv69S1gQuKDHjwvJfL8VHM71ygm8QKBgQDgW5M81rj2T4BjEc5v\nbV/+HMTBHxDJeIYCIpLKvyGC8F8TZOdKn3r+gQKOiHBs7DnTpt6k2ZVH2LEX8Ghz\nVEUmYUEUBNmuumd5zOoL1I+Y7BPtsnqZoJ6eUlKkkQeqzOGxyLN4NdSWvcEop30f\n5O5M2fRXKGbDjUOm26re7tjQCwKBgQDF4otleT4dxqXE6awksYihQHe/G17Q2BIL\ntQI5D4AyRRw/8vHvX7oxFG5kNP+HpRPEnJbHWKhCvilvSjp4U3Hjiq6CiMKZ50Ox\npkIekIvbLovSzfLAeo7PDU9bIhWFizJS/vUO5tf9b2wxUWys2a3fhc5czdpU+gLj\ndKnse/LyawKBgH+7o1g/545UNQQyXxWRb9V9C4fn5+bMd38/r9M+fhXORFMGX6hc\no+nCCXKcu2VIGKQnnRq9xf/hnvHCLbV7hOMU+7gqCsUv2zm9MIMLwbWOssnhk2tj\nxurcc7C94V+cxeIyIfuOqjooTpCWyuYdsI6QiEwW9GrhQmL9LYs+8LGBAoGBALs4\nZHRkKm3XhPzxrCmnQkJ2ERVhWuqykxg6cFj2Hm7xThH+1AGLC0jmMK9kKSL3/uT0\n1f7TFZbX/bHKg9lV8Zm7mvHrXFpqIHTSfRoX3gpIVofizDppefXRfPQXIk+P69P0\nXnxz0YR5R969T9mVtdiV6zGInXnqdJMozJ/ugWPzAoGBALfJy1kfQQJXCfGAdqHj\n2BBKq1o98I+1TBbNH+HppBlEQg1CmvAVsyFNaKbqAeFt7IA+QlcM5sH1PgKbc8+J\nKRR5SEJ8J1252g3817diG23CbnSKb7/LJikHD/3JOZon4moneEr2wCevRCSvtSn1\n0165ALljBA9FuNxPjdcF2B18\n-----END PRIVATE KEY-----\n";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    }),
    databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

export default admin;
