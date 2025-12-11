import { db } from "@/lib/firebase/db";
import { doc, getDoc } from "firebase/firestore";
export const fetchUserBackpack = async (id) => {
  const docRef = doc(db, "backpack", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("Backpack not found");

  const data = docSnap.data()?.data || [];
  return [...data];
};
