export const bodyToReviewJson = (body) => {
  return {
    challengeMissionId: parseInt(body.challengeMissionId),
    userId: parseInt(body.userId),
    rating: parseFloat(body.rating),
    content: body.content
  };
};

export const responseFromReviewJson = (review, storeName) => {
  return {
    reviewId: review.review_id,
    storeName: storeName
  };
};
