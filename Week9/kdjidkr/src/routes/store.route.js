import express from 'express';
import {
  handleListStoreReviews,
  handleListStoreMissions
} from "../controllers/store.controller.js";

const router = express.Router();

router.get("/:storeId/reviews", 
    /*
        #swagger.summary = '상점 리뷰 목록 조회 API'
        #swagger.tags = ['Stores'];
        #swagger.parameters['storeId'] = {
            in: 'path',
            description: '리뷰를 조회할 상점의 ID',
            required: true,
            type: 'string',
            example: '1'
        }
        
        #swagger.parameters['cursor'] = {
            in: 'query',
            description: '페이지네이션 커서 (이전 페이지의 마지막 리뷰 ID)',
            required: false,
            type: 'number',
            example: 1
        }

        #swagger.responses[200] = {
            description: '상점 리뷰 목록 조회 성공 응답',
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
                                                content: { type: "string", example: "정말 맛있어요!" },
                                                storeId: { type: "string", example: "1" },
                                                userId: { type: "string", example: "1" },
                                                score: { type: "number", example: 5 }
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
        #swagger.responses[400] = {
            description: '상점 리뷰 목록 조회 실패 응답',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "FAIL" },
                                    reason: { type: "string", example: "상점 리뷰 목록 조회에 실패했습니다." },
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
            description: '상점 리뷰 목록 조회 실패 응답 - 서버 내부 오류',
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
    handleListStoreReviews);
router.get("/:storeId/missions", 
    /*          
        #swagger.summary = '상점 미션 목록 조회 API'
        #swagger.tags = ['Stores'];
        #swagger.parameters['storeId'] = {
            in: 'path',
            description: '미션을 조회할 상점의 ID',
            required: true,
            type: 'string',
            example: '1'
        }
        
        #swagger.responses[200] = {
            description: '상점 미션 목록 조회 성공 응답',
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
                                                id: { type: "string", example: "1" },
                                                storeId: { type: "string", example: "1" },
                                                costStandard: { type: "number", example: 20000 },
                                                point: { type: "number", example: 1000 }
                                            }
                                        }
                                    },
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            cursor: { type: "number", nullable: true, example: "1" }}
                                }
                            }
                        }
                    }
                }
            }
        }
        
        #swagger.responses[400] = {
            description: '상점 미션 목록 조회 실패 응답',
            #swagger.tags = ['Stores'];
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "FAIL" },
                                    reason: { type: "string", example: "상점 미션 목록 조회에 실패했습니다." },
                                    data: { type: "object", nullable: true, example: null }
                                }
                            },
                            success: { type: "object", nullable: true, example: null }
                        }
                    }
                }
            }
        } 

        #swagger.responses[404] = {
            description: '상점 미션 목록 조회 실패 응답 - store_id에 해당하는 상점 없음',
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
            description: '상점 리뷰 목록 조회 실패 응답 - 서버 내부 오류',
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
    handleListStoreMissions);

export default router;
