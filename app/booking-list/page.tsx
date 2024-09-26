/**
 * Component for displaying booking details with filtering options and pagination.
 * It also handles the display of payment details via a modal.
 */

"use client";
import { getBookingDataAction } from "@/actions/index";
import PaymentDetailList from "@/app/booking-list/payment-list";
import Button from "@/component/common/button";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Pagination from "@/component/common/pagination";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import Utils from "@/utils";
import { faStreetView } from "@fortawesome/free-solid-svg-icons/faStreetView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const BookingDetailList = () => {
  const { onShowModal } = useModal();
  const { onShowToast } = useToast();
  const [totalItems, setTotalItems] = useState<number>(0);
  const [bookingList, setBookingList] = useState<TBooking[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("searchQuery") || "";
  const currentPage =
    (searchParams.get("currentPage") as unknown as number) || 1;

  const updateSearchParams = (key: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    if (key !== "currentPage") {
      queryParams.set("currentPage", "1");
    }
    router.push(`booking-list?${queryParams.toString()}`);
  };

  const fetchData = async () => {
    try {
      const res = await getBookingDataAction({
        currentPage,
        startDate,
        endDate,
        searchQuery,
      });
      if (res.status == eHTTPStatusCode.OK) {
        setBookingList(res.data || []);
        setTotalItems(res.totalItems || 0);
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
    fetchData();
  }, [searchParams]);

  const onPageChange = (pageNo: string | number) => {
    updateSearchParams("currentPage", pageNo.toString() || "1");
  };
  const onApply = () => {
    updateSearchParams("startDate", startDate.toString() || "");
    updateSearchParams("endDate", endDate.toString() || "");
  };

  const startIndex = (currentPage - 1) * 10;
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
          type="text"
          onChange={(e) => {
            updateSearchParams("searchQuery", e.target.value);
          }}
          placeholder={"search anything..."}
          name={""}
        />
        <Label>CheckIn Date:</Label>
        <Input
          type="date"
          name="stateDate"
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <Label>Checkout Date:</Label>
        <Input
          type="date"
          name="endDate"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            onApply();
          }}
        >
          Apply
        </Button>
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b-2">
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
          {bookingList &&
            bookingList.map((item, index) => (
              <tr
                className="border-b-2 even:bg-gray-200 odd:bg-white"
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
            ))}
        </tbody>
      </table>
      <div className="py-8">
        <Pagination
          itemsPerPage={10}
          items={totalItems}
          onPageChange={onPageChange}
          initialPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BookingDetailList;
