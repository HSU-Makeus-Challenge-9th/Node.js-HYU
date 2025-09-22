select 
p.name,
p.email,
p.my_point,
pc.is_confirm
from profile as p
join phone_check pc on pc.profile_id=p.id --새 커밋용