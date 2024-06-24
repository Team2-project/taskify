import { useState } from "react";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 로직 추가예정
    console.log({ email, password });
  };

  return (
    <div className='mt-36 flex items-center justify-center tablet:mt-60 desktop:m-56'>
      <div>
        <Link href='/'>
          <div className='flex justify-center'>
            <Image
              src='logo/logo_img-text.svg'
              alt='logo'
              width={120}
              height={167.4}
              priority
              className='form-logo-image'
            />
          </div>
        </Link>
        <h1 className='mb-10 mt-2 text-center text-xl font-medium'>
          오늘도 만나서 반가워요!
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field
            label='이메일'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력해 주세요'
          />
          <Form.Field
            label='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호를 입력해 주세요'
          />
          <Form.Button>로그인</Form.Button>
          <div className='text-center text-base font-normal'>
            <span className='mr-1'>회원이 아니신가요?</span>
            <Link href='/signup'>
              <span className='text-violet-20 underline'>회원가입하기</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
