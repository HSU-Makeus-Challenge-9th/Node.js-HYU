export const validateUserSignup = (data) => {
  const errors = [];

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("유효한 이메일을 입력해주세요.");
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.push("이름을 입력해주세요.");
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.statusCode = 400;
    throw error;
  }
};