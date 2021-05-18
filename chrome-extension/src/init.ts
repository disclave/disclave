import { init } from "@disclave/client";
import { apiUrl, domain, firebaseConfig } from "./config";

init(firebaseConfig, apiUrl, domain);
