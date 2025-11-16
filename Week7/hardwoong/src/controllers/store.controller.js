import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  try {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeAdd(bodyToStore(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "가게가 성공적으로 추가되었습니다.",
      data: store
    });
  } catch (err) {
    next(err);
  }
};
