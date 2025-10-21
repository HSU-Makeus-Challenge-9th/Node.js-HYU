export const bodyToMission = (body) => {
    const response = {
    storeId: body.storeId,
    mission_point: body.mission_point,
    deadline: body.deadline,
    mission_spec: body.mission_spec,
    mission_money: body.mission_money,

  }
  return response;
}

export const responseFromMission = (body) =>{
    const response = {
        mission_id: body.mission_id,
        store_id: body.store_id,
        deadline: body.deadline,
        mission_spec: body.mission_spec,
        mission_point: body.mission_point,
    };
    return response;
}
export const bodyToChallenge = (data) =>{
    return ({
        user_id: data.user_id,
        mission_id: parseInt(data.mission_id),
})
}

export const responseFromChallenge = (body)=>{
    return({
        userId: body.user_id,
        missionId: body.mission_id,
    });
};

export const responseFromReviews = (review) => {
  return {
    data: review,
    pagination: {
      cursor: review.length ? review[review.length-1].id:null,
    },
  };
};

export const responseFromMissions = (missions) => {
    return {
        data : missions,
        pagination : {
            cursor: missions.length ? missions[missions.length-1].id:null,
        },
    };
};

export const responseFromMissionSuccess = (verifyCode) => {
    return {
        data: verifyCode
    };
};