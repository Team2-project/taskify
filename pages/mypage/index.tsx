import React, { useState, useEffect } from "react";
import { FC } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ResponsiveImage from "@/components/ResponsiveImage";
import Form from "@/components/Form/FormField/FormField";
import DefaultButton from "@/components/Button";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/lib/validation";

const MyPage: FC = () => {
  // 프로필 Form 상태 변수
  const [profileEmail, setProfileEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  // 비밀번호 변경 Form 상태 변수
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // 오류 상태 변수
  const [profileEmailError, setProfileEmailError] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [currentPasswordError, setCurrentPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // 필드에 입력 여부 상태 변수
  const [profileEmailTouched, setProfileEmailTouched] =
    useState<boolean>(false);
  const [nicknameTouched, setNicknameTouched] = useState<boolean>(false);
  const [currentPasswordTouched, setCurrentPasswordTouched] =
    useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);

  // Form 유효성 상태 변수
  const [isProfileFormValid, setIsProfileFormValid] = useState<boolean>(false);
  const [isPasswordFormValid, setIsPasswordFormValid] =
    useState<boolean>(false);

  //프로필 Form 유효성 검사
  useEffect(() => {
    setProfileEmailError(validateEmail(profileEmail));
    setNicknameError(validateNickname(nickname));
    setIsProfileFormValid(
      !validateEmail(profileEmail) && !validateNickname(nickname),
    );
  }, [profileEmail, nickname]);

  //비밀번호 변경 Form 유효성 검사
  useEffect(() => {
    setCurrentPasswordError(validatePassword(currentPassword));
    setNewPasswordError(validatePassword(newPassword));
    setConfirmPasswordError(
      newPassword !== confirmPassword ? "새 비밀번호가 일치하지 않습니다." : "",
    );
    setIsPasswordFormValid(
      !validatePassword(currentPassword) &&
        !validatePassword(newPassword) &&
        newPassword === confirmPassword,
    );
  }, [currentPassword, newPassword, confirmPassword]);

  // 프로필 Form 제출 처리 함수
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProfileFormValid) return;
    // Validation and API call logic for profile update
    console.log("프로필 업데이트:", { profileEmail, nickname });
  };

  // 비밀번호 변경 Form 제출 처리 함수
  const handlePasswordChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordFormValid) return;
    // 비밀번호 변경 로직
    console.log("비밀번호 변경:", { currentPassword, newPassword });
  };

  return (
    <DashboardLayout
      title='계정관리'
      showActionButton={false}
      showBadgeCounter={false}
      showProfileDropdown={true}
      showCreatedByMeIcon={false}
    >
      {/* 돌아가기 링크 */}
      <div className='mb-[20px] flex items-center justify-start tablet:mb-[25px] desktop:mb-[25px]'>
        <div className='flex-shrink-0'>
          <ResponsiveImage
            src='/icon/ic_arrow_back.svg'
            alt='뒤로가기'
            mobile={{ width: 18, height: 18 }}
            tablet={{ width: 20, height: 20 }}
            desktop={{ width: 20, height: 20 }}
          />
        </div>
        <span className='ml-[6px] text-[14px] font-medium tablet:text-[16px] desktop:text-[16px]'>
          돌아가기
        </span>
      </div>

      {/* 프로필 폼 */}
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
          <div className='mt-[16px] flex justify-end tablet:mt-[24px] desktop:mt-[24px]'>
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
      <div className='h-[12px]'>{/* 공백 */}</div>

      {/* 비밀번호 변경 폼 */}
      <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
        <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:text-[24px]'>
          비밀번호 변경
        </div>
        <Form onSubmit={handlePasswordChangeSubmit}>
          <Form.Field
            label='현재 비밀번호'
            type='password'
            name='currentPassword'
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setCurrentPasswordTouched(true);
            }}
            placeholder='현재 비밀번호 입력'
            error={currentPasswordError}
            showError={currentPasswordTouched && !!currentPasswordError}
            width='w-244'
            tabletWidth='tablet:w-488'
            desktopWidth='desktop:w-564'
          />
          <Form.Field
            label='새 비밀번호'
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPasswordTouched(true);
            }}
            placeholder='새 비밀번호 입력'
            error={newPasswordError}
            showError={confirmPasswordTouched && !!confirmPasswordError}
            width='w-244'
            tabletWidth='tablet:w-488'
            desktopWidth='desktop:w-564'
          />
          <Form.Field
            label='새 비밀번호 확인'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordTouched(true);
            }}
            placeholder='새 비밀번호 다시 입력 '
            error={confirmPasswordError}
            showError={confirmPasswordTouched && !!confirmPasswordError}
            width='w-244'
            tabletWidth='tablet:w-488'
            desktopWidth='desktop:w-564'
          />
          <div className='mt-[16px] flex justify-end tablet:mt-[24px] desktop:mt-[24px]'>
            <DefaultButton
              size='lg'
              disabled={!isPasswordFormValid}
              className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
            >
              변경
            </DefaultButton>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default MyPage;
