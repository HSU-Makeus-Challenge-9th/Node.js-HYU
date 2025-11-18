import { responseFromUser } from "../dtos/user.dto.js";
import { AlreadyEmailExistError } from "../middlewares/errors.js";
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
    throw new AlreadyEmailExistError("이미 존재하는 이메일입니다.", data)
  }

    await setPreference(joinUserId, data.preference);

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
