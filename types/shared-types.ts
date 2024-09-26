/**
 * This file contains various common type definitions used across the application.
 */
export type THotelParams = {
  searchQuery: string;
  currentPage: number | string;
  occupancy: number | string;
};
export type TBookingParams = {
  searchQuery: string;
  startDate: string;
  endDate: string;
  currentPage: number | string;
};
export type TUser = {
  name: string;
  age: number | string;
  gender: string;
  address: string;
  email: string;
  number: string | number;
  pincode: string | number;
};
