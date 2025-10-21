import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const {preference,...userInfo} = data;
  const joinUserId = await addUser(userInfo);
  
  if (joinUserId === null) {
    const error = new Error("이미 존재하는 이메일입니다.");
    error.statusCode = 409;
    throw error;
  }

    await setPreference(joinUserId, data.preference);

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
