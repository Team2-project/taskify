import React, { FC, useState, useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import Form from "@/components/Form/FormField/FormField";
import Button from "@/components/Button";
import { validateNickname } from "@/lib/validation";
import { userAtom } from "@/atoms/userAtom";
import ImageUploader from "@/components/ImageUploader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosError } from "axios";
import { User } from "@/lib/api/types/users";
import Modal from "../Modal";

interface ProfileUpdateData {
  nickname: string;
  profileImageUrl: string | null;
}

// Jotai 상태 관리
const nicknameErrorAtom = atom("");
const isProfileFormValidAtom = atom(false);

const ProfileUpdate: FC = () => {
  const [userData, setUserData] = useAtom(userAtom);
  const [nicknameError, setNicknameError] = useAtom(nicknameErrorAtom);
  const [isProfileFormValid, setIsProfileFormValid] = useAtom(
    isProfileFormValidAtom,
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    userData?.profileImageUrl || null,
  );
  const [nicknameTouched, setNicknameTouched] = useState<boolean>(false);

  const nickname = userData?.nickname || "";

  // 성공 모달 상태 관리
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  // 실패 모달 상태 관리
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const error = validateNickname(nickname);
    setNicknameError(error);
    setIsProfileFormValid(!error);
  }, [nickname, setNicknameError, setIsProfileFormValid]);

  const queryClient = useQueryClient();

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetcher<{ profileImageUrl: string }>({
      url: "/users/me/image",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.profileImageUrl;
  };

  const mutation = useMutation<User, AxiosError, ProfileUpdateData>({
    mutationFn: async (variables) => {
      const response = await fetcher<User>({
        url: "/users/me",
        method: "PUT",
        data: variables,
      });
      return response;
    },
    onSuccess: (data) => {
      setUserData((prev) => ({ ...prev!, ...data }));
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      if (error.response) {
        const responseData = error.response.data as { message: string };
        setErrorMessage(responseData.message);
        setIsErrorModalOpen(true);
      }
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProfileFormValid || !userData) return;
    try {
      const profileImageUrl = profileImage
        ? await uploadImage(profileImage)
        : userData.profileImageUrl;
      const requestData: ProfileUpdateData = {
        nickname: nickname,
        profileImageUrl,
      };
      mutation.mutate(requestData);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setUserData((prev) => (prev ? { ...prev, nickname: newNickname } : prev));
    setNicknameTouched(true);
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
    <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
      <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:mb-[32px] desktop:text-[24px]'>
        프로필
      </div>
      <Form onSubmit={handleProfileSubmit}>
        <div className='flex flex-col gap-4 tablet:flex-row tablet:items-center'>
          <ImageUploader
            profileImage={profileImagePreview}
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
          <Button
            disabled={!isProfileFormValid}
            className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
          >
            저장
          </Button>
        </div>
      </Form>
      <Modal.Res
        isOpen={isSuccessModalOpen}
        title='프로필 업데이트 성공!'
        DeleteButtonText='확인'
        cancelButtonText=''
        onClose={() => setIsSuccessModalOpen(false)}
        buttonAction={() => setIsSuccessModalOpen(false)}
        type='mypage'
      />
      <Modal.Res
        isOpen={isErrorModalOpen}
        title={errorMessage}
        DeleteButtonText='확인'
        cancelButtonText=''
        onClose={() => setIsErrorModalOpen(false)}
        buttonAction={() => setIsErrorModalOpen(false)}
        type='mypage'
      />
    </div>
  );
};

export default ProfileUpdate;
