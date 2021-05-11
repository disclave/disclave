import { init } from "@disclave/client";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG as string);
const apiUrl = process.env.API_URL as string;
const domain = process.env.DOOMAIN as string;
init(firebaseConfig, apiUrl, domain);
