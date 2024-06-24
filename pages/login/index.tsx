import { useState, useEffect } from "react";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Image from "next/image";
import { instance } from "@/lib/api/axios";
import axios from "axios";
import { validateEmail, validatePassword } from "@/lib/validation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (!emailValidation && !passwordValidation) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowEmailError(true);
      setShowPasswordError(true);
      return;
    }

    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
      });
      console.log("로그인 성공:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("로그인 실패:", error.response.data);
        } else if (error.request) {
          console.error("서버로부터 응답이 없습니다:", error.request);
        } else {
          console.error("로그인 요청 중 에러 발생:", error.message);
        }
      } else {
        console.error("예상치 못한 에러 발생:", error);
      }
    }
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
        <Form onSubmit={handleSubmit} isFormValid={isFormValid}>
          <Form.Field
            label='이메일'
            type='email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowEmailError(true);
            }}
            placeholder='이메일을 입력해 주세요'
            error={emailError}
            showError={showEmailError}
          />
          <Form.Field
            label='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setShowPasswordError(true);
            }}
            placeholder='비밀번호를 입력해 주세요'
            error={passwordError}
            showError={showPasswordError}
          />
          <Form.Button isFormValid={isFormValid}>로그인</Form.Button>
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
