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
  
  for (const categoteryId of preference){
  await setPreference(joinUserId, categoteryId);
  };
  
  const user = await getUser(joinUserId);
  /*  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.', { userId });
  }*/
 //피드백 받은 코드인데 지금 코드에서는 addUser와 getUser가 함께 있어서 오류가 생길 일 없을 것 같아 주석처리
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
