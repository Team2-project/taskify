export const validateEmail = (email: string) => {
  if (!email) {
    return "이메일을 입력해 주세요.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "이메일 형식으로 작성해주세요.";
  }
  return "";
};

export const validateNickname = (nickname: string) => {
  if (!nickname) {
    return "닉네임을 입력해 주세요.";
  }
  if (nickname.length > 10) {
    return "닉네임은 10자 이하로 작성해주세요.";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "비밀번호를 입력해 주세요.";
  }
  if (password.length < 8) {
    return "비밀번호는 8자 이상 입력해주세요.";
  }
  return "";
};

