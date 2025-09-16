SELECT 
    um.challenge_mission_id, -- 다음 페이지를 위한 커서
    um.status,
    m.mission_point,
    s.store_name,
    m.mission_money    
FROM 
    user_missions AS um
INNER JOIN
    missions AS m ON um.mission_id2 = m.mission_id
INNER JOIN
    stores AS s ON um.store_id = s.store_id -- 가게 정보 JOIN
WHERE 
    um.user_id = 1
    AND um.status = '진행중'  -- 완료한 것 보려면 '진행 완료'
ORDER BY 
    um.challenge_mission_id DESC 
LIMIT 10;