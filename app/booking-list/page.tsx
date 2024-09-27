/**
 * Component for displaying booking details with filtering options and pagination.
 * It also handles the display of payment details via a modal.
 */

"use client";
import { getBookingDataAction } from "@/actions/index";
import PaymentDetailList from "@/app/booking-list/payment-list";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import Utils from "@/utils";
import { faStreetView } from "@fortawesome/free-solid-svg-icons/faStreetView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

type TBooking = {
  _id: string;
  name: string;
  address: string;
  number: string;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  roomId: string;
};
const initialFilter = {
  occupancy: "",
  searchQuery: "",
  startDate: "",
  endDate: "",
  currentPage: 1,
  noOfRecord: 10,
};

const BookingDetailList = () => {
  const { onShowModal } = useModal();
  const { onShowToast } = useToast();
  const [bookingList, setBookingList] = useState<TBooking[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState(10);
  const [filterModel, setFilterModal] = useState({
    ...initialFilter,
    ...Utils.getQuery(),
  });
  const updateFilterModal = (newFilter: any) => {
    const updateFilter = {
      ...filterModel,
      ...newFilter,
    };
    setFilterModal(updateFilter);
    Utils.updateQueryParams(updateFilter, router);
  };

  const fetchData = async (props: any) => {
    try {
      const res = await getBookingDataAction(props);
      if (res.status == eHTTPStatusCode.OK) {
        setBookingList(res.data || []);
        setItems(res.totalItems);
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          content: res.message,
        });
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaCheck />,
          content: res.message,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData({ ...filterModel, ...Utils.getQuery() });
  }, [searchParams]);

  const startIndex = (filterModel.currentPage - 1) * 10;
  const showDrawer = (id: string) => {
    onShowModal({
      title: "Payment Details",
      showButton: true,
      Component: () => <PaymentDetailList bookingId={id} />,
    });
  };

  return (
    <div className="px-10 pb-4 pt-20 h-full">
      <Title>Booking Details</Title>
      <div className="flex flex-row pt-2 justify-between mb-3">
        <Label>Search Name</Label>
        <Input
          className="border"
          value={filterModel.searchQuery}
          type="text"
          onChange={(e) => {
            updateFilterModal({
              searchQuery: e.target.value,
              currentPage: 1,
            });
          }}
          placeholder={"search anything..."}
          name={""}
        />
        <Label>CheckIn Date:</Label>
        <Input
          type="date"
          value={filterModel.startDate}
          name="startDate"
          onChange={(e) => {
            updateFilterModal({ startDate: e.target.value, currentPage: 1 });
          }}
        />
        <Label>Checkout Date:</Label>
        <Input
          type="date"
          name="endDate"
          value={filterModel.endDate}
          onChange={(e) => {
            updateFilterModal({ endDate: e.target.value, currentPage: 1 });
          }}
        />
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b">
            <th>Sr</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Number</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Hotel Name</th>
            <th>Room Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingList && bookingList.length ? (
            bookingList.map((item, index) => (
              <tr
                className="border-b even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">{startIndex + index + 1}</td>
                <td className="text-center ">{item.name}</td>
                <td className="text-center">{item.address}</td>
                <td className="text-center">{item.number}</td>
                <td className="text-center">{Utils.getDate(item.checkIn)}</td>
                <td className="text-center">{Utils.getDate(item.checkOut)}</td>
                <td className="text-center">{item.hotelId}</td>
                <td className="text-center">{item.roomId}</td>
                <td className="text-center">
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faStreetView}
                    onClick={() => {
                      showDrawer(item._id);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <p className="py-6 px-4">No Data Found</p>
          )}
        </tbody>
      </table>
      <div className="py-8">
        <Pagination
          current={Number(filterModel.currentPage)}
          total={items}
          pageSize={10}
          onChange={(page, pageSize) => {
            updateFilterModal({ currentPage: page });
          }}
        />
      </div>
    </div>
  );
};

export default BookingDetailList;
