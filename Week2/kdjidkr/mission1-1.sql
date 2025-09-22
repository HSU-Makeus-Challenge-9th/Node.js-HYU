-- 1-1. 진행 중
select m.point, s.name, m.cost_standard, um.is_completed
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

-- 1-1. 진행 중, 커서
select m.point, s.name, m.cost_standard, um.is_completed
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed is False 
      and NOW() < um.expire_at 
      and um.user_id = {사용자 id}
      and um.expire_at >= (select expire_at from um where user_mission_id = {커서 아이디})
      and um.user_mission_id != {커서 아이디}
order by expire_at desc
limit 10;

-- 1-2. 완료
select m.point, s.name, m.cost_standard, um.is_completed
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed is True
      and um.user_id = {사용자 id}
order by complete_at;

-- 1-2. 완료, 커서
select m.point, s.name, m.cost_standard, um.is_completed
from 
      user_mission as um
join 
      mission as m on um.mission_id = m.mission_id
join
      store as s m.store_id = s.store_id
-- 완료 되지 않았고, 만료시간 전이라면 진행 중
where um.is_completed is True
      and um.user_id = {사용자 id}
      and um.complete_at >= (select complete_at from um where user_mission_id = {커서 아이디})
      and um.user_mission_id != {커서 아이디}
order by expire_at desc
limit 10;
