import { getAllStoreReviews } from "../repositories/store.repository.js";
import { formattingReviews, responseFromReviews } from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(formattingReviews(reviews));
}
