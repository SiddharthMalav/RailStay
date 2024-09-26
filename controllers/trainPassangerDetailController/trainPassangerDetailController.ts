import { TrainPassangerDetailService } from "@/services/trainPassangerDetailSerivce/trainPassangerDetailSerivce";
import { TrainPassangerDetailType } from "@/types/shared-types";

export class TrainPassangerDetailController {
  async getTrainToDataControl(props: TrainPassangerDetailType) {
    try {
      const service = new TrainPassangerDetailService();
      const resp = await service.getTrainPassangerRouteDetailService(props);
      return resp;
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
      return resp;
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
      return resp;
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
      return resp;
    } catch (error) {
      console.log(
        "error wile calling service for getPersonDetailByIdControl",
        error
      );
    }
  }
}
