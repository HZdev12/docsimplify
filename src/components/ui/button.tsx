import * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}
export function Button({ children, variant, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
