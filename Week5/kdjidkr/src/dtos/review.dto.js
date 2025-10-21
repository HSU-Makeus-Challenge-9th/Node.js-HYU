export const bodyToReview = (body) => {
    return {
        user_id: body.user_id,
        store_id: body.store_id,
        score: body.score,
        content: body.content || "",
        image: body.image || "",
    }
}

export const responseFromReview = (review) => {
    return review;
}