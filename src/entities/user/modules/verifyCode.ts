export const verifyCode = async (email: string, code: string) => {
  const res = await fetch("/api/auth/verifyCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
