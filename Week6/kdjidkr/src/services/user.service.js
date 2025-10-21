import { formattingReviews, responseFromReviews, responseFromUser, formattingUserMissions, responseFromUserMissions } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreferences,
  getUserReviewsByUserId,
  getUserMissionsInProgressByUserId
} from "../repositories/user.repository.js";

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

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  await setPreferences(joinUserId, data.preferences);

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};


// 의문 : formattingReviews, responseFromReviews store에 있는 거 내용 똑같은데 거기꺼 쓰면 안되나???
export const listUserReviews = async (userId, cursor) => {
  const reviews = await getUserReviewsByUserId(userId, cursor);
  return responseFromReviews(formattingReviews(reviews));
};

export const listUserMissionsInProgress = async (userId, cursor) => {
  const userMissions = await getUserMissionsInProgressByUserId(userId, cursor);
  return responseFromUserMissions(formattingUserMissions(userMissions));
}