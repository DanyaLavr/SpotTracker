import CloseModalButton from "../buttons/CloseModalButton";

export default function ModalBackground({ children }) {
  return (
    <div
      className="w-lg relative bg-white border border-stone-200 px-7 py-10 rounded-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <CloseModalButton className={"absolute top-4 right-2"} />
      {children}
    </div>
  );
}
