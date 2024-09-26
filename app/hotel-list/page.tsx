/**
 * Component for displaying hotel details with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */

"use client";
import { getHotelDataAction } from "@/actions/index";
import RoomDetailList from "@/app/hotel-list/room-list";
import Pagination from "@/component/common/pagination";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
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
    <div className="p-[5rem] h-full">
      <div className="flex flex-row justify-between mb-3">
        <h1 className="text-black-900 font-bold pb-2">Hotel Details</h1>
      </div>
      <div className="flex flex-row justify-between mb-3">
        <label>Search Name</label>
        <input
          className="border"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            updateSearchParams("searchQuery", e.target.value);
          }}
        />
        <select
          name="rooms"
          id="rooms"
          value={occupancyFilter}
          onChange={(e) => {
            updateSearchParams("occupancy", e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="Full">Full</option>
          <option value="Empty">Empty</option>
          <option value="Partial">Partial</option>
        </select>
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
      <Pagination
        itemsPerPage={10}
        items={totalItems}
        initialPage={currentPage}
        onPageChange={onPageChange}
      />
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
