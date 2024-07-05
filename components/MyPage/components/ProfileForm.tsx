/*
    ProfileUpdate 컴포넌트 안의 Form 입력 컴포넌트
*/
import React, { FC } from "react";
import Form from "@/components/Form/FormField/FormField";
import ImageUploader from "./ImageUploader";
import Button from "@/components/Button";
import { User } from "@/lib/api/types/users";

interface ProfileFormProps {
  userData: User | null;
  profileImagePreview: string | null;
  nicknameError: string;
  isProfileFormValid: boolean;
  setProfileImage: (file: File | null) => void;
  setProfileImagePreview: (url: string | null) => void;
  setNickname: (nickname: string) => void;
  handleProfileSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({
  userData,
  profileImagePreview,
  nicknameError,
  isProfileFormValid,
  setProfileImage,
  setProfileImagePreview,
  setNickname,
  handleProfileSubmit,
}) => {
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form onSubmit={handleProfileSubmit}>
      <div className='flex flex-col gap-4 tablet:flex-row tablet:items-center'>
        <ImageUploader
          profileImage={profileImagePreview} // 기존 프로필 이미지 미리보기
          onImageChange={handleImageChange}
          mobileHeight='h-[100px]'
          mobileWidth='w-[100px]'
          tabletHeight='tablet:h-[182px]'
          tabletWidth='tablet:w-[182px]'
          desktopHeight='desktop:h-[182px]'
          desktopWidth='desktop:w-[182px]'
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
            value={userData?.nickname || ""}
            onChange={handleNicknameChange}
            placeholder='닉네임 입력'
            error={nicknameError}
            showError={!!nicknameError}
            width='w-244'
            tabletWidth='tablet:w-290'
            desktopWidth='desktop:w-366'
          />
        </div>
      </div>
      <div className='mb-[20px] mt-[16px] flex justify-end tablet:mb-[28px] tablet:mt-[24px] desktop:mt-[24px]'>
        <Button
          type='submit'
          disabled={!isProfileFormValid}
          className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
        >
          저장
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
