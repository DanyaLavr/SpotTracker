import { db } from "@/entities/user/libs/firebase/db";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();
  if (!email || !code || code.length !== 6)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const ref = doc(db, "verification_codes", email);
  const snap = await getDoc(ref);

  if (!snap.exists())
    return NextResponse.json({ message: "Code not found" }, { status: 404 });

  const { code: savedCode, attempts, expiresAt } = snap.data();

  if (attempts >= 5)
    return NextResponse.json({ message: "Too many attempts" }, { status: 429 });

  if (expiresAt.toMillis() < Date.now())
    return NextResponse.json({ message: "Code expired" }, { status: 410 });

  if (savedCode !== code) {
    await updateDoc(ref, { attempts: increment(1) });
    return NextResponse.json({ message: "Invalid code" }, { status: 400 });
  }

  await deleteDoc(ref);
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
