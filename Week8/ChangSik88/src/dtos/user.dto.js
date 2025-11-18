export const bodyToUser = (body) => {

  return {
    name: body.name, // 필수
    gender: body.gender, // 필수
    age: body.age, // 필수
    address: body.address || "", //선택 
    email: body.email, //필수  
    preference: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (p) => ({
      id: p.flavor.id,
      name:p.flavor.name
    })
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
