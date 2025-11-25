import express from 'express';
import { handleReviewAdd } from "../controllers/review.controller.js";
import passport from 'passport';

const router = express.Router();

const isLogin = passport.authenticate('jwt', { session: false });
router.post("/",isLogin,  
    /*
        #swagger.summary = '리뷰 등록 API'
        #swagger.tags = ['Reviews'];
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            store_id: { type: "string", example: "1" },
                            score: { type: "number", example: 5 },
                            content: { type: "string", example: "정말 맛있어요!" }
                        }
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: '리뷰 등록 성공 응답',
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
                                    message: { type: "string", example: "리뷰가 성공적으로 등록되었습니다." },
                                    result: {
                                        type: "object",
                                        properties: {
                                            reviewId: { type: "string", example: "1" },
                                            userId: { type: "string", example: "1" },
                                            storeId: { type: "string", example: "1" },
                                            score: { type: "string", example: "5" },
                                            content: { type: "string", example: "정말 맛있어요!" },
                                            createdAt: { type: "string", example: "2023-10-05T12:34:56.789Z", format: "date-time" }
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
            description: '리뷰 등록 실패 응답 - 필수 입력 값 누락',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "MISSING_REQUIRED_FIELD" },
                                    reason: { type: "string", example: "필수 입력 값이 누락되었습니다." },
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
            description: '리뷰 등록 실패 응답 - user_id 또는 store_id에 해당하는 유저/상점 없음',
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
            description: '리뷰 등록 실패 응답 - 서버 내부 오류',
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
    handleReviewAdd);

export default router;
