import express from 'express';
import {
    createMission,
    startMission,
    handleMissionSuccessRequest,
    handleMissionSuccessConfirm
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/", createMission);
router.post("/:missionId/challenges",startMission);


router.get("/:missionId/request", handleMissionSuccessRequest);
//app.get("/api/v1/missions/:missionId/confirm", handleMissionSuccessConfirm);

export default router;