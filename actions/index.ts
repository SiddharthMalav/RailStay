/**
 * This file defines server-side actions for managing data.
 * These actions call their respective controllers to handle the logic.
 */

"use server";

import { BookingController } from "@/controllers/booking";
import { HotelController } from "@/controllers/hotel";
import { TrainController } from "@/controllers/trainController";
import { TrainPassangerDetailController } from "@/controllers/trainPassangerDetailController";
import { UserController } from "@/controllers/user";
import { TBookingParams, THotelParams, TrainListType, TrainPassangerDetailType, TUser } from "@/types/shared-types";

export async function getTrainToDataActions() {
  try {
    const train = new TrainController();
    const data = await train.getTrainToDataControl();
    return data;
  } catch (error) {
    console.log("getTrainToDataActions", error);
  }
}
export async function getTrainFromDataActions() {
  try {
    const train = new TrainController();
    const data = await train.getTrainFromDataControl();
    return data;
  } catch (error) {
    console.log("getTrainFromDataActions", error);
  }
}
export async function getTrainListActions(porps: TrainListType) {
  try {
    const train = new TrainController();
    const data = await train.getTrainListControl(porps);
    return data;
  } catch (error) {
    console.log("getTrainListActions", error);
    return error;
  }
}

///TrainPassangerDetail Action
export async function getTrainPassangerDetailListActions(
  props: TrainPassangerDetailType
) {
  try {
    const trainPassangeDetail = new TrainPassangerDetailController();
    const data = await trainPassangeDetail.getTrainToDataControl(props);
    return data;
  } catch (error) {
    console.log("getTrainPassangerDetailListActions", error);
  }
}
export async function getTrainPNRNumberActions() {
  try {
    const trainPassangeDetail = new TrainPassangerDetailController();
    const data = await trainPassangeDetail.getTrainPNRNumberControl();
    return data;
  } catch (error) {
    console.log("getTrainPassangerDetailListActions", error);
  }
}
export async function getTrainNumberActions() {
  try {
    const trainPassangeDetail = new TrainPassangerDetailController();
    const data = await trainPassangeDetail.getTrainNumberControl();
    return data;
  } catch (error) {
    console.log("getTrainPassangerDetailListActions", error);
  }
}
export async function getPersonDetailByIdActions(Id: string) {
  try {
    const trainPassangeDetail = new TrainPassangerDetailController();
    const data = await trainPassangeDetail.getPersonDetailByIdControl(Id);
    return data;
  } catch (error) {
    console.log("getTrainNumberActions", error);
  }
}

export async function getHotelDataAction(data: THotelParams) {
  const controller = new HotelController();
  const res = await controller.getHotelListController(data);
  return res;
}
export async function getRoomByHotelIdAction(id: string) {
  const controller = new HotelController();
  const res = await controller.getRoomByHotelIdController(id);
  return res;
}
export async function getBookingDataAction(data: TBookingParams) {
  const controller = new BookingController();
  const res = await controller.getBookingListController(data);
  return res;
}
export async function getBookingPaymentByIdAction(id: string) {
  const controller = new BookingController();
  const res = await controller.getBookingPaymnetByIdController(id);
  return res;
}

//User Api only for testing or demo purpose
export async function getUserAction(payload: any) {
  const controller = new UserController();
  const res = await controller.getUser(payload);
  return res;
}
export async function addUserAction(payload: TUser) {
  const controller = new UserController();
  const res = await controller.addUser(payload);
  return res;
}
export async function deleteUserAction(id: string) {
  const controller = new UserController();
  const res = await controller.deleteUser(id);
  return res;
}
export async function updateUserAction(payload: any) {
  const controller = new UserController();
  const res = await controller.updateUser(payload);
  return res;
}
export async function getUserByIdAction(id: string) {
  const controller = new UserController();
  const res = await controller.getUserById(id);
  return res;
}
// end here
