import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { handleStoreAdd } from "./controllers/store.controller.js";
import { handleReviewAdd, uploadMiddleware, handleGetMyReviews } from "./controllers/review.controller.js";
import { handleReviewAddJson } from "./controllers/review-json.controller.js";
import { 
  handleMissionAdd, 
  handleMissionChallenge, 
  handleMissionSuccessRequest, 
  handleMissionSuccessConfirm, 
  handleGetMyOngoingMissions, 
  handleGetStoreMissions 
} from "./controllers/mission.controller.js";
import { handleUserSignup } from "./controllers/user.controller.js";

dotenv.config();

// 빌드된 OpenAPI 스펙 로드
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let openapiSpec = null;

// 빌드된 파일이 있으면 읽기, 없으면 동적 생성
try {
  const openapiPath = join(__dirname, '../swagger/openapi.json');
  const fileContent = readFileSync(openapiPath, 'utf8');
  openapiSpec = JSON.parse(fileContent);
} catch (error) {
  console.log('빌드된 파일이 없습니다. 동적 생성 모드로 전환합니다.');
  console.log('빌드 파일을 생성하려면: npm run build');
}

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger UI 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

// Swagger OpenAPI JSON 엔드포인트 (빌드된 파일 읽기)
app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  // 빌드된 파일이 있으면 사용, 없으면 동적 생성
  if (openapiSpec) {
    return res.json(openapiSpec);
  }
  
  // 동적 생성 (fallback)
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th Node.js API",
      description: "UMC 9th Node.js 프로젝트 API 문서입니다.",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
  };
  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get("/", (req, res) => {
  // #swagger.ignore = true
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

// 내가 작성한 리뷰 목록 조회 API
app.get("/api/v1/users/:userId/reviews", handleGetMyReviews);

// 특정 가게의 미션 목록 조회 API
app.get("/api/v1/stores/:storeId/missions", handleGetStoreMissions);

// 내가 진행 중인 미션 목록 조회 API
app.get("/api/v1/users/:userId/missions/ongoing", handleGetMyOngoingMissions);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  // #swagger.ignore = true
  console.error(err);
  
  // 커스텀 에러인 경우
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.errorCode,
      data: null
    });
  }
  
  // 기본 에러 처리
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
