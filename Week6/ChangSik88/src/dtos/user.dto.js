export const bodyToUser = (body) => {

  return {
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth: body.birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택
    email: body.email, //필수  
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password: body.password,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
