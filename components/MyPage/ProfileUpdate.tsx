import React, { FC } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import { useProfileUpdate } from "./hooks/useProfileUpdate";

const ProfileUpdate: FC = () => {
  const {
    userData,
    nicknameError,
    isProfileFormValid,
    profileImagePreview, // 기존 프로필 이미지 URL
    setProfileImagePreview,
    setProfileImage,
    setNickname,
    handleProfileSubmit,
    isSuccessModalOpen,
    isErrorModalOpen,
    errorMessage,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
  } = useProfileUpdate();

  return (
    <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
      <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:text-[24px]'>
        프로필
      </div>
      <ProfileForm
        userData={userData}
        profileImagePreview={profileImagePreview} // 초기 프로필 이미지 미리보기 설정
        nicknameError={nicknameError}
        isProfileFormValid={isProfileFormValid}
        setProfileImage={setProfileImage}
        setProfileImagePreview={setProfileImagePreview}
        setNickname={setNickname}
        handleProfileSubmit={handleProfileSubmit}
      />
      <ProfileUpdateModal
        isSuccessModalOpen={isSuccessModalOpen}
        isErrorModalOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
      />
    </div>
  );
};

export default ProfileUpdate;
