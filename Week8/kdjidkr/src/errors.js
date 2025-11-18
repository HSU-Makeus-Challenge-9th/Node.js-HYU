import { StatusCodes } from "http-status-codes";
// 파트장님의 코드를 많이 참조했습니다.

export class CustomError extends Error {
  // Keep constructor parameter order as (statusCode, message, errorCode)
  // because subclass constructors call `super(StatusCodes.X, message, ...)`.
  constructor(statusCode, message, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode || this.constructor.name;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DuplicateUserEmailError extends CustomError {
  constructor(message = "중복된 이메일이 존재합니다."){
    super(StatusCodes.CONFLICT, message, "DUPLICATE_USER_EMAIL");
  }
}

export class StoreNotFoundError extends CustomError {
  constructor(message = "존재하지 않은 가게입니다.") {
    super(StatusCodes.NOT_FOUND, message, "STORE_NOT_FOUND");
  }
}

export class UserNotFoundError extends CustomError {
  constructor(message = "존재하지 않는 사용자입니다.") {
    super(StatusCodes.NOT_FOUND, message, "USER_NOT_FOUND");
  }
}

export class AlreadyChallengedMissionError extends CustomError {
  constructor(message = "이미 도전한 미션입니다.") {
    super(StatusCodes.BAD_REQUEST, message, "MISSION_ALREADY_CHALLENGED");
  }
}

export class MissionNotFoundError extends CustomError {
  constructor(message = "존재하지 않는 미션입니다.") {
    super(StatusCodes.NOT_FOUND, message, "MISSION_NOT_FOUND");
  }
}

export class InternalServerError extends CustomError {
  constructor(message = "서버 내부 오류입니다.") {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, "INTERNAL_SERVER_ERROR");
  }
}

export class MissingRequiredFieldError extends CustomError {
  constructor(message = "필수 입력 값이 누락되었습니다.") {
    super(StatusCodes.BAD_REQUEST, message, "MISSING_REQUIRED_FIELD");
  }
}