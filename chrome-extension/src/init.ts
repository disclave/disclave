import { init } from "@disclave/client";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG as string);
init(firebaseConfig, process.env.API_URL as string);
