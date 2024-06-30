import React, { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import ResponsiveImage from "@/components/ResponsiveImage";
import Form from "@/components/Form/FormField/FormField";
import DefaultButton from "@/components/Button";
import { validateEmail, validateNickname } from "@/lib/validation";

// Jotai를 사용한 상태 관리
const profileEmailAtom = atom("");
const nicknameAtom = atom("");
const profileEmailErrorAtom = atom("");
const nicknameErrorAtom = atom("");
const isProfileFormValidAtom = atom(false);

const ProfileUpdate: React.FC = () => {
  const [profileEmail, setProfileEmail] = useAtom(profileEmailAtom);
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [profileEmailError, setProfileEmailError] = useAtom(
    profileEmailErrorAtom,
  );
  const [nicknameError, setNicknameError] = useAtom(nicknameErrorAtom);
  const [isProfileFormValid, setIsProfileFormValid] = useAtom(
    isProfileFormValidAtom,
  );

  // useState를 사용한 입력 여부 상태 관리
  const [profileEmailTouched, setProfileEmailTouched] =
    useState<boolean>(false);
  const [nicknameTouched, setNicknameTouched] = useState<boolean>(false);

  // 프로필 Form 유효성 검사
  useEffect(() => {
    setProfileEmailError(validateEmail(profileEmail));
    setNicknameError(validateNickname(nickname));
    setIsProfileFormValid(
      !validateEmail(profileEmail) && !validateNickname(nickname),
    );
  }, [
    profileEmail,
    nickname,
    setProfileEmailError,
    setNicknameError,
    setIsProfileFormValid,
  ]);

  // 프로필 Form 제출 처리 함수
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProfileFormValid) return;
    console.log("프로필 업데이트:", { profileEmail, nickname });
  };

  return (
    <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
      <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:mb-[32px] desktop:text-[24px]'>
        프로필
      </div>
      <Form onSubmit={handleProfileSubmit}>
        <div className='flex flex-col gap-4 tablet:flex-row tablet:items-center'>
          <div className='flex h-[100px] w-[100px] items-center rounded-[6px] border border-gray bg-gray tablet:h-[182px] tablet:w-[182px] desktop:h-[182px] desktop:w-[182px]'>
            <ResponsiveImage
              src='/icon/ic_add_profile.png'
              alt='프로필 사진 추가'
              mobile={{ width: 20, height: 20 }}
              tablet={{ width: 30, height: 30 }}
              desktop={{ width: 30, height: 30 }}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Form.Field
              label='이메일'
              type='email'
              name='profileEmail'
              value={profileEmail}
              onChange={(e) => {
                setProfileEmail(e.target.value);
                setProfileEmailTouched(true);
              }}
              placeholder='이메일 입력'
              error={profileEmailError}
              showError={profileEmailTouched && !!profileEmailError}
              width='w-244'
              tabletWidth='tablet:w-290'
              desktopWidth='desktop:w-366'
            />
            <Form.Field
              label='닉네임'
              type='text'
              name='nickname'
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameTouched(true);
              }}
              placeholder='닉네임 입력'
              error={nicknameError}
              showError={nicknameTouched && !!nicknameError}
              width='w-244'
              tabletWidth='tablet:w-290'
              desktopWidth='desktop:w-366'
            />
          </div>
        </div>
        <div className='mb-[20px] mt-[16px] flex justify-end tablet:mb-[28px] tablet:mt-[24px] desktop:mt-[24px]'>
          <DefaultButton
            size='lg'
            disabled={!isProfileFormValid}
            className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
          >
            저장
          </DefaultButton>
        </div>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
