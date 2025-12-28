export const getNextCrypto = async () => {
  const res = await fetch("http://localhost:3000/api/cryptos", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data;
};
