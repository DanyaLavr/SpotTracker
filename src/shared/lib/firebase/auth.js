import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./app";

export const auth = getAuth(app);
