import { InvalidEmailError, UserNameError } from "../middlewares/errors.js";

export const validateUserSignup = (data) => {
  const errors = [];

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new InvalidEmailError("유효한 이메일을 입력해주세요.",data);
  }

  if (!data.name || data.name.trim().length === 0) {
    throw new UserNameError("이름을 입력해주세요.",data)
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.statusCode = 400;
    throw error;
  }
};

export const validateUserUpdate = (data) =>{
  if(data.name){
    if (data.name.trim().length === 0) {
      throw new UserNameError("이름을 입력해주세요.",data)
    }
  }
    if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.statusCode = 400;
    throw error;
  }

}