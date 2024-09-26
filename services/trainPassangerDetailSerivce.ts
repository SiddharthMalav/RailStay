import { trainPassangerRouteDetail } from "@/schemas/trainPassangerRouteDetail";
import { TrainPassangerDetailType } from "@/types/shared-types";

export class TrainPassangerDetailService {
  async getTrainPassangerRouteDetailService(props: TrainPassangerDetailType) {
    try {
      const {
        searchText,
        currentPage,
        PNRNumber,
        trainNumber,
        fromDate,
        toDate,
        age,
      } = props;
      const skip = (currentPage - 1) * 50;

      const matchStage: any = {};

      if (PNRNumber && PNRNumber !== "All") {
        matchStage["trainDetails.PNRNumber"] = PNRNumber;
      }
      if (age && age !== "All") {
        switch (age) {
          case "Kids":
            matchStage["personDetail.age"] = { $lte: "18" };
            break;
          case "Young":
            matchStage["personDetail.age"] = { $gte: "19", $lte: "55" };
            break;
          case "Old":
            matchStage["personDetail.age"] = { $gte: "56" };
            break;
          default:
            break;
        }
      }
      if (trainNumber && trainNumber !== "All") {
        matchStage["trainDetails.trainNumber"] = trainNumber;
      }

      if (fromDate) {
        matchStage["trainDetails.journeyStart"] = { $gte: new Date(fromDate) };
      }

      if (toDate) {
        matchStage["trainDetails.departureTime"] = { $lte: new Date(toDate) };
      }

      if (searchText && searchText.trim() !== "") {
        const escapedSearchText = searchText.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const searchRegex = new RegExp(escapedSearchText, "i");

        matchStage.$or = [
          { "trainDetails.trainNumber": searchRegex },
          { "trainDetails.PNRNumber": searchRegex },
        ];
      }

      const pipeline = [
        { $unwind: "$personDetail" },
        { $match: matchStage },

        { $skip: skip },
        { $limit: 50 },
      ];

      const responseData = await trainPassangerRouteDetail
        .aggregate(pipeline)
        .exec();
      const totalRecordPipeline = [
        { $unwind: "$personDetail" },
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalRecords: { $sum: 1 },
          },
        },
      ];
      const totalRecordResult = await trainPassangerRouteDetail
        .aggregate(totalRecordPipeline)
        .exec();
      const totalRecord =
        totalRecordResult.length > 0 ? totalRecordResult[0].totalRecords : 0;

      return { data: responseData, totalRecord };
    } catch (e) {
      console.error("Error in getTrainPassangerRouteDetailService:", e);
      throw e;
    }
  }

  async getTrainPNRNumberService() {
    const uniquePNRNumber = await trainPassangerRouteDetail.distinct(
      "trainDetails.PNRNumber"
    );
    uniquePNRNumber.push("All");
    return { data: uniquePNRNumber };
  }

  async getTrainNumberService() {
    const uniqueTrainNumber = await trainPassangerRouteDetail.distinct(
      "trainDetails.trainNumber"
    );
    uniqueTrainNumber.push("All");
    return { data: uniqueTrainNumber };
  }
  async getPersonDetailById(Id: string) {
    try {
      const personDetail = await trainPassangerRouteDetail.findOne({ _id: Id });

      if (!personDetail) {
        return { error: "Person not found" };
      }
      return { data: personDetail };
    } catch (error) {
      return { error: "An error occurred while fetching the details" };
    }
  }
}
