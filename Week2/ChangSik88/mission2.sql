Insert into reviews(user_id, store_id, review_score, review_body, created_at, updated_at)
values(
1,
1, 
5.0, 
'음 너무 맛있어요 포인트도 얻고 맛있는 맛집도 알게 된
 것 같아 너무나도 행복한 식사였답니다. 다음에 또 올게
 요!!',
 CURDATE(),
 CURDATE()
 ) -- store_id가 1인 곳에 user_id가 1인 유저의 네임으로 리뷰를 작성