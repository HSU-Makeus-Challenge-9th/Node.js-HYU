import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews });
}

export const handleListStoreMissions = async (req, res, next) => {
    try {
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: missions });
    } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message: error.message});
    } 
}