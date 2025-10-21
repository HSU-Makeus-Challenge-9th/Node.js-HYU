export const bodyToMission = (body) => {
    const response = {
    userId: body.userId,
    storeId: body.storeId,
    mission_spec: body.mission_spec,
    reward: body.reward,
  }
  return response;
}

export const responseFromMission = (body) =>{
    const response = {
        mission_id: body[0].mission_id,
        store_id: body[0].store_id,
        mission_spec: body[0].mission_spec,
        reward: body[0].reward,
    }
    return response;
}
export const bodyToChallenge = (data) =>{
    return ({
        memberId: data.memberId,
        missionId: parseInt(data.missionId),
})
}

export const responseFromChallenge = (body)=>{
    return({
        memberId: body[0].member_id,
        missionId:body[0].mission_id,
    })
}
    