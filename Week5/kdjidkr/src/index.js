import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import { handleMissionAdd } from "./controllers/mission.controller.js";
import { handleMissionChallenge } from "./controllers/mission.controller.js";

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(cors()); //cors 방식 허용

app.use(express.static('public')); //정적 파일 접근

app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함

app.use(express.urlencoded({extended:false})); //단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/reviews/", handleReviewAdd)

app.post("/api/v1/missions/", handleMissionAdd);

app.post("/api/v1/missions/:missionId/challenge", handleMissionChallenge)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
