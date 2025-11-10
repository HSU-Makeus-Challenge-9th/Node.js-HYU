export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const formattingReviews = (reviews) => {
    return reviews.map((review) => ({
        id: review.reviewId.toString(),
        storeId: review.storeId.toString(),
        content: review.content,
        score: review.score.toString(),
    }));
}