/**
 * Handles hotel-related operations using the HotelService.
 * Provides methods to retrieve hotel lists and rooms by hotel ID.
 */

import { HotelService } from "@/services/hotel";
import { THotelParams } from "@/types/shared-types";
import { IndexController } from ".";

export class HotelController extends IndexController {
  constructor() {
    super();
  }
  async getHotelListController(data: THotelParams) {
    const service = new HotelService();
    const res = await service.getHotelListService(data);
    return this.parse(res);
  }
  async getRoomByHotelIdController(id: string) {
    const service = new HotelService();
    const res = await service.getRoomByHotelIdService(id);
    return this.parse(res);
  }
}
