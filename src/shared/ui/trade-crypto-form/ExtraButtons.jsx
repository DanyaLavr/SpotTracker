const ExtraButtons = ({
  buttons,
  name,
  cryptoForSell,
  crypto,
  handlers,
  setFieldValue,
  values,
}) => {
  const { handleChange } = handlers;
  return (
    <ul className="flex gap-2 mt-2">
      {buttons.map((elem, idx) => (
        <li key={idx}>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 active:bg-zinc-600 active:scale-95 cursor-pointer"
            onClick={() => {
              const value =
                name !== "sellAmount"
                  ? (cryptoForSell[name] * elem) / 100
                  : (crypto.last * cryptoForSell.count * elem) / 100;

              setFieldValue(name, value);
              handleChange(
                {
                  target: {
                    name,
                    value,
                  },
                },
                values,
                setFieldValue
              );
            }}
          >
            {elem}%
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExtraButtons;
