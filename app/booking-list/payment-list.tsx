/**
 * Component for displaying payment details of a booking.
 * Fetches and displays payment information for a specific booking ID.
 */
import { getBookingPaymentByIdAction } from "@/actions/index";
import Title from "@/component/common/title";
import { useEffect, useState } from "react";

const PaymentDetailList = (props: Tprops) => {
  const { bookingId } = props;
  const [hotelRoomData, setHotelRoomData] = useState<TPayment[]>([]);
  const fetchData = async () => {
    try {
      const response = await getBookingPaymentByIdAction(bookingId);
      if (response) setHotelRoomData(response.data[0].payments || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full overflow-y-auto pt-4">
      <Title>Payments Details</Title>

      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b">
            <th>Sr</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {hotelRoomData &&
            hotelRoomData.map((item, index: number) => (
              <tr
                className="border-b even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">{index + 1}</td>
                <td className="text-center">{item.paymentMethod}</td>
                <td className="text-center">{item.paymentDate}</td>
                <td className="text-center">{item.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentDetailList;

type Tprops = {
  bookingId: string;
};
type TPayment = {
  paymentMethod: string;
  paymentDate: string;
  amount: number;
};
