import { RequestLog } from "../../models/mongo";
import { RequestLogAttrs, RequestLogRepository } from "../../types/types";

const requestlogRepository: RequestLogRepository = {
    AddRequestLogs: async (data: RequestLogAttrs) => {   
    await RequestLog.create(data);
  },

};

export { requestlogRepository };
