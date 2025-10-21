export const bodyToReview = (body) => {
    const response = {
	userId: body.userId,
    storeId: body.storeId,
    challengeMissionId: body.challengeMissionId,
    rating: body.rating,
    content: body.content,
  }
  return response;
}

export const responseFromReview = (review) => {
  return {
    data: review,
    pagination: {
      cursor: review.length ? review[review.length-1].id:null,
    },
  };
};
