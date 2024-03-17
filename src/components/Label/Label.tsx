import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  children: ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};
