export const responseFromMissions = (missions) => {
    return {
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].reviewId : null,
      },
    };
};

export const formattingMissions = (missions) => {
    return missions.map((mission) => ({
        id: mission.missionId.toString(),
        storeId: mission.storeId.toString(),
        costStandard: mission.costStandard,
        point: mission.point,
    }));
  }