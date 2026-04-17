import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../../shared/lib/firebase/app";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
