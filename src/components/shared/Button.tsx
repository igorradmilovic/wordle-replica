import { ComponentPropsWithRef, PropsWithChildren } from "react";

export const Button = ({
  className,
  children,
  ...rest
}: PropsWithChildren<ComponentPropsWithRef<"button">>) => {
  return (
    <button
      className={`px-[24px] py-[6px] rounded-md cursor-pointer hover:brightness-90 active:scale-95 uppercase font-extrabold tracking-wide ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
