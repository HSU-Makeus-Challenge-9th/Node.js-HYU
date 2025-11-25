import {responseFromUser, formattingUserMissions, responseFromUserMissions, bodyToUserUpdate } from "../dtos/user.dto.js";
import { formattingReviews, responseFromReviews } from "../dtos/review.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreferences,
  getUserReviewsByUserId,
  getUserMissionsInProgressByUserId
} from "../repositories/user.repository.js";
import { UserNotFoundError } from "../errors.js";
import { updateUser } from "../repositories/user.repository.js";

export const getUserInfo = async (userId) => {
  const user = await getUser(userId);

  if (!user) {
    throw new UserNotFoundError();
  }
};

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birthdate: data.birthdate,
    address: data.address,
    phone: data.phone,
    password: data.password,
  });

  await setPreferences(joinUserId, data.preferences);

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async (userId, cursor) => {
  const reviews = await getUserReviewsByUserId(userId, cursor);
  return responseFromReviews(formattingReviews(reviews));
};

export const listUserMissionsInProgress = async (userId, cursor) => {
  const userMissions = await getUserMissionsInProgressByUserId(userId, cursor);
  return responseFromUserMissions(formattingUserMissions(userMissions));
}

export const userUpdate = async (userId, data) => {
    const updateData = bodyToUserUpdate(data);
    console.log("updateData in service:", updateData);
    const user = await updateUser(userId, updateData);
    return responseFromUser({ user, preferences: [] });
};