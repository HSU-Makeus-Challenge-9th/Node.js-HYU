export const bodyToReview = (body) => {
    return {
        userId: body.user_id,
        storeId: body.store_id,
        score: body.score,
        content: body.content || "",
    }
}

export const responseFromReview = (review) => {
    return {
        userId: review.userId.toString(),
        storeId: review.storeId.toString(),
        score: review.score,
        content: review.content,
    }
}