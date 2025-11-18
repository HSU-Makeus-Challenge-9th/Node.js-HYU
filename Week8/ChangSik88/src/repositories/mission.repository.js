
import { prisma } from "../db.config.js";
import { MissionAlreadyChallengeError, NotClearMissionError } from "../middlewares/errors.js";


export const addMission = async (data) => {
  const {storeId,...missionInfo} = data;
  //원래 미션 중복 체크가 있었는데 딱히 필요가 없어보여서 지움. 만약 한 가게당 미션 개수 제한이 있으면 다시 넣을듯
  const created = await prisma.mission_list.create({ data:{
    store:{connect: {id:data.storeId}},
    mission_point: data.mission_point,
    deadline: new Date(data.deadline),
    mission_spec: data.mission_spec,
    mission_money: data.mission_money,    
}});
  return created.id;
};


export const getMission = async (mission_id) => {
  const mission = await prisma.mission_list.findFirstOrThrow({where: {id: mission_id}});
  return mission;
};


export const startChallenge = async(data) =>{
  const challenge = await prisma.user_mission.findFirst({where:{user_id: data.user_id,
    mission_id: data.mission_id}})
  if(challenge){
    throw new MissionAlreadyChallengeError('이미 진행중인 미션입니다',{mission_id : data.mission_id});
  };
  const created = await prisma.user_mission.create({data:{
    user:{connect:{id:data.user_id}},
    mission_list:{connect:{id:data.mission_id}},
  }});
  return created.id;
};

export const getChallenge = async(challengeId)=>{
   const challenge = await prisma.user_mission.findFirstOrThrow({where:{id:challengeId}});
   return challenge;
};

//6주차 내용

export const getAllStoreMissions = async(store_id, cursor) => {
  const missions = await prisma.mission_list.findMany({
    select:{
      store_id : true,
      mission_point : true,
      deadline : true,
      mission_spec: true,
      mission_money: true
    },
    where: {store_id: store_id,
      ...(cursor?{id : {gt:cursor}}:[]),
    },
    orderBy: {id: "desc"},
    take:5
  });
  return missions.reverse;
};

export const getAllUserMissions = async (user_id,cursor)=>{
  const missions = await prisma.user_mission.findMany({
    select: {
      id: true,
      user_id: true,
      mission_id: true,
      status: true,
      createdAt: true,
      mission_list: {
        select: {
          mission_spec: true,
          mission_point: true,
          deadline: true,
          store: {
            select: {
              name: true,
              region: true,
            },
          },
        },
      },
    },
    where: {
      user_id: user_id,
      status: '진행중', // 진행 중인 미션만 조회 -> O
      ...(cursor ? { id: { lt: cursor } } : {}),
    },
    orderBy: { id: 'desc' },
    take: 5,
  });
  return missions.reverse();
};
export const requestMissionSuccess = async(user_id,mission_id)=>{
  const missions = await prisma.user_mission.findFirstOrThrow({where:{user_id:user_id,mission_id:mission_id},select:{verifyCode:true}});
  return missions;
}

export const checkVerifyCode = async(userId,missionId,verifyCode) => {
  //확인 코드가 일치하는지 확인
  const verification = await prisma.user_mission.findFirst({
    where: {
      user_id: userId,
      mission_id: missionId,
      verifyCode:verifyCode
    },
  });
};

export const updateMissionStatus = async (userId, missionId, status) => {
    // 미션이 진행 중인지 확인
  const userMission = await prisma.user_mission.findFirst({
    where: {
      user_id: userId,
      mission_id: missionId,
      is_cleared: '진행 중',
    },
  });

  if (!userMission) {
    throw new NotClearMissionError("진행 중인 미션이 아니거나 존재하지 않습니다.",missionId);
  }

  const updated = await prisma.user_mission.updateMany({
    where: {
      user_id: userId,
      mission_id: missionId,
    },
    data: {
      is_cleared: status, // "진행완료"
    },
  });

  if (updated.count === 0) {
    throw new Error('해당 미션을 찾을 수 없습니다.');
  }

  const mission = await prisma.user_mission.findFirst({
    where: {
      user_id: userId,
      mission_id: missionId,
    },
    include: {
      mission_list: {
        include: {
          store: true,
        },
      },
    },
  });

  return mission;
};

