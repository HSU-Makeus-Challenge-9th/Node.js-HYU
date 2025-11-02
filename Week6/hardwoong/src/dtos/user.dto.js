export const bodyToUserSignup = (body) => {
  return {
    name: body.name,
    gender: body.gender,
    birth: body.birth ? new Date(body.birth) : null,
    address: body.address || "",
    socialId: body.socialId || null,
    socialType: body.socialType || null,
    email: body.email,
    phone: body.phone || "",
    password: body.password,
    preferences: body.preferences || []
  };
};

export const responseFromUserSignup = (user) => {
  return {
    userId: user.user_id,
    name: user.name,
    email: user.email,
    userStatus: user.user_status,
    userType: user.user_type,
    createdAt: user.created_at
  };
};
