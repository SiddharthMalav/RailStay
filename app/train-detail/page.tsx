"use client";
import {
  getTrainNumberActions,
  getTrainPassangerDetailListActions,
  getTrainPNRNumberActions,
} from "@/actions";
import { Pagination } from "antd";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrainDetailForm from "./form";
import useDrawer from "@/hooks/useDrawer";
import Utils from "@/utils";
import { DrawerOpen } from "@/state/drawer/slice";
import { ageEnum } from "@/enums/shared-enums";

const initialFilter = {
  trainNumber: "All",
  PNRNumber: "All",
  age: "All",
  fromDate: "",
  toDate: "",
  currentPage: 1,
  searchText: "",
};

const TrainDetailPage = () => {
  const router = useRouter();
  const { onShowDrawer } = useDrawer();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<number>(50);
  const [pnrNumber, setPNRNumber] = useState<any>();
  const [trainData, setTrainData] = useState<any>();
  const [trainNumberList, setTrainNumber] = useState<string[]>();
  const [filterModel, setFilterModal] = useState({
    ...initialFilter,
    ...Utils.getQuery(),
  });

  const updateFilterModal = (newFilter: any) => {
    const updateFilter = {
      ...filterModel,
      ...newFilter,
    };
    setFilterModal(updateFilter);
  };

  const applyFilters = () => {
    filterModel.currentPage = 1;
    Utils.updateQueryParams(filterModel, router);
  };

  useEffect(() => {
    fetchData(filterModel);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("currentPage", filterModel.currentPage.toString());
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  }, [filterModel.currentPage]);

  // const fetchData = async (props: any) => {
  //   const response = await getTrainPassangerDetailListActions(props);
  //   if (response && response?.data) {
  //     setTrainData(response.data || []);
  //     setItems(response?.totalRecord);
  //     setFilterModal(props);
  //   }
  //   throw new Error("Define the MONGODB_URI environmental variable");
  // };

  const fetchData = async (props: any) => {
    try {
      const response = await getTrainPassangerDetailListActions(props);
      if (response && response?.data) {
        setTrainData(response.data || []);
        setItems(response?.totalRecord);
        setFilterModal(props);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTrainPnrNUmber = async () => {
    try {
      const response: any = await getTrainPNRNumberActions();
      if (response && response.data) {
        setPNRNumber(response.data);
      }
    } catch (error) {
      console.error("Error fetching pnr number:", error);
    }
  };
  const fetchTrainNumber = async () => {
    try {
      const response = await getTrainNumberActions();
      if (response && response.data) {
        setTrainNumber(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTrainNumber();
    fetchTrainPnrNUmber();
  }, []);

  const onShowPassangersDetails = (id: string) => {
    onShowDrawer({
      dimmer: true,
      width: "45%",
      name: "Show Drawer Form",
      Component: () => <TrainDetailForm trainNumberId={id} />,
      position: DrawerOpen.right,
    });
  };

  return (
    <div className="relative h-full">
      <div className="p-[5rem] h-full">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-black-900 font-bold pb-2">
            Train Details Summary
          </h1>
          <select
            className="border-2 rounded-sm border-current"
            name="trainNumber"
            id="trainNumber"
            value={filterModel.trainNumber}
            onChange={(e) => updateFilterModal({ trainNumber: e.target.value })}
          >
            <option>select</option>
            {trainNumberList &&
              trainNumberList.length > 0 &&
              trainNumberList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
          <select
            className="border-2 rounded-sm border-current"
            name="age"
            id="age"
            value={filterModel.age}
            onChange={(e) => updateFilterModal({ age: e.target.value })}
          >
            {ageEnum &&
              Object.keys(ageEnum).length > 0 &&
              Object.keys(ageEnum).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
          <select
            className="border-2 rounded-sm border-current"
            name="pnrNumber"
            id="pnrNumber"
            value={filterModel.PNRNumber}
            onChange={(e) => updateFilterModal({ PNRNumber: e.target.value })}
          >
            <option>select</option>
            {pnrNumber &&
              pnrNumber.length > 0 &&
              pnrNumber.map((item: any, index: any) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <input
            className="border-2 rounded-sm border-current"
            type="date"
            id="from"
            name="from"
            value={filterModel.fromDate}
            onChange={(e) => updateFilterModal({ fromDate: e.target.value })}
          ></input>
          <input
            className="border-2 rounded-sm border-current"
            type="date"
            id="to"
            name="to"
            value={filterModel.toDate}
            onChange={(e) => updateFilterModal({ toDate: e.target.value })}
          ></input>

          <input
            className="border-2 rounded-sm border-current"
            type="text"
            value={filterModel.searchText}
            onChange={(e) => updateFilterModal({ searchText: e.target.value })}
          />
          <button
            className="bg-blue-300 border border-b-2 p-1"
            onClick={() => {
              Utils.resetRoute(router);
              setFilterModal(initialFilter);
            }}
          >
            Reset
          </button>
          <button
            className="bg-blue-300 border border-b-2 p-1"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
        <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
          <thead>
            <tr className="border-b-2">
              <th>Sr</th>
              <th>PNRNumber</th>
              <th>TrainNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainData && trainData && trainData.length > 0 ? (
              trainData.map((item: any, index: any) => (
                <tr
                  className="border-b-2 even:bg-gray-200 odd:bg-white"
                  key={index + 1}
                >
                  <td className="text-center ">
                    {" "}
                    {(filterModel.currentPage - 1) * 50 + index + 1}
                  </td>
                  <td className="text-center ">
                    {item.trainDetails.PNRNumber}
                  </td>
                  <td className="text-center">
                    {item.trainDetails.trainNumber}
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      className="cursor-pointer mr-3"
                      icon={faEye}
                      onClick={() => {
                        onShowPassangersDetails(item._id);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>no record found</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          current={Number(filterModel.currentPage)}
          total={items}
          pageSize={50}
          onChange={(page, pageSize) => {
            updateFilterModal({ currentPage: page });
          }}
        />
      </div>
    </div>
  );
};

export default TrainDetailPage;
