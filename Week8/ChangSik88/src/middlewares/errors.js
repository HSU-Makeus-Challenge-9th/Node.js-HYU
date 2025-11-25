export const errors = (err,req,res,next) => {
  if(res.headersSent){
    return next(err);
  }

  console.error('Error occurred:',err);
  
    // Prisma 에러 처리
  if (err.code === 'P2002') {
    return res.status(409).error({
      errorCode: 'P2002',
      reason: '이미 존재하는 데이터입니다.',
      data: err.meta?.target,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).error({
      errorCode: 'P2025',
      reason: '해당 데이터를 찾을 수 없습니다.',
      data: null,
    });
  }

  //커스텀 에러
  if (err.statusCode) {
    return res.status(err.statusCode).error({
      errorCode: err.errorCode || 'unknown',
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
  }

  // 기타 에러
  res.status(500).error({
    errorCode: 'INTERNAL_SERVER_ERROR',
    reason: '서버 내부 오류가 발생했습니다.',
    data: null,
  });
};



export class ValidationError extends Error{
  statusCode = 400;
  errorCode = "400 Bad Request";

  constructor(reason,data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class AlreadyEmailExistError extends Error {
  statusCode = 409;
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class InvalidEmailError extends Error {
  statusCode = 400;
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class UserNameError extends Error {
  statusCode = 400;
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}





export class MissionAlreadyChallengeError extends Error {
  statusCode = 409;
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotClearMissionError extends Error {
  statusCode = 404;
  errorCode = "M002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}



export class AlreadyReviewExist extends Error {
  statusCode = 409;
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}