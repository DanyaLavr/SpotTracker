const cleanPrice = (price: number): number =>
  Number(
    price > 1
      ? price.toFixed(2)
      : price >= 0.01
        ? price.toFixed(4)
        : price >= 0.0001
          ? price.toFixed(6)
          : price.toFixed(8),
  );

export default cleanPrice;
