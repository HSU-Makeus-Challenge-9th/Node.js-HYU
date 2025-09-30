select 
p.name,
p.email,
p.my_point,
pc.is_confirm
from profile as p
left join phone_check as pc on pc.profile_id=p.id
where p.id=(:user_id)