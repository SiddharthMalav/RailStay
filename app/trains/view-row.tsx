/**
 * Component for displaying particular train details  .
 */

import Title from "@/component/common/title";

type TrainRowDetailProps = {
  data: TrainRowDetail;
};
type TrainRowDetail = {
  from: string;
  status: string;
  to: string;
  trainNumber: string;
  __v: number;
  _id: string;
};

const TrainRowDetailModal = (props: TrainRowDetailProps) => {
  const { data } = props;
  return (
    <div className="bg-white">
      <div className="p-4">
        <Title>User Form</Title>
        <hr className="py-2" />
        <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
          <thead>
            <tr className="border-b-2">
              <th>Sr</th>
              <th>Train Number</th>
              <th>status</th>
              <th>From</th>
              <th>To</th>
              <th>Kids</th>
              <th>Young</th>
              <th>Old</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="border-b-2 even:bg-gray-200 odd:bg-white"
              key={"row"}
            >
              <td className="text-center ">1</td>
              {Object.entries(data).map(([key, value], index) => (
                <td key={index} className="text-center">
                  {value ?? "Undefined"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainRowDetailModal;
