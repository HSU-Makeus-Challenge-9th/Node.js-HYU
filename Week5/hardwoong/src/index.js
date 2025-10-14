import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleStoreAdd } from "./controllers/store.controller.js";
import { handleReviewAdd, uploadMiddleware } from "./controllers/review.controller.js";
import { handleReviewAddJson } from "./controllers/review-json.controller.js";
import { handleMissionAdd } from "./controllers/mission.controller.js";
import { handleMissionChallenge } from "./controllers/mission.controller.js";
import { handleMissionSuccessRequest, handleMissionSuccessConfirm } from "./controllers/mission-success.controller.js";
import { handleUserSignup } from "./controllers/user-signup.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 1-1: 특정 지역에 가게 추가하기 API
app.post("/api/v1/stores", handleStoreAdd);

// 1-2: 가게에 리뷰 추가하기 API (multipart/form-data - 이미지 포함)
app.post("/api/v1/reviews", uploadMiddleware, handleReviewAdd);

// 1-2-2: 가게에 리뷰 추가하기 API (application/json - 텍스트만)
app.post("/api/v1/reviews/json", handleReviewAddJson);

// 1-3: 가게에 미션 추가하기 API
app.post("/api/v1/missions", handleMissionAdd);

// 1-4: 미션 도전하기 API
app.post("/api/v1/missions/:missionId/challenge", handleMissionChallenge);

// 미션 성공 요청 API
app.post("/api/v1/missions/success/request", handleMissionSuccessRequest);

// 미션 성공 확정 API
app.post("/api/v1/missions/success/confirm", handleMissionSuccessConfirm);

// 회원가입 API
app.post("/api/v1/users/signup", handleUserSignup);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  
  res.status(500).json({
    statusCode: 500,
    message: "서버 내부 오류가 발생했습니다.",
    error: "INTERNAL_SERVER_ERROR",
    data: null
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
