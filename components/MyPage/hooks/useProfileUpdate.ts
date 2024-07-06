import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetcher from "@/lib/api/fetcher";
import { validateNickname } from "@/lib/validation";
import { userAtom } from "@/atoms/userAtom";
import { User } from "@/lib/api/types/users";

interface ProfileUpdateData {
  nickname: string;
  profileImageUrl: string | null;
}

export const useProfileUpdate = () => {
  const [userData, setUserData] = useAtom(userAtom);
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isProfileFormValid, setIsProfileFormValid] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setProfileImagePreview(userData.profileImageUrl || null);
    }
  }, [userData]);

  useEffect(() => {
    const error = validateNickname(userData?.nickname || "");
    setNicknameError(error);
    setIsProfileFormValid(!error);
  }, [userData?.nickname]);

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
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsSuccessModalOpen(true);
      setUserData(data);
      setProfileImagePreview(data.profileImageUrl); // 업데이트 후 미리보기 이미지 설정
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
        : userData?.profileImageUrl || null;
      const requestData: ProfileUpdateData = {
        nickname: userData.nickname,
        profileImageUrl,
      };
      mutation.mutate(requestData);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const setNickname = (nickname: string) => {
    setUserData((prev) => (prev ? { ...prev, nickname } : prev));
  };

  return {
    userData,
    nicknameError,
    isProfileFormValid,
    profileImagePreview,
    setProfileImage,
    setProfileImagePreview,
    setNickname,
    handleProfileSubmit,
    isSuccessModalOpen,
    isErrorModalOpen,
    errorMessage,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
  };
};
