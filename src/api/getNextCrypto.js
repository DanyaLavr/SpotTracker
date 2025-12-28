export const getNextCrypto = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptos`, {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data;
};
