-- 1-1. 진행 중
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