-- 3.
-- 3번에 나눠서 가져오겠습니다.
-- 3-1. 알림 안 본 거 있는지 조회하기
select notification_id
from notification
where user_id = {사용자 id} and is_read is False
order by created_at desc;

-- 3-2. 달성한 미션이 몇 개인지
select count(*)
from user_mission
where user_id = {사용자 id} and is_completed is True
group by user_id;

-- 3-3. 진행 중
select um.user_mission_id, 
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed = False 
      and NOW() < expire_at 
      and user_mission.user_id = {사용자 id}
order by expire_at desc;