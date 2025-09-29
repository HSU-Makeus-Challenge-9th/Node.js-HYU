-- 2. 리뷰를 작성?? or 리뷰를 조회???
-- 2-1. 조회
select s.name, r.score, r.content, r.created_at, rp.review_photo 
from review as r
join review_photo as rp on  r.inquiry_id = rp.inquiry_id
join store as s on r.store_id = s.store_id
where s.store_id = {"매장 id"}

--2-2. 작성
insert into review (user_id, store_id, content, score, created_at, updated_at)
values ({사용자 id}, {store id}, "맛집 인정입니다.", 5.0,NOW(),NOW());
