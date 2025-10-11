export const bodyToMission = (body) => {
  return {
    storeId: parseInt(body.storeId),
    region: body.region,
    missionMoney: parseInt(body.missionMoney),
    missionPoint: parseInt(body.missionPoint)
  };
};

export const responseFromMission = (mission) => {
  return {
    missionId: mission.mission_id,
    storeId: mission.store_id,
    region: mission.region,
    missionMoney: mission.mission_money,
    missionPoint: mission.mission_point,
    createdAt: mission.created_at
  };
};
