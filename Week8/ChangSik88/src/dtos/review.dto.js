export const bodyToReview = (body) => {
    const response = {
	  user_id: body.user_id,
    store_id: body.store_id,
    body: body.body,
    score: body.score,
  }
  return response;
}
export const responseFromReview = (body) => {
  const response = {
    user_id: body.user_id,
    store_id: body.store_id,
    body: body.body,
    score: body.score

  };
  return response;
}

export const responseFromReviews = (review) => {
  return {
    data: review,
    pagination: {
      cursor: review.length ? review[review.length-1].id:null,
    },
  };
};
