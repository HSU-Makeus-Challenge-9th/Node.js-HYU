import { responseFromMissionSuccess } from "../dtos/mission-success.dto.js";
import { requestMissionSuccess, confirmMissionSuccess } from "../repositories/mission-success.repository.js";

export const missionSuccessRequest = async (data) => {
  const verificationCode = await requestMissionSuccess(data);
  return responseFromMissionSuccess(verificationCode);
};

export const missionSuccessConfirm = async (data) => {
  const result = await confirmMissionSuccess(data);
  return result;
};
