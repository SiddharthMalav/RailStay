/**
 * Service class for managing train-related operations.
 */
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { trains } from "@/schemas/trains";
import { TrainListType } from "@/types/shared-types";

export class TrainService {
  async getTrainToDataService() {
    const uniqueToLocations1 = await trains.distinct("to");
    uniqueToLocations1.push("All");
    return { data: uniqueToLocations1 };
  }
  async getTrainFromDataService() {
    const uniqueFromLocations = await trains.distinct("from");
    uniqueFromLocations.push("All");
    return { data: uniqueFromLocations };
  }

  async getTrainListService(props: TrainListType) {
    try {
      const { noOfRecord, currentPage, status, from, to, Order, Key } = {
        ...props,
        noOfRecord: +props.noOfRecord, // Convert to number
        currentPage: +props.currentPage, // Convert to number
      };

      const getToken = getDataFromToken();

      // const { noOfRecord, currentPage, status, from, to } = props;

      const skip = (currentPage - 1) * noOfRecord;
      const match: any = {};

      if (status && status !== "All") {
        match.status = status;
      }
      if (from && from !== "All") {
        match.from = from;
      }
      if (to && to !== "All") {
        match.to = to;
      }

      const pipeline = [
        { $match: match }, // Apply filters before $lookup
        {
          $lookup: {
            from: "trainpassangerroutedetails",
            localField: "trainNumber",
            foreignField: "trainDetails.trainNumber",
            as: "trainInfo",
            pipeline: [
              { $match: { "trainDetails.trainNumber": { $exists: true } } },
              {
                $addFields: {
                  numberOfKids: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: { $lte: [{ $toInt: "$$person.age" }, 18] }, // age <= 18
                      },
                    },
                  },
                  numberOfYoung: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: {
                          $and: [
                            { $gt: [{ $toInt: "$$person.age" }, 18] }, // age > 18
                            { $lte: [{ $toInt: "$$person.age" }, 55] }, // age <= 55
                          ],
                        },
                      },
                    },
                  },
                  numberOfOld: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: { $gt: [{ $toInt: "$$person.age" }, 55] }, // age > 55
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            totalKids: { $sum: "$trainInfo.numberOfKids" },
            totalYoung: { $sum: "$trainInfo.numberOfYoung" },
            totalOld: { $sum: "$trainInfo.numberOfOld" },
          },
        },
        {
          $project: {
            _id: 0,
            trainNumber: 1,
            status: 1,
            from: 1,
            to: 1,
            totalKids: 1,
            totalYoung: 1,
            totalOld: 1,
            // startDate:1,
            // journeyEndDate:1,
          },
        },
        // Add sorting stage based on the Order and Key values
        {
          $sort: {
            [Key]: Order === "A" ? 1 : -1, // Sort by the specified Key (ascending or descending)
          },
        },
        { $skip: skip },
        { $limit: noOfRecord },
      ];

      // Pipeline for counting documents
      const countPipeline = [
        { $match: match }, // Apply filters for counting
        {
          $lookup: {
            from: "trainpassangerroutedetails",
            localField: "trainNumber",
            foreignField: "trainDetails.trainNumber",
            as: "trainInfo",
            pipeline: [
              { $match: { "trainDetails.trainNumber": { $exists: true } } },
              {
                $addFields: {
                  numberOfKids: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: { $lt: [{ $toInt: "$$person.age" }, 19] },
                      },
                    },
                  },
                  numberOfYoung: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: {
                          $and: [
                            { $gte: [{ $toInt: "$$person.age" }, 19] },
                            { $lte: [{ $toInt: "$$person.age" }, 55] },
                          ],
                        },
                      },
                    },
                  },
                  numberOfOld: {
                    $size: {
                      $filter: {
                        input: "$personDetail",
                        as: "person",
                        cond: { $gt: [{ $toInt: "$$person.age" }, 55] },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            totalKids: { $sum: "$trainInfo.numberOfKids" },
            totalYoung: { $sum: "$trainInfo.numberOfYoung" },
            totalOld: { $sum: "$trainInfo.numberOfOld" },
          },
        },
        {
          $count: "totalRecord", // Count the number of documents
        },
      ];

      const [data, countResult] = await Promise.all([
        trains.aggregate(pipeline),
        trains.aggregate(countPipeline),
      ]);

      const totalRecord =
        countResult.length > 0 ? countResult[0].totalRecord : 0;

      const res = {
        data: data,
        totalRecord: totalRecord,
      };

      return res;
    } catch (error: any) {
      return {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Stack trace only in development mode
      };
    }
  }
}
