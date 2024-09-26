import { TrainService } from "@/services/trainsServices";
import { TrainListType } from "@/types/shared-types";
import { IndexController } from ".";

export class TrainController extends IndexController {
  async getTrainToDataControl() {
    try {
      const service = new TrainService();
      const resp = await service.getTrainToDataService();
      return this.parse(resp);
    } catch (error) {
      return error;
    }
  }
  async getTrainFromDataControl() {
    try {
      const service = new TrainService();
      const resp = await service.getTrainFromDataService();
      return this.parse(resp);
    } catch (error) {
      return error;
    }
  }
  async getTrainListControl(props: TrainListType) {
    try {
      const service = new TrainService();
      const resp = await service.getTrainListService(props);
      return this.parse(resp);
    } catch (error) {
      return error;
    }
  }
}
