import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { MdClose } from "react-icons/md";

type Props = PropsWithChildren<ComponentPropsWithRef<"div">> & {
  title: string;
  show: boolean;
  onClose(): void;
};

export const Modal = ({ className, children, title, show, onClose, ...rest }: Props) => {
  return show ? (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-zinc-800/90 flex justify-center items-center z-10"
      onClick={(e) => e.preventDefault()}
    >
      <div
        className={`h-[300px] sm:h-[350px] w-[90%] sm:w-[700px] bg-zinc-900/90 rounded-md border border-zinc-700 ${className}`}
        {...rest}
      >
        <header className="text-4xl font-bold rounded-tl-md rounded-tr-md bg-stone-800 p-5 flex justify-between items-center">
          <span>{title}</span>
          <span className="hover:brightness-75 cursor-pointer" onClick={() => onClose()}>
            <MdClose />
          </span>
        </header>
        <div className="p-5">{children}</div>
      </div>
    </div>
  ) : null;
};
