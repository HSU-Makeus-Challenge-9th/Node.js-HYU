START TRANSACTION;

INSERT INTO reviews (user_id, store_id, review_text, score, created_at, updated_at)
VALUES (
	1, 
	1, 
	'음 너무 맛있어요 포인트토 얻고 맛잇는 맛집도 알게 된 것 같아 너무나도 행복한 식사였답니다. 다음에 또 올게요!!', 
	5.0,
	NOW(), 
	NOW()
);

INSERT INTO review_imgs (review_id, review_img)
VALUES (1, 'https://s3-img1.jpg');
-- 혹은 @last_review_id


INSERT INTO review_imgs (review_id, review_img)
VALUES (1, 'https://s3-img2.jpg');
-- 혹은 @last_review_id

COMMIT;
-- 문제 발생 시 ROLLBACK; 로직에서 호출