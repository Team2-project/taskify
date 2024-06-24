import { useState } from "react";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Image from "next/image";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("이용약관에 동의해야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 로직 추가예정
    console.log({ email, nickname, password });
  };

  return (
    <div className='mb-10 mt-36 flex items-center justify-center tablet:mt-60 desktop:m-56 desktop:mb-5'>
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
          첫 방문을 환영합니다!
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
            label='닉네임'
            type='text'
            name='nickname'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='닉네임을 입력해 주세요'
          />
          <Form.Field
            label='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='8자 이상 입력해 주세요'
          />
          <Form.Field
            label='비밀번호 확인'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='비밀번호를 한번 더 입력해 주세요'
          />
          <div className='mb-4 mt-4 flex items-center'>
            <input
              type='checkbox'
              id='terms'
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className='mr-2'
            />
            <label htmlFor='terms'>이용약관에 동의합니다</label>
          </div>
          <Form.Button>회원가입</Form.Button>
          <div className='text-center text-base font-normal'>
            <span className='mr-1'>이미 가입하셨나요?</span>
            <Link href='/login'>
              <span className='text-violet-20 underline'>로그인하기</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
