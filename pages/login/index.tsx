import React, { useState, useEffect } from "react";
import Form from "@/components/Form/FormField/FormField";
import Link from "next/link";
import Image from "next/image";
import { instance } from "@/lib/api/axios";
import { validateEmail, validatePassword } from "@/lib/validation";
import Modal from "@/components/Modal/BasicModal";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    // 사용자 정보에 대한 타입 정의
  };
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
  const [modalButtonText, setModalButtonText] = useState<string>("");
  const [modalButtonAction, setModalButtonAction] = useState<() => void>(
    () => {},
  );

  const router = useRouter();

  async function login({ email, password }: LoginData) {
    const response = await instance.post("/auth/login", { email, password });
    const accessToken = response.data.accessToken;

    localStorage.setItem("accessToken", accessToken); // 토큰 저장
    return response.data;
  }

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      router.push("/mydashboard");
    },
    onError: (error) => {
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
    },
  });

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
      await mutation.mutateAsync({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
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
