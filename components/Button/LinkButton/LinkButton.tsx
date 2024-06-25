import Link from "next/link";
import { UrlObject } from "url";
import DefaultButton from "../Button";

type LinkButtonProps = {
  className?: string;
  to: string | UrlObject;
};

export default function LinkButton({ to, ...rest }: LinkButtonProps) {
  return (
    <Link href={to}>
      <DefaultButton {...rest}>로그인하기</DefaultButton>
    </Link>
  );
}

