/**
 * Component for displaying hotel details with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */

"use client";
import { getHotelDataAction } from "@/actions/index";
import RoomDetailList from "@/app/hotel-list/room-list";
import DropDown from "@/component/common/dropdown";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Pagination from "@/component/common/pagination";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import { roomFilter } from "@/utils/store";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const HotelDetailList = () => {
  const router = useRouter();
  const { onShowDrawer } = useDrawer();
  const { onShowToast } = useToast();
  const searchParams = useSearchParams();
  const occupancyFilter = searchParams.get("occupancy") || "";
  const searchQuery = searchParams.get("searchQuery") || "";
  const currentPage =
    (searchParams.get("currentPage") as unknown as number) || 1;

  const [totalItems, setTotalItems] = useState<number>(0);
  const [hotelList, setHotelList] = useState<THotel[]>([]);

  const updateSearchParams = (key: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    if (key !== "currentPage") {
      queryParams.set("currentPage", "1");
    }
    router.push(`hotel-list?${queryParams.toString()}`);
  };
  const onPageChange = (pageNo: string | number) => {
    updateSearchParams("currentPage", pageNo.toString() || "1");
  };

  const fetchData = async () => {
    try {
      const response = await getHotelDataAction({
        searchQuery,
        currentPage,
        occupancy: occupancyFilter,
      });
      if (response.status == eHTTPStatusCode.OK) {
        setHotelList(response.data || []);
        setTotalItems(response.totalItems || 0);
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          content: response.message,
        });
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaCheck />,
          content: response.message,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const showDrawer = (id: string) => {
    onShowDrawer({
      dimmer: true,
      width: "50%",
      name: "Show Drawer Form",
      Component: () => <RoomDetailList hotelId={id} />,
    });
  };

  const startIndex = (currentPage - 1) * 10;

  return (
    <div className="px-10 pb-4 pt-20 h-full">
      <Title>Hotels Details</Title>

      <div className="flex flex-row justify-between mb-3">
        <div className="flex gap-2">
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
        </div>
        <DropDown
          name="rooms"
          value={occupancyFilter}
          onChange={(e) => {
            updateSearchParams("occupancy", e.target.value);
          }}
          options={roomFilter}
        />
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b-2">
            <th>Sr</th>
            <th>Hotel Name</th>
            <th>Contact Number</th>
            <th>Pin Code </th>
            <th>Location</th>
            <th>Total Rooms</th>
            <th>Rooms Available</th>
            <th>Occupancy</th>
            <th>Rooms Details</th>
          </tr>
        </thead>
        <tbody>
          {hotelList &&
            hotelList.map((item, index: number) => (
              <tr
                className="border-b-2 even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">{startIndex + index + 1}</td>
                <td className="text-center ">{item.name}</td>
                <td className="text-center">{item.contactNumber}</td>
                <td className="text-center">{item.pinCode}</td>
                <td className="text-center">{item.Location}</td>
                <td className="text-center">{item.totalRooms}</td>
                <td className="text-center">{item.availableRooms}</td>
                <td className="text-center">{item.occupancy}</td>
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

export default HotelDetailList;
type THotel = {
  _id: string;
  name: string;
  pinCode: string;
  contactNumber: string;
  Location: string;
  totalRooms: number;
  availableRooms: number;
  occupancy: string;
};
