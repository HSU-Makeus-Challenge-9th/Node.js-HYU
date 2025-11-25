import { StatusCodes } from "http-status-codes";
import { bodyToChallenge, bodyToMission } from "../dtos/mission.dto.js";
import {challengeMission,
        storeMission,
        listStoreMissions,
        listUserMissions,
        missionSuccessRequest,
        missionSuccessConfirm } from "../services/mission.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { ValidationError } from "../middlewares/errors.js";

export const createMission = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags=['Missions']
    #swagger.summary = '미션 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "number" },
              mission_point: { type: "number" },
              mission_spec: { type: "string" },
              mission_money: { type: "number" },
              deadline: { type: "string" },
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 생성 성공 응답",
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
                  store_id: { type: "number" },
                  deadline: { type: "string" },
                  mission_spec: { type: "string"},
                  mission_money : {type: "number"},
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
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
  console.log("미션 등록 요청입니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await storeMission(bodyToMission(req.body));
  res.status(StatusCodes.CREATED).json({ 
    message: "미션이 성공적으로 추가되었습니다.",
    result: user });
});

export const startMission = asyncHandler(async(req,res,next)=>{
     /*
    #swagger.tags=['Missions']
    #swagger.summary = '미션 시작 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '미션 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id : {type:"number"},
            }
            required: ["user_id"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 시작 성공 응답",
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
                  mission_id : {type:"number"},
                  user_id : {type:"number"},
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 시작 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
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
    console.log("미션 시작 요청입니다!");
    console.log("body: ",req.body);

    const mission_id = req.params.missionId;
    const user_id = req.body.user_id

     if(!user_id){
        throw new ValidationError("사용자 ID는 필수입니다.",{user_id});
    };
    if(!mission_id){
        throw new ValidationError("미션 ID는 필수입니다.",{mission_id});
    }

    const data = {
        mission_id: req.params.missionId,
        user_id: req.body.user_id,
    } 
   

    const challenge = await challengeMission(bodyToChallenge(data));
    res.status(StatusCodes.CREATED).json({ 
    message: "미션을 시작합니다!",
    result: challenge });
});

// 6주차 내용

export const handleListStoreMission = asyncHandler(async (req,res,next)=>{
     /*
    #swagger.tags=['Missions']
    #swagger.summary = '상점 미션 목록 조회 API';
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
      description: '페이지네이션 커서 (이전 페이지의 마지막 ID)'
    };
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
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
                        store: { type: "object", properties: { name: { type: "string" } } },
                        mission: {type: "object", properties: {id:{type:"number"},mission_point:{type:"number"}, mission_spec:{type:"string"},mission_money:{type:"number"}}},
                        deadline : {type:"string"},
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

    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message : "성공적으로 불러왔습니다",
        result : missions
    })
});

export const handleListUserMission = asyncHandler(async (req,res,next) => {
/*
    #swagger.tags=['Missions']
    #swagger.summary = '유저 미션 목록 조회 API';
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
      description: '페이지네이션 커서 (이전 페이지의 마지막 ID)'
    };
    #swagger.responses[200] = {
      description: "유저 미션 목록 조회 성공 응답",
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
                        user_id: { type: "number"},
                        mission_id: {type: "number"},
                        is_cleared: {type:"string"}
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
    const missions = await listUserMissions(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message:"성공적으로 불러왔습니다",
        result:missions
    });
});

export const handleMissionSuccessRequest = asyncHandler(async(req,res,next) => {
     /*
    #swagger.tags=['Missions']
    #swagger.summary = '미션 완료 요청 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '미션 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id : {type:"number"},
            }
            required: ["user_id"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 완료 요청 성공 응답",
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
                        verifyCode : { type:"number" }
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
      description: "잘못된 요청 (유효하지 않은 missionId 또는 cursor)",
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
      description: "미션을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "MISSION_NOT_FOUND" },
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
    console.log("미션 완료 요청입니다!");
    console.log("body :", req.body);

    const mission_id = req.params.missionId;
    const user_id=req.body.user_id;

    if(!mission_id||!user_id){
        throw new ValidationError("MissionId와 userId는 필수입니다.",{mission_id,user_id})
    };
    const missions = await missionSuccessRequest(user_id,parseInt(mission_id));
    res.status(StatusCodes.OK).success({
        message: "미션 완료 요청을 성공했습니다.",
        result: missions
    });
});
export const handleMissionSuccessConfirm = asyncHandler(async(req,res,next) => {
       /*
    #swagger.tags=['Missions']
    #swagger.summary = '미션 완료 확정 요청 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '미션 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id : {type:"number"},
              verify_code:{type:"number"}
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 완료 확정 요청 성공 응답",
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
                        mission: {type: "object", properties: {id:{type:"number"},mission_pooint:{type:"number"}, mission_spec:{type:string},mission_money:{type:number}}}
                        verifyCode : {type:"string"},
                        is_cleared : {type: "string"}
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
      description: "잘못된 요청 (유효하지 않은 missionId 또는 userId)",
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
      description: "미션을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "MISSION_NOT_FOUND" },
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
      description: "확인코드를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VERIFY_CODE_NOT_FOUND" },
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
    console.log("미션 완료 확정 요청입니다!");
    console.log("body :", req.body);

    const mission_id = req.params.missionId
    const user_id = req.body.user_id
    const verifyCode = req.body.verifyCode

    if(!mission_id||!user_id||!verifyCode){
        throw new ValidationError("확인 코드는 필수입니다.",req.body);
      };
    const missions = await missionSuccessConfirm(user_id,parseInt(mission_id),verifyCode);
        res.status(StatusCodes.OK).success({
        message: "미션 완료 확정 요청을 성공했습니다.",
        result: missions
        });
});