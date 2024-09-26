"use client";

import TrainRowDetailModal from "./view-row";

import React, { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import Utils from "@/utils";
import { TrainListType } from "@/types/shared-types";
import { Pagination } from "antd";
import { trainStatusEnum } from "@/enums/shared-enums";
import { ModalSize } from "@/state/modal/slice";
import {
  getTrainFromDataActions,
  getTrainListActions,
  getTrainToDataActions,
} from "@/actions";

type TrainData = {
  from: string;
  status: string;
  to: string;
  trainNumber: string;
  __v: number;
  _id: string;
};

type TrainListResponse = {
  data: TrainData[];
  totalRecord: number;
};

const Train = () => {
  const router = useRouter();
  const { onShowModal } = useModal();
  const searchParams = useSearchParams();
  const [items, setItems] = useState(10);
  const [trains, setTrains] = useState<any>();
  const [trainToData, setTrainToData] = useState([]);
  const [trainFromData, setTrainFromData] = useState([]);
  const [filterModel, setFilterModal] = useState({
    status: "All",
    from: "All",
    to: "All",
    currentPage: 1,
    noOfRecord: 10,
  });

  const updateFilterModal = (newFilter: any) => {
    const updateFilter = {
      ...filterModel,
      ...newFilter,
    };
    setFilterModal(updateFilter);
    Utils.updateQueryParams(updateFilter, router);
  };

  const fetchTrainListData = async (props: TrainListType) => {
    try {
      const response: TrainListResponse = (await getTrainListActions(
        props
      )) as TrainListResponse;

      setTrains(response.data || []);
      setItems(response.totalRecord);
      setFilterModal(props);
    } catch (error) {
      console.log("error while getting train list", error);
    }
  };

  useEffect(() => {
    fetchTrainListData({ ...filterModel, ...Utils.getQuery() });
  }, [searchParams]);

  const fetchDataTrainToData = async () => {
    try {
      const response: any = await getTrainToDataActions();
      if (response && response.data) {
        setTrainToData(response.data);
      }
    } catch (error) {
      console.log("error while getting train to data list", error);
    }
  };
  const fetchDataTrainFromData = async () => {
    try {
      const response = await getTrainFromDataActions();
      if (response && response.data) {
        setTrainFromData(response.data);
      }
    } catch (error) {
      console.log("error while getting train from data list", error);
    }
  };
  useEffect(() => {
    fetchDataTrainToData();
    fetchDataTrainFromData();
  }, []);

  const onShowRowDataToModal = (rowData: any) => {
    onShowModal({
      showButton: false,
      size: ModalSize.xl,
      Component: () => <TrainRowDetailModal data={rowData} />,
    });
  };

  return (
    <div className="p-[5rem] h-full">
      <div className="flex flex-row justify-between mb-3">
        <h1 className="text-black-900 font-bold pb-2">Train Summary</h1>
        <select
          className="border-2 rounded-sm border-current"
          name="status"
          value={filterModel.status}
          id="status"
          onChange={(e) =>
            updateFilterModal({ status: e.target.value, currentPage: 1 })
          }
        >
          {trainStatusEnum &&
            Object.values(trainStatusEnum).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
        </select>
        <select
          className="border-2 rounded-sm border-current"
          name="from"
          id="from"
          value={filterModel.from}
          onChange={(e) =>
            updateFilterModal({ from: e.target.value, currentPage: 1 })
          }
        >
          {trainFromData &&
            trainFromData.length > 0 &&
            trainFromData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
        <select
          className="border-2 rounded-sm border-current"
          name="from"
          id="from"
          value={filterModel.to}
          onChange={(e) =>
            updateFilterModal({ to: e.target.value, currentPage: 1 })
          }
        >
          {trainToData &&
            trainToData.length > 0 &&
            trainToData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
        {/* 
               This button will use in future for multi filter use on one time
        */}
        {/* <div>
          <button
            className="bg-blue-300 border border-b-2 p-1"
            onClick={() => fetchTrainListData(filterModel)}
          >
            Apply
          </button>
        </div> */}
      </div>
      {trains && trains.length > 0 ? (
        <>
          <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
            <tr className="border-b-2">
              <th>Sr</th>
              <th>Train Number</th>
              <th>status</th>
              <th>From</th>
              <th>To</th>
              <th>Kids</th>
              <th>Young</th>
              <th>old</th>
            </tr>

            {trains &&
              trains &&
              trains.map((item: any, index: any) => (
                <tr
                  className="border-b-2 even:bg-gray-200 odd:bg-white"
                  key={index + 1}
                >
                  <td className="text-center ">
                    {(filterModel.currentPage - 1) * 10 + index + 1}
                  </td>
                  {Object.keys(item).map((data: string, index: number) => (
                    <td
                      key={index}
                      className={`text-center ${
                        data === "trainNumber" ? "cursor-pointer" : ""
                      }`}
                      onClick={() =>
                        data === "trainNumber" ? onShowRowDataToModal(item) : {}
                      }
                    >
                      {(item[data] && item[data]) ?? "Undefined"}
                    </td>
                  ))}
                </tr>
              ))}
          </table>

          <Pagination
            current={Number(filterModel.currentPage)}
            total={items}
            pageSize={10}
            onChange={(page, pageSize) => {
              updateFilterModal({ currentPage: page });
            }}
          />
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default Train;
