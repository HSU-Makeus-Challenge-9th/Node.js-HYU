import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import { handleMissionAdd } from "./controllers/mission.controller.js";
import { handleMissionChallenge } from "./controllers/mission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import { handleListUserReviews } from "./controllers/user.controller.js";
import { handleListUserMissionsInProgress } from "./controllers/user.controller.js";
import { handleListStoreMissions } from "./controllers/store.controller.js";
import cookieParser from 'cookie-parser';


const app = express();
const port = process.env.PORT

app.use(morgan('dev'));
app.use(cookieParser());

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  }

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({ 
      resultType: "FAIL", 
      error: { errorCode, reason, data }, 
      success: null 
    });
  };
  next();
});

app.get('/test', (req, res) => {
  res.send('Test OK!');
});

// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

app.use(cors()); //cors 방식 허용

app.use(express.static('public')); //정적 파일 접근

app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함

app.use(express.urlencoded({extended:false})); //단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/reviews/", handleReviewAdd);

app.get("/api/v1/users/:userId/reviews", handleListUserReviews)

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.get("/api/v1/users/:userId/missions/in_progress", handleListUserMissionsInProgress);

app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

app.post("/api/v1/missions/", handleMissionAdd);

app.post("/api/v1/missions/:missionId/challenge", handleMissionChallenge);


app.use((err,req,res,next) => {
  if (res.headerSent){
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
