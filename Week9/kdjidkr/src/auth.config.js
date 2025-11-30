import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken"; // JWT 생성을 위해 import 
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


dotenv.config();
const secret = process.env.JWT_SECRET; // .env의 비밀 키 

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: String(user.userId), email: user.email }, 
    secret,                           
    { expiresIn: '1h' }                 
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: String(user.userId) },                   
    secret,
    { expiresIn: '14d' }                
  );
};

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        throw new Error("Google 프로필에서 이메일을 찾을 수 없습니다.");
    }

    // 이미 가입된 사용자인지 확인 => 가입된 사용자면 해당 사용자 정보 반환
    const user = await prisma.account.findFirst({ where: { email } });
    if (user !== null) {
        return { id: String(user.userId), email: user.email, name: user.name };
    }

    // 가입된 사용자가 아니면, 자동으로 회원가입 처리
    const created = await prisma.account.create({
        data: {
        email,
        name: profile.displayName,
        gender: "male",
        birthdate: new Date(1970, 0, 1),
        address: "추후 수정",
        phone: "000-0000-0000",
        },
    });
    console.log("자동 회원가입 처리:", created);

    return { id: created.userId, email: created.email, name: created.name };
};


export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/callback/google", 
    scope: ["email", "profile"],
  },

  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Google 관련 작업은 아래 코드 한 번으로 끝!
      const user = await googleVerify(profile);
      
      // 이제부터는 앱 전용 JWT 토큰을 발급하여 클라이언트에게 전달
      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateRefreshToken(user);
     
      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });

    } catch (err) {
      return cb(err);
    }
  }
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await prisma.account.findUnique({ where: { email: jwtPayload.email } });
        if (user) {
            user.userId = String(user.userId);
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});