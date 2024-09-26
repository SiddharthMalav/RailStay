/**
 * Component for displaying room details of a hotel.
 * Fetches and displays room information for a specific hotel ID.
 */
import { getRoomByHotelIdAction } from "@/actions/index";
import Title from "@/component/common/title";
import { useEffect, useState } from "react";
type TProps = {
  hotelId: string;
};
type TRoom = {
  roomNo: string;
  roomType: string;
  status: string;
  price: number;
};

const RoomDetailList = (props: TProps) => {
  const { hotelId } = props;
  const [hotelRoomData, setHotelRoomData] = useState<TRoom[]>([]);
  const fetchData = async () => {
    try {
      const response = await getRoomByHotelIdAction(hotelId);
      setHotelRoomData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [hotelId]);

  return (
    <div className="p-4 h-full overflow-y-auto ">
      <Title>Rooms Details</Title>

      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b-2">
            <th>Sr</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {hotelRoomData &&
            hotelRoomData.map((item, index) => (
              <tr
                className="border-b-2 even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">{index + 1}</td>
                <td className="text-center ">{item.roomNo}</td>
                <td className="text-center">{item.roomType}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">{item.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetailList;
