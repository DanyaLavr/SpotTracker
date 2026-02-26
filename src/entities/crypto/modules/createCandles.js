export const createCandles = (array) =>
  array
    .map((elem) => ({
      time: Number(elem[0]) / 1000,
      open: Number(elem[1]),
      high: Number(elem[2]),
      low: Number(elem[3]),
      close: Number(elem[4]),
    }))
    .sort((a, b) => a.time - b.time);
