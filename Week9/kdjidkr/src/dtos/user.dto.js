export const bodyToUser = (body) => {
  const birthdate = new Date(body.birthdate); //날짜 변환
  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birthdate: birthdate, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phone: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password: body.password, //필수
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map((preference) => preference.foodId.toString());
    console.log("dto user", user);
    return {
        user_id: user.userId.toString(),
        email: user.email,
        name: user.name,
        gender: user.gender,
        birthdate: user.birthdate,
        address: user.address,
        preferences: preferFoods,
    }
};

export const responseFromUserMissions = (userMissions) => {
  return {
    data: userMissions,
    pagination: {
      cursor: userMissions.length ? userMissions[userMissions.length - 1].challengeMissionId : null,
    },
  };
}

export const formattingUserMissions = (userMissions) => {
    return userMissions.map((mission) => ({
        challengeMissionId: mission.challengeMissionId.toString(),
        userId: mission.userId.toString(),
        missionId: mission.missionId.toString(),
        storeId: mission.storeId.toString(),
        status: mission.status,
        challengeAt: mission.challengeAt,
        limitedAt: mission.limitedAt,
    }));
}

export const bodyToUserUpdate = (body) => {
  let birthdate = null;
  if (body && body.birthdate) {
    birthdate = new Date(body.birthdate);
  }

  const phone = body && (body.phoneNumber ?? null);

  return {
    name: body?.name ?? null,
    gender: body?.gender ?? null,
    birthdate,
    address: body?.address ?? null,
    phone,
    preferences: body?.preferences ?? null,
  };
}