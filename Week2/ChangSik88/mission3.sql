select
p.address,
p.my_point,
mc.is_cleared,
ml.deadline,
ml.mission_point,
ml.mission_money,
s.name,
s.address,
store_category
from Mission_list as ml
join Store as s on s.id=ml.store_id
join Mission_check as mc on ml.id = mc.mission_id
join Profile as p on p.id = mc.profile_id
where p.address =s.address and
mc.is_cleared = 0 and --아직 클리어되지 않은 미션 
ml.deadline>date(Now()) --지금 시간으로부터 미션 마감일이 지난 미션은 표시x
order by ml.mission_point DESC --미션 포인트가 높은것 부터 보여줌
limit 10;