import { useState, useEffect } from "react";
import Form from "@/components/Form/FormField/FormField";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { instance } from "@/lib/api/axios";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/lib/validation";
import Modal from "@/components/Modal/BasicModal";
import { useRouter } from "next/router";

interface SignupData {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalButtonText, setModalButtonText] = useState<string>("");
  const [modalButtonAction, setModalButtonAction] = useState<() => void>(
    () => {},
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const signup = async ({
    email,
    nickname,
    password,
  }: SignupData): Promise<SignupResponse> => {
    const response = await instance.post<SignupResponse>("/users", {
      email,
      nickname,
      password,
    });
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowEmailError(true);
      setShowNicknameError(true);
      setShowPasswordError(true);
      setShowConfirmPasswordError(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await signup({ email, nickname, password });
      setIsModalOpen(true);
      setModalMessage("가입이 완료되었습니다!");
      setModalButtonText("확인");
      setModalButtonAction(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && typeof error.response.data === "object") {
          const errorMessage = error.response.data.message;
          if (errorMessage) {
            setIsModalOpen(true);
            setModalMessage(errorMessage);
            setModalButtonText("확인");
            setModalButtonAction(() => {});
          }
        } else if (error.request) {
          console.error("서버로부터 응답이 없습니다:", error.request);
        } else {
          console.error("회원가입 요청 중 에러 발생:", error.message);
        }
      } else {
        console.error("예상치 못한 에러 발생:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const emailValidation = validateEmail(email);
    const nicknameValidation = validateNickname(nickname);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation =
      password !== confirmPassword ? "비밀번호가 일치하지 않습니다." : "";

    setEmailError(emailValidation);
    setNicknameError(nicknameValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    setIsFormValid(
      !emailValidation &&
        !nicknameValidation &&
        !passwordValidation &&
        !confirmPasswordValidation &&
        isAgreed,
    );
  }, [email, nickname, password, confirmPassword, isAgreed]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        <Link href='/'>
          <div className='relative m-auto flex h-168 w-120 items-center justify-center tablet:h-279 tablet:w-200'>
            <Image
              src='logo/logo_img-text.svg'
              alt='logo'
              layout='fill'
              priority
              className='form-logo-image object-contain'
            />
          </div>
        </Link>
        <h1 className='mb-10 mt-2 text-center text-xl font-medium'>
          첫 방문을 환영합니다!
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
            label='닉네임'
            type='text'
            name='nickname'
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setShowNicknameError(true);
            }}
            placeholder='닉네임을 입력해 주세요'
            error={nicknameError}
            showError={showNicknameError}
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
            placeholder='8자 이상 입력해 주세요'
            error={passwordError}
            showError={showPasswordError}
          />
          <Form.Field
            label='비밀번호 확인'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setShowConfirmPasswordError(true);
            }}
            placeholder='비밀번호를 한번 더 입력해 주세요'
            error={confirmPasswordError}
            showError={showConfirmPasswordError}
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
          <Form.Button isFormValid={isFormValid}>
            {loading ? "회원가입 중..." : "회원가입"}
          </Form.Button>
          <div className='text-center text-base font-normal'>
            <span className='mr-1'>이미 가입하셨나요?</span>
            <Link href='/login'>
              <span className='text-violet-20 underline'>로그인하기</span>
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

export default SignupPage;
