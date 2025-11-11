export const errors = (err,req,res,next) => {
  console.error('Error occured:',err);

  if(err.code === 'P2002'){  //고유 제약 조건 실패(이미 존재)
    return res.status(409).json({
      message: '이미 존재하는 데이터입니다.',
      error: err.meta?.target,
    });
  }
   if (err.code === 'P2025') {
    return res.status(404).json({
      message: '해당 데이터를 찾을 수 없습니다.',
    });
  }

  // 커스텀 에러 처리
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // 기타 에러
  res.status(500).json({
    message: '서버 내부 오류가 발생했습니다.',
  });
};



export class ValidationError extends Error{
  errorCode = "400 Bad Request";

  constructor(reason,data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class AlreadyEmailExistError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class InvalidEmailError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class UserNameError extends Error {
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}





export class MissionAlreadyChallengeError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotClearMissionError extends Error {
  errorCode = "M002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}



export class AlreadyReviewExist extends Error {
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}