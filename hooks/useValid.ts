import { useState } from "react";

interface ErrorsMessage {
  title: string;
  email: string;
  password: string;
}

export default function useValid(prevTitles: string[] = []) {
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorsMessage, setErrorsMessage] = useState<ErrorsMessage>({
    title: "",
    email: "",
    password: "",
  });

  const validateTitle = (value: string): string => {
    if (prevTitles.includes(value)) {
      return "Title is already in use.";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePassword = (value: string): string => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setTitle(value);
    setErrorsMessage((prevErrors) => ({
      ...prevErrors,
      title: validateTitle(value),
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    setErrorsMessage((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    setPassword(value);
    setErrorsMessage((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };

  return {
    title,
    email,
    password,
    errorsMessage,
    handleTitleChange,
    handleEmailChange,
    handlePasswordChange,
  };
}

