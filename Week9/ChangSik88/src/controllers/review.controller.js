import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { userReview } from "../services/review.service.js";
import {listStoreReviews, 
        listUserReviews} from "../services/review.service.js"
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createReview = asyncHandler(async (req,res,next) => {       //req는 요청 데이터, res는 응답 보내는 객체
       /*
    #swagger.tags=['Reviews']
    #swagger.summary = '리뷰 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id : {type:"number"},
              store_id : {type:"number"},
              body : {type:"string"},
              score: {type:"number"},
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 생성 성공 응답",
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
                  user_id : {type:"number"},
                  store_id : {type:"number"},
                  body : {type:"string"},
                  score: {type:"number"},
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 작성을 요청하였습니다!");
  console.log("body:", req.body);

  const review = await userReview(bodyToReview(req.body));
  res.status(StatusCodes.CREATED).json({ 
    message: "리뷰가 성공적으로 등록되었습니다.",
    result: review });

});

export const handleListStoreReviews = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags=['Reviews']
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '상점 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '페이지네이션 커서 (이전 페이지의 마지막 리뷰 ID)'
    };
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        body: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
     #swagger.responses[400] = {
      description: "잘못된 요청 (유효하지 않은 storeId 또는 cursor)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VALIDATION_ERROR" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "상점을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "STORE_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0  
    );
    res.status(StatusCodes.OK).json({
      message : "성공적으로 불러왔습니다",
      result : reviews
    });
  });

  export const handleListUserReviews = asyncHandler(async (req,res,next) => {
        /*
    #swagger.tags=['Reviews']
    #swagger.summary = '유저 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '유저 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '페이지네이션 커서 (이전 페이지의 마지막 리뷰 ID)'
    };
    #swagger.responses[200] = {
      description: "유저 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
   #swagger.responses[400] = {
      description: "잘못된 요청 (유효하지 않은 userId 또는 cursor)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VALIDATION_ERROR" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "USER_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

    const users = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
      message : "성공적으로 불러왔습니다",
      result: users
    });
  });