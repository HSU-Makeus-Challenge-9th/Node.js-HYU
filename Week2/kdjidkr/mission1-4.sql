-- 4.
select name, email, is_phone_verified, phone, point
from account
where user_id = {유저 식별 아이디};
