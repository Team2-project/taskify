import React, { useState, useEffect } from "react";
import Form from "@/components/Form/FormField/FormField";
import Link from "next/link";
import Image from "next/image";
import { instance } from "@/lib/api/axios";
import { validateEmail, validatePassword } from "@/lib/validation";
import Modal from "@/components/Modal/AlarmModal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {};
  message?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalButtonText, setModalButtonText] = useState<string>("확인");
  const [modalButtonAction, setModalButtonAction] = useState<() => void>(
    () => {},
  );

  const router = useRouter();

  const login = async ({
    email,
    password,
  }: LoginData): Promise<LoginResponse> => {
    try {
      const response = await instance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const accessToken = response.data.accessToken;
      const expires = 7 * 24 * 60 * 60 * 1000;
      Cookies.set("accessToken", accessToken, { expires }); // 7일 동안 유효한 쿠키 설정
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // 페이지 진입 시 쿠키에서 accessToken을 가져옴
    const accessToken = Cookies.get("accessToken");

    // 만약 accessToken이 존재한다면, 이미 로그인된 상태이므로 대시보드 페이지로 리다이렉트
    if (accessToken) {
      router.push("/mydashboard");
    }
  }, []);

  useEffect(() => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    setIsFormValid(!emailValidation && !passwordValidation);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowEmailError(true);
      setShowPasswordError(true);
      return;
    }

    try {
      const data = await login({ email, password });
      router.push("/mydashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setIsModalOpen(true);
          setModalMessage(`${error.response.data.message}`);
          setModalButtonText("확인");
          setModalButtonAction(() => {});
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
    <div className='flex h-screen items-center justify-center'>
      <div>
        <Link href='/'>
          <div className='relative m-auto flex h-168 w-120 items-center justify-center tablet:h-279 tablet:w-200'>
            <Image src='logo/logo_img-text.svg' alt='logo' fill priority />
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
          buttonText={modalButtonText}
          buttonAction={modalButtonAction}
        />
      </div>
    </div>
  );
};

export default LoginPage;
