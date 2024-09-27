/**
 * Component for displaying particular train and passange details  .
  */
import Title from "@/component/common/title";

type TrainRowDetailProps = {
  data: TTrainDetailProps;
};

type TTrainDetailProps = {
  trainDetails: {
    trainNumber: string;
    PNRNumber: string;
    journeyStart: string;
    departureTime: string;
    ticketPrice: number;
  };
  personDetail: [
    {
      name: string;
      age: string;
      mobileNumber: string;
      email: string;
      dob: string;
      _id: string;
    }
  ];
  luggage: [{ numberOfBags: string; weight: string }];
};

const TrainRowDetailModal: React.FC<TrainRowDetailProps> = (props) => {
  const { trainDetails, personDetail, luggage } = props.data;

  console.log("Train Details:", trainDetails);
  console.log("Person Details:", personDetail);
  console.log("Luggage:", luggage);

  return (
    <div className="bg-white">
      <div className="p-4">
        <Title>Details</Title>
        <hr className="py-2" />

        {/* Conditionally render Train Details if they exist */}
        {trainDetails && (
          <>
            <Title>Train Details</Title>
            <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
              <thead>
                <tr className="border-b-2">
                  <th>Sr</th>
                  <th>Train Number</th>
                  <th>PNR Number</th>
                  <th>Journey Start</th>
                  <th>Departure Time</th>
                  <th>Ticket Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b-2 even:bg-gray-200 odd:bg-white"
                  key="row"
                >
                  <td className="text-center">1</td>
                  {/* Loop over the train details and display them */}
                  {Object.entries(trainDetails).map(([key, value], index) => (
                    <td key={index} className="text-center">
                      {String(value) || "Undefined"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </>
        )}
        {/* Conditionally render Person Details if they exist */}
        {personDetail && Object.keys(personDetail).length > 0 && (
          <>
            <Title>Person Details</Title>
            <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
              <thead>
                <tr className="border-b-2">
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  {/* Loop over the train details and display them */}
                  {Object.entries(personDetail).map(
                    ([key, value], index) =>
                      key !== "_id" && (
                        <td key={index} className="text-center">
                          {String(value) || "Undefined"}
                        </td>
                      )
                  )}
                </tr>
              </tbody>
            </table>
          </>
        )}
        {/* Conditionally render luggae Details if they exist */}
        {luggage && luggage.length > 0 && (
          <>
            <Title>Person Details</Title>
            <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
              <thead>
                <tr className="border-b-2">
                  <th>Sr</th>
                  <th>Number Of Bags</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {luggage &&
                  luggage.length > 0 &&
                  luggage.map((item, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="text-center">{index + 1}</td>
                      {/* Loop over the train details and display them */}
                      {Object.entries(item).map(
                        ([key, value], index) =>
                          key !== "_id" && (
                            <td key={index} className="text-center">
                              {String(value) || "Undefined"}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainRowDetailModal;
