import React, { FC, useState, useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import ResponsiveImage from "@/components/ResponsiveImage";
import Form from "@/components/Form/FormField/FormField";
import DefaultButton from "@/components/Button";
import { validateNickname } from "@/lib/validation";
import { userAtom } from "@/atoms/userAtom";
import ImageUploader from "@/components/ImageUploader";

// Jotai를 사용한 상태 관리
const nicknameErrorAtom = atom("");
const isProfileFormValidAtom = atom(false);

const ProfileUpdate: FC = () => {
  const [userData, setUserData] = useAtom(userAtom);
  const [nicknameError, setNicknameError] = useAtom(nicknameErrorAtom);
  const [isProfileFormValid, setIsProfileFormValid] = useAtom(
    isProfileFormValidAtom,
  );

  // 프로필 이미지 상태 관리
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    userData?.profileImageUrl || null,
  );

  // useState를 사용한 입력 여부 상태 관리
  const [nicknameTouched, setNicknameTouched] = useState<boolean>(false);

  // 프로필 Form 유효성 검사
  const nickname = userData?.nickname || "";

  useEffect(() => {
    setNicknameError(validateNickname(nickname));
    setIsProfileFormValid(!validateNickname(nickname));
  }, [nickname, setNicknameError, setIsProfileFormValid]);

  // 프로필 Form 제출 처리 함수
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProfileFormValid) return;
    console.log("프로필 업데이트:", { email: userData?.email, nickname });
    // 여기에서 API 호출 등을 통해 nickname을 업데이트합니다.
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setUserData((prev) => (prev ? { ...prev, nickname: newNickname } : prev));
    setNicknameTouched(true);
  };

  //프로필 이미지 업로드 관련
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setUserData((prev) =>
          prev ? { ...prev, profileImageUrl: reader.result as string } : prev,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
      <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:mb-[32px] desktop:text-[24px]'>
        프로필
      </div>
      <Form onSubmit={handleProfileSubmit}>
        <div className='flex flex-col gap-4 tablet:flex-row tablet:items-center'>
          <ImageUploader
            profileImage={profileImage}
            onImageChange={handleImageChange}
            mobileHeight='h-[100px]'
            tabletHeight='h-[182px]'
            desktopHeight='h-[182px]'
            mobileWidth='w-[100px]'
            tabletWidth='w-[182px]'
            desktopWidth='w-[182px]'
          />
          <div className='flex flex-col gap-4'>
            <Form.Field
              label='이메일'
              type='email'
              name='profileEmail'
              value={userData?.email || ""}
              disabled
              placeholder='내 이메일'
              width='w-244'
              tabletWidth='tablet:w-290'
              desktopWidth='desktop:w-366'
            />
            <Form.Field
              label='닉네임'
              type='text'
              name='nickname'
              value={nickname}
              onChange={handleNicknameChange}
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
