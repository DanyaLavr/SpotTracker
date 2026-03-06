import CloseModalButton from "../buttons/CloseModalButton";
import { ReactNode } from "react";

 interface IProps{
  handleClose?:()=>void,
  children: ReactNode,
 }
export default function ModalBackground({ handleClose, children }:IProps) {
  return (
    <div
      className="grid gap-5 content-start h-5/6 md:h-auto w-full md:w-lg relative bg-white border border-stone-200 px-7 py-10 rounded-t-2xl md:rounded-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <CloseModalButton
        handleClose={handleClose}
        className={"absolute top-4 right-2"}
      />
      {children}
    </div>
  );
}
