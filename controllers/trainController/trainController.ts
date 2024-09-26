import { TrainService } from "@/services/trainsServices/trainsServices";
import { TrainListType } from "@/types/shared-types";

export class TrainController {
  async getTrainToDataControl() {
    try {
      const service = new TrainService();
      const resp = await service.getTrainToDataService();

      return resp;
    } catch (error) {
      console.log("getTrainToDataControl", error);
      return error;
    }
  }
  async getTrainFromDataControl() {
    try {
      const service = new TrainService();
      const resp = await service.getTrainFromDataService();

      return resp;
    } catch (error) {
      console.log("getTrainFromDataControl", error);
    }
  }
  async getTrainListControl(props: TrainListType) {
    try {
      const service = new TrainService();
      const resp = await service.getTrainListService(props);

      return resp;
    } catch (error) {
      return error;
      console.log("getTrainListControl", error);
    }
  }
}
