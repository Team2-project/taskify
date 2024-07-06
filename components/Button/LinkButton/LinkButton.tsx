import { UrlObject } from "url";
import { ReactNode } from "react";
import Link from "next/link";
import DefaultButton from "../Button";

type LinkButtonProps = {
  to: string | UrlObject;
  children: ReactNode;
  className?: string;
};

export default function LinkButton({
  to,
  children = "",
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={to}>
      <DefaultButton {...rest}>{children}</DefaultButton>
    </Link>
  );
}

