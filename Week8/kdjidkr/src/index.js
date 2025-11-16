import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.route.js";
import storeRouter from "./routes/store.route.js";
import reviewRouter from "./routes/review.route.js";
import missionRouter from "./routes/mission.route.js";
import cookieParser from 'cookie-parser';
import swaggerAutogen from "swagger-autogen";
import { StatusCodes } from "http-status-codes";
import swaggerUiExpress from "swagger-ui-express";


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
  // #swagger.ignore = true
  res.send('Test OK!');
});

// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // #swagger.ignore = true
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // #swagger.ignore = true
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

app.use(cors(
  {
    origin: "http://127.0.0.1:5500",
  }
)); //cors 방식 허용

app.use(express.static('public')); //정적 파일 접근

app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함

app.use(express.urlencoded({extended:false})); //단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('Hello World!')
})

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

// Swagger OpenAPI JSON 엔드포인트
app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./index.js"];
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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/missions', missionRouter);


app.use((err,req,res,next) => {
  if (res.headersSent){
    return next(err);
  }

  if (err.code === 'P2002'){
    // 고유 제약 조건 실패 (중복)
    return res.status(StatusCodes.CONFLICT).error({
      errorCode: 'P2002',
      reason: "이미 존재하는 데이터입니다.",
      data: null,
    });
  }

  if (err.code === 'P2025'){
    // 레코드 찾기 실패
    return res.status(StatusCodes.NOT_FOUND).error({
      errorCode: 'P2025',
      reason: '해당 데이터를 찾을 수 없습니다.',
      data: null,
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).error({
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
  }

  res.status(500).error({
    errorCode: "INTERNAL_SERVER_ERROR",
    reason: "서버 내부 오류가 발생했습니다.",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
