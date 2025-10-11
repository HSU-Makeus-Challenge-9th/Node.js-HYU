export const formDataToReview = (body, files) => {
  return {
    challengeMissionId: parseInt(body.challengeMissionId),
    rating: parseFloat(body.rating),
    content: body.content,
    images: files ? files.map(file => file.filename) : []
  };
};

export const responseFromReview = (review, storeName) => {
  return {
    reviewId: review.review_id,
    storeName: storeName
  };
};
