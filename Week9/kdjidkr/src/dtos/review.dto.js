export const bodyToReview = (userId, body) => {
    return {
        userId: userId,
        storeId: body.store_id,
        score: body.score,
        content: body.content || "",
    }
}

export const responseFromReview = (review) => {
    return {
        reviewId: review.reviewId.toString(),
        userId: review.userId.toString(),
        storeId: review.storeId.toString(),
        score: review.score,
        content: review.content,
        createdAt: review.createdAt,
    }
}

export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].reviewId : null,
        },
    };
};

export const formattingReviews = (reviews) => {
    return reviews.map((review) => ({
        reviewId: review.reviewId.toString(),
        storeId: review.storeId.toString(),
        score: review.score,
        content: review.content,
        createdAt: review.createdAt,
    }));
}