import { TrainPassangerDetailService } from "@/services/trainPassangerDetailSerivce";
import { TrainPassangerDetailType } from "@/types/shared-types";
import { IndexController } from ".";

export class TrainPassangerDetailController extends IndexController {
  async getTrainToDataControl(props: TrainPassangerDetailType) {
    try {
      const service = new TrainPassangerDetailService();
      const resp = await service.getTrainPassangerRouteDetailService(props);
      return this.parse(resp);
    } catch (error) {
      console.log(
        "error wile calling service for getTrainToDataControl",
        error
      );
    }
  }
  async getTrainPNRNumberControl() {
    try {
      const service = new TrainPassangerDetailService();
      const resp = await service.getTrainPNRNumberService();
      return this.parse(resp);
    } catch (error) {
      console.log(
        "error wile calling service for getTrainPNRNumberControl",
        error
      );
    }
  }
  async getTrainNumberControl() {
    try {
      const service = new TrainPassangerDetailService();
      const resp = await service.getTrainNumberService();
      return this.parse(resp);
    } catch (error) {
      console.log(
        "error wile calling service for getTrainNumberControl",
        error
      );
    }
  }
  async getPersonDetailByIdControl(Id: string) {
    try {
      const service = new TrainPassangerDetailService();
      const resp = await service.getPersonDetailById(Id);
      return this.parse(resp);
    } catch (error) {
      console.log(
        "error wile calling service for getPersonDetailByIdControl",
        error
      );
    }
  }
}
