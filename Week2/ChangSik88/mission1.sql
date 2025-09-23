-- 커서를 안받을 때
select
ml.mission_point,
mc.is_cleared,
s.name,
ml.mission_money
from Mission_list as ml
join Mission_check as mc on ml.id=mc.Mission_id
join Store as s on s.id=ml.store_id
where mc.is_cleared = 0 -- 진행중 상태를 0, 진행 완료 상태를 1로 생각.
order by ml.id DESC --자세한 지시사항이 없어서 높은 포인트부터 내림차순
Limit 10; 
--커서를 받을 때
select
ml.mission_point,
mc.is_cleared,
s.name,
ml.mission_money
from Mission_list as ml
join Mission_check as mc on ml.id=mc.Mission_id
join Store as s on s.id=ml.store_id
where mc.is_cleared = 0 
and ml.id<{커서값} -- 커서값 이전의 미션만 조회가 됨
order by ml.id DESC
Limit 10; 