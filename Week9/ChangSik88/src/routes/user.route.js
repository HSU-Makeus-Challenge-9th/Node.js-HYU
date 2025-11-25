import express from 'express';
import { handleUserSignUp,handleUserInfo } from "../controllers/user.controller.js";
import { handleListUserReviews } from '../controllers/review.controller.js';
import { handleListUserMission } from '../controllers/mission.controller.js';
import { isLogin } from '../auth.middleware.js';

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.put("/me",isLogin,handleUserInfo);
router.get("/:userId/reviews",isLogin, handleListUserReviews);
router.get("/:userId/missions",isLogin, handleListUserMission);


export default router;