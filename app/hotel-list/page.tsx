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
import TableHeader from "@/component/common/table-header";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import Utils from "@/utils";
import { roomFilter } from "@/utils/store";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const initialFilter = {
  occupancy: "",
  searchQuery: "",
  currentPage: 1,
  noOfRecord: 10,
  Order: "A",
  Key: "Sr",
};

const HotelDetailList = () => {
  const router = useRouter();
  const { onShowDrawer } = useDrawer();
  const { onShowToast } = useToast();
  const searchParams = useSearchParams();
  const [items, setItems] = useState(10);
  const [filterModel, setFilterModal] = useState({
    ...initialFilter,
    ...Utils.getQuery(),
  });
  const [hotelList, setHotelList] = useState<THotel[]>([]);

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
      const response = await getHotelDataAction(props);
      if (response.status == eHTTPStatusCode.OK) {
        setHotelList(response.data || []);
        setItems(response.totalItems);
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
    fetchData({ ...filterModel, ...Utils.getQuery() });
  }, [searchParams]);

  const showDrawer = (id: string) => {
    onShowDrawer({
      dimmer: true,
      width: "50%",
      name: "Show Drawer Form",
      Component: () => <RoomDetailList hotelId={id} />,
    });
  };

  const startIndex = (filterModel.currentPage - 1) * 10;

  return (
    <div className="px-10 pb-4 pt-20 h-full">
      <Title>Hotels Details</Title>

      <div className="flex flex-row justify-between mb-3">
        <div className="flex gap-2">
          <Label>Search Name</Label>
          <Input
            className="border"
            type="text"
            value={filterModel.searchQuery}
            onChange={(e) => {
              updateFilterModal({
                searchQuery: e.target.value,
                currentPage: 1,
              });
            }}
            placeholder={"search anything..."}
            name={""}
          />
        </div>
        <DropDown
          name="rooms"
          value={filterModel.occupancy}
          onChange={(e) => {
            updateFilterModal({ occupancy: e.target.value, currentPage: 1 });
          }}
          options={roomFilter}
        />
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b">
            <th>Sr</th>
            <TableHeader
              Order={filterModel.Order}
              updateFilterModal={updateFilterModal}
              columnKey={filterModel.Key}
              keyValue="name"
            >
              Hotel Name
            </TableHeader>
            <th>Contact Number</th>
            <th>Pin Code </th>
            <th>Location</th>
            <TableHeader
              Order={filterModel.Order}
              updateFilterModal={updateFilterModal}
              columnKey={filterModel.Key}
              keyValue="totalRooms"
            >
              Total Rooms
            </TableHeader>
            <TableHeader
              Order={filterModel.Order}
              updateFilterModal={updateFilterModal}
              columnKey={filterModel.Key}
              keyValue="availableRooms"
            >
              Rooms Available
            </TableHeader>
            <th>Occupancy</th>
            <th>Rooms Details</th>
          </tr>
        </thead>
        <tbody>
          {hotelList && hotelList.length ? (
            hotelList.map((item, index: number) => (
              <tr
                className="border-b even:bg-gray-200 odd:bg-white"
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
            ))
          ) : (
            <tr>
              <td className="py-6 px-4">No Record Found</td>
            </tr>
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
