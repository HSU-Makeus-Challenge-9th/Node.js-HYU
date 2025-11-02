import { responseFromUserSignup } from "../dtos/user.dto.js";
import { addUser, getUserById } from "../repositories/user.repository.js";

export const userSignup = async (data) => {
  const userId = await addUser(data);
  const user = await getUserById(userId);
  
  return responseFromUserSignup(user);
};
