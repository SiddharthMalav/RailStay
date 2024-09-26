/**
 * Manages booking-related operations by interfacing with the BookingService.
 * Includes methods to fetch booking lists and payment details by ID.
 */

import { BookingService } from "@/services/booking";
import { TBookingParams, THotelParams } from "@/types/shared-types";
import { IndexController } from ".";

export class BookingController extends IndexController {
    constructor(){
        super();
    }
  async getBookingListController(data: TBookingParams) {
    const service = new BookingService();
    const res = await service.getBookingListService(data);
    return this.parse(res);
  }
  async getBookingPaymnetByIdController(id: string) {
    const service = new BookingService();
    const res = await service.getBookingPaymentByIdService(id);
    return this.parse(res);
  }
}
