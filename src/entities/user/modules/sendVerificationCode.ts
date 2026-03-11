export const sendVerificationCode = async (email: string) => {
  const res = await fetch("/api/auth/sendVerificationCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
