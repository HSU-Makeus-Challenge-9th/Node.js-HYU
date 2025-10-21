export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth: body.birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password: body.password, //필수
  };
};

export const responseFromUser = ({ user, preferences }) => {
    return {
        user_id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        gender: user[0].gender,
        birth: user[0].birth,
        address: user[0].address,
        preferences: preferences.map((preference) => preference.food_id),
    }
};