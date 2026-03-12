import { NextRequest, NextResponse } from "next/server";

import { db } from "@/entities/user/libs/firebase/db";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import transporter from "@/features/auth/register/lib/nodemailer/transporter";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const docRef = doc(db, "verification_codes", email);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    const { lastSentAt } = snap.data();
    const diff = Date.now() - lastSentAt.toMillis();
    if (diff < 60000) {
      return NextResponse.json(
        { message: "Please wait before requesting a new code" },
        { status: 429 },
      );
    }
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await setDoc(docRef, {
    code,
    expiresAt: Timestamp.fromMillis(Date.now() + 15 * 60 * 1000),
    attempts: 0,
    lastSentAt: Timestamp.now(),
  });

  await transporter.sendMail({
    from: `"SpotTracker" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verification code",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
    <h2 style="color: #1a1a1a; margin-bottom: 8px;">SpotTracker</h2>
    <p style="color: #555; margin-bottom: 24px;">Your verification code:</p>
    <div style="background: #1a1a1a; color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; border-radius: 8px;">
      ${code}
    </div>
    <p style="color: #888; font-size: 13px; margin-top: 24px;">Code expires in <b>15 minutes</b>. If you didn't request this, ignore this email.</p>
  </div>
`,
  });

  return NextResponse.json({ message: "Code sent" });
}
