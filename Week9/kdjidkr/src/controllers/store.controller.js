import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listStoreMissions } from "../services/store.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}

export const handleListStoreMissions = asyncHandler(async (req, res, next) => { 
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
});