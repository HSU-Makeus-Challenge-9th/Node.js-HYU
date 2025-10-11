export const bodyToMissionSuccess = (body) => {
  return {
    challengeMissionId: parseInt(body.challengeMissionId),
    userId: parseInt(body.userId)
  };
};

export const responseFromMissionSuccess = (verificationCode) => {
  return {
    verificationCode: verificationCode
  };
};
