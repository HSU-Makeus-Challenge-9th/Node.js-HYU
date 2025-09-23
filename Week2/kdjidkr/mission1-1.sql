-- 1-1. 진행 중
select um.user_mission_id, m.point, m.cost_standard, um.is_completed, s.name
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed is False 
      and NOW() < expire_at 
      and user_mission.user_id = {사용자 id}
order by expire_at desc;

-- 1-2. 진행 중 (커서)
select um.user_mission_id, 
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed is False 
      and NOW() < expire_at 
      -- 커서의 expire_at 값보다 expire_at이 크거나 같으면 불러오기
      and um.expire_at >= select(expire_at from um where um.user_mission_id = "커서 미션 아이디"}
      -- 커서는 제외시키기
      and um.user_mission_id != {커서 미션 아이디}
      and user_mission.user_id == {사용자 id}
-- 만료일 얼마 안 남은 순으로 정렬하기
order by expire_at desc;

-- 1-3. 진행 완료
select um.user_mission_id, m.point, m.cost_standard, um.is_completed, s.name
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료된 것만 불러오기
where um.is_completed is True
      and user_mission.user_id = {사용자 id}
order by complete_at;


-- 1-4. 진행 완료 (커서)
select um.user_mission_id, 
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료된 것만 불러오기
where um.is_completed = True 
      -- 커서의 complete_at 값보다 complete_at이 작거나 같으면 불러오기
      and um.complete_at <= select(complete_at from um where um.user_mission_id = "커서 미션 아이디"}
      -- 커서는 제외시키기
      and um.user_mission_id != {커서 미션 아이디}
      and user_mission.user_id == {사용자 id}
-- 만료일 얼마 안 남은 순으로 정렬하기
order by complete_at,;

