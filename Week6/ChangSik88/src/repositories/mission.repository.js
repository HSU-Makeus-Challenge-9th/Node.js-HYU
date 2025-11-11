import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";


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
    return null;
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
    where: {store_id: store_id, id : {gt:cursor}},
    orderBy: {id: "asc"},
    take:5
  });
  return missions;
};

export const getAllUserMissions = async (user_id,cursor)=>{
  const missions = await prisma.user_mission.findMany({
    select: {
      user_id:true,
      mission_id:true,
      is_cleared:true
    },
    where:{user_id:user_id, id:{gt:cursor}},
    orderBy:{id:"asc"},
    take:5
  });
  return missions;
};

export const requestMissionSuccess = async(user_id,mission_id)=>{
  const missions = await prisma.user_mission.findFirstOrThrow({where:{user_id:user_id,mission_id:mission_id},select:{verifyCode:true}});
  return missions;
}