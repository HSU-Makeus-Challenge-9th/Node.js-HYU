import express from 'express';
import {
  handleMissionAdd,
  handleMissionChallenge
} from "../controllers/mission.controller.js";
import passport from 'passport';

const isLogin = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.post("/", 
    /*
        #swagger.summary = '미션 추가 API'
        #swagger.tags = ['Missions'];
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            store_id: { type: "string", example: "1" },
                            cost_standard: { type: "number", example: 5000 },
                            point: { type: "number", example: 100 }
                        }
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: '미션 추가 성공 응답',
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
                                    message: { type: "string", example: "미션이 성공적으로 추가되었습니다." },
                                    data: {
                                        type: "object",
                                        properties: {
                                            missionId: { type: "string", example: "1" },
                                            storeId: { type: "string", example: "1" },
                                            costStandard: { type: "number", example: 5000 },
                                            point: { type: "number", example: 100 }
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
            description: '미션 추가 실패 응답 - store_id에 해당하는 상점 없음',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "STORE_NOT_FOUND" },
                                    reason: { type: "string", example: "존재하지 않은 가게입니다." },
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
            description: '미션 추가 실패 응답 - 서버 내부 오류',
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
    */
    handleMissionAdd);

router.post("/:missionId/challenge", isLogin,

    /*
        #swagger.summary = '미션 도전 API'
        #swagger.tags = ['Missions'];
        #swagger.parameters['missionId'] = {
            in: 'path',
            description: '도전할 미션의 ID',
            required: true,
            type: 'string',
            example: '1'
        }
    
        #swagger.responses[201] = {
            description: '미션 도전 성공 응답',
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
                                    message: { type: "string", example: "미션 도전에 성공했습니다." },
                                    data: {
                                        type: "object",
                                        properties: {
                                            challenge_mission_id: { type: "string", example: "4" },
                                            mission_id: { type: "string", example: "6" },
                                            status: { type: "string", example: "IN_PROGRESS" },
                                            challenge_at: { type: "string", example: "2025-11-16T14:39:32.539Z", format: "date-time" },
                                            limited_at: { type: "string", example: "2025-11-23T14:39:32.535Z", format: "date-time" }
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
            description: '미션 도전 실패 응답 - 입력 값에 대응하는 미션 또는 사용자 없음',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "MISSION_NOT_FOUND" },
                                    reason: { type: "string", example: "존재하지 않는 미션입니다." },
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
            description: '미션 도전 실패 응답 - 이미 도전한 미션',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "MISSION_ALREADY_CHALLENGED" },
                                    reason: { type: "string", example: "이미 도전한 미션입니다." },
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
            description: '미션 도전 실패 응답 - 서버 내부 오류',
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
    */
    handleMissionChallenge);

export default router;
