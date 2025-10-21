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


export const responseFromUser = (body) => {
	const response = {
		email: body.email, //필수 
    name: body.name, // 필수
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password : body.password,
	}
		return response
	}
