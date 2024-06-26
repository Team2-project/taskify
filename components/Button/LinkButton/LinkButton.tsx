import Link from "next/link";
import { UrlObject } from "url";
import DefaultButton from "../Button";
import { ReactNode } from "react";

type LinkButtonProps = {
  className?: string;
  children: ReactNode;
  to: string | UrlObject;
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

