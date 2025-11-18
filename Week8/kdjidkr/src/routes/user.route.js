import express from 'express';
import {
  handleUserSignUp,
  handleListUserReviews,
  handleListUserMissionsInProgress
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup",
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birthdate: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } },
              password: { type: "string" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    user_id : { type: "string", example: "1" },
                    email : { type: "string", example: "user@example.com" },
                    name : { type: "string", example: "홍길동" },
                    gender : { type: "string", example: "male" },
                    birthdate : { type: "string", example: "1990-01-01", format: "date" },
                    address : { type: "string", example: "서울특별시 강남구" },
                    preferences : { type: "array", items: { type: "string" }, example: ["1", "2", "3"] }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
        description: "회원 가입 실패 응답 - 서버 내부 오류",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "INTERNAL_SERVER_ERROR" },
                                reason: { type: "string", example: "서버 내부 오류입니다." },
                                data: { type: "object", nullable: true, example: null }
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                }
            }
        }
    }
    #swagger.responses[409] = {
      description: "회원 가입 실패 응답 - 중복된 이메일이 존재함",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "DUPLICATE_EMAIL" },
                  reason: { type: "string", example: "이미 사용 중인 이메일입니다." },
                  data: { type: "object", nullable: true, example: null }
                    }
                  },
                  success: { type: "object", nullable: true, example: null }
                }
              }
            }
          }
    }
    */
    handleUserSignUp);
router.get("/:userId/reviews"
    /*
        #swagger.summary = '특정 사용자의 리뷰 목록 조회 API'
        #swagger.parameters['userId'] = {
            in: 'path',
            description: '리뷰를 조회할 사용자의 ID',
            required: true,
            type: 'string',
            example: '1'
        }
        #swagger.responses[200] = {
            description: '특정 사용자의 리뷰 목록 조회 성공 응답',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "SUCCESS" },
                            error: { type: "object", nullable: true, example: null },
                            success: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                reviewId: { type: "string", example: "1" },
                                                storeId: { type: "string", example: "1" },
                                                score: { type: "string", example: "5" },
                                                content: { type: "string", example: "정말 맛있어요!" },
                                                createdAt: { type: "string", example: "2023-10-05T12:34:56.789Z", format: "date-time" }
                                            }
                                        }
                                    },
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            cursor: { type: "string", nullable: true, example: "1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[404] = {
            description: '특정 사용자의 리뷰 목록 조회 실패 응답 - 해당 사용자가 존재하지 않음'}
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "USER_NOT_FOUND" },
                                    reason: { type: "string", example: "존재하지 않은 사용자입니다." },
                                    data: { type: "object", nullable: true, example: null }
                                }
                            },
                            success: { type: "object", nullable: true, example: null }
                        }
                    }
                }
            }
        }

        #swagger.responses[500] = {
            description: '특정 사용자의 리뷰 목록 조회 실패 응답 - 서버 내부 오류',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "INTERNAL_SERVER_ERROR" },
                                    reason: { type: "string", example: "사용자 리뷰 목록 조회에 실패했습니다." },
                                    data: { type: "object", nullable: true, example: null }
                                }
                            },
                            success: { type: "object", nullable: true, example: null }
                        }
                    }
                }
            }
        }
    */
    , handleListUserReviews);
router.get("/:userId/missions/in_progress", 
    /*
        #swagger.summary = '특정 사용자의 진행 중인 미션 목록 조회 API'
        #swagger.parameters['userId'] = {
            in: 'path',
            description: '진행 중인 미션을 조회할 사용자의 ID',
            required: true,
            type: 'string',
            example: '1'
        }
        #swagger.responses[200] = {
            description: '특정 사용자의 진행 중인 미션 목록 조회 성공 응답',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "SUCCESS" },
                            error: { type: "object", nullable: true, example: null },
                            success: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                challengeMissionId: { type: "string", example: "1" },
                                                userId: { type: "string", example: "1" },
                                                missionId: { type: "string", example: "1" },
                                                storeId: { type: "string", example: "1" },
                                                title: { type: "string", example: "IN_PROGRESS"},
                                                challengeAt: { type: "string", example: "2023-10-05T12:34:56.789Z", format: "date-time" },
                                                limitedAt: { type: "string", example: "2023-10-12T12:34:56.789Z", format: "date-time" }
                                            }
                                        }
                                    },
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            cursor: { type: "string", nullable: true, example: "1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[404] = {
            description: '특정 사용자의 진행 중인 미션 목록 조회 실패 응답 - 해당 사용자가 존재하지 않음',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "USER_NOT_FOUND" },
                                    reason: { type: "string", example: "존재하지 않은 사용자입니다." },
                                    data: { type: "object", nullable: true, example: null }
                                }
                            },
                            success: { type: "object", nullable: true, example: null }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: '특정 사용자의 진행 중인 미션 목록 조회 실패 응답 - 서버 내부 오류',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "INTERNAL_SERVER_ERROR" },
                                    reason: { type: "string", example: "서버 내부 오류가 발생했습니다." },
                                    data: { type: "object", nullable: true, example: null }
                                }
                            },
                            success: { type: "object", nullable: true, example: null }
                        }
                    }
                }
            }
        }
   */
   handleListUserMissionsInProgress);

export default router;
