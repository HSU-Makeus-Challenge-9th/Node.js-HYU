import { getAllStoreReviews } from "../repositories/store.repository.js";
import {getStoreMissions} from "../repositories/store.repository.js";
import {formattingMissions, responseFromMissions} from "../dtos/store.dto.js";
import { formattingReviews, responseFromReviews } from "../dtos/review.dto.js";

export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(formattingReviews(reviews));
}

export const listStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(formattingMissions(missions));
}