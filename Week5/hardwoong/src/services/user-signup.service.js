import { responseFromUserSignup } from "../dtos/user-signup.dto.js";
import { addUser, getUserById } from "../repositories/user-signup.repository.js";

export const userSignup = async (data) => {
  const userId = await addUser(data);
  const user = await getUserById(userId);
  
  return responseFromUserSignup(user);
};
