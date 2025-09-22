select
ml.mission_point,
mc.is_cleared,
s.name,
ml.mission_money
from Mission_list as ml
join Mission_check as mc on ml.id=mc.Mission_id
join Store as s on s.id=ml.store_id
where mc.is_cleared = 0 -- 진행중 상태를 0, 진행 완료 상태를 1로 생각.
order by ml.mission_point DESC --자세한 지시사항이 없어서 높은 포인트부터 내림차순
Limit 10; 