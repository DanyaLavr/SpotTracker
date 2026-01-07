import { getFirestore } from "firebase/firestore";
import { app } from "../../../../shared/lib/firebase/app";

export const db = getFirestore(app);
