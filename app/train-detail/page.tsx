/**
 * Component for displaying train and passanger details with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */
"use client";
import {
  getTrainNumberActions,
  getTrainPassangerDetailListActions,
  getTrainPNRNumberActions,
} from "@/actions";
import Utils from "@/utils";
import { Pagination } from "antd";
import TrainDetailForm from "./form";
import useModal from "@/hooks/useModal";
import useDrawer from "@/hooks/useDrawer";
import { ageFilter } from "@/utils/store";
import { useEffect, useState } from "react";
import TrainRowDetailModal from "./view-row";
import Input from "@/component/common/input";
import Title from "@/component/common/title";
import Button from "@/component/common/button";
import { ModalSize } from "@/state/modal/slice";
import { DrawerOpen } from "@/state/drawer/slice";
import DropDown from "@/component/common/dropdown";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableHeader from "@/component/common/table-header";

const initialFilter = {
  trainNumber: "All",
  PNRNumber: "All",
  age: "All",
  fromDate: "",
  toDate: "",
  currentPage: 1,
  searchText: "",
  Order: "A",
  Key: "Sr",
};

const TrainDetailPage = () => {
  const router = useRouter();
  const { onShowModal } = useModal();
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
    Utils.updateQueryParams(filterModel, router);
  }, [filterModel.Order]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("currentPage", filterModel.currentPage.toString());
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  }, [filterModel.currentPage]);

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

  const onShowRowDataToModal = (rowData: any) => {
    onShowModal({
      showButton: false,
      size: ModalSize.xl,
      Component: () => <TrainRowDetailModal data={rowData} />,
    });
  };

  return (
    <div className="px-10 pb-4 pt-20 h-full ">
      <Title>Train Details Summary</Title>
      <div className="flex gap-2 mt-3">
        <DropDown
          name="trainNumber"
          value={filterModel.trainNumber}
          onChange={(e) => updateFilterModal({ trainNumber: e.target.value })}
          options={
            trainNumberList?.map((item) => ({
              value: item,
              label: item,
            })) || []
          }
        />
        <DropDown
          name="age"
          value={filterModel.age}
          onChange={(e) => updateFilterModal({ age: e.target.value })}
          options={ageFilter}
        />
        <DropDown
          name="pnrNumber"
          value={filterModel.PNRNumber}
          onChange={(e) => updateFilterModal({ PNRNumber: e.target.value })}
          options={
            pnrNumber?.map((item: any) => ({
              value: item,
              label: item,
            })) || []
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 my-3">
          <Input
            className="border-2 rounded-sm border-current"
            type="date"
            name="from"
            value={filterModel.fromDate}
            onChange={(e) => updateFilterModal({ fromDate: e.target.value })}
          ></Input>
          <Input
            className="border-2 rounded-sm border-current"
            type="date"
            name="to"
            value={filterModel.toDate}
            onChange={(e) => updateFilterModal({ toDate: e.target.value })}
          ></Input>

          <Input
            name=""
            className="border-2 rounded-sm border-current"
            type="text"
            placeholder="Search anything..."
            value={filterModel.searchText}
            onChange={(e) => updateFilterModal({ searchText: e.target.value })}
          />
        </div>
        <div className="flex gap-2 my-3">
          <Button
            variant="secondary"
            onClick={() => {
              Utils.resetRoute(router);
              setFilterModal(initialFilter);
            }}
          >
            Reset
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b">
            <th>Sr</th>
            <TableHeader
              Order={filterModel.Order}
              updateFilterModal={updateFilterModal}
              columnKey={filterModel.Key}
              keyValue="PNRNumber"
            >
              PNRNumber
            </TableHeader>
            <TableHeader
              Order={filterModel.Order}
              updateFilterModal={updateFilterModal}
              columnKey={filterModel.Key}
              keyValue="trainNumber"
            >
              Train Number
            </TableHeader>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainData && trainData && trainData.length > 0 ? (
            trainData.map((item: any, index: any) => (
              <tr
                className="border-b even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">
                  {(filterModel.currentPage - 1) * 50 + index + 1}
                </td>
                <td className="text-center ">{item.trainDetails.PNRNumber}</td>
                <td className="text-center">{item.trainDetails.trainNumber}</td>
                <td className="text-center">
                  <FontAwesomeIcon
                    className="cursor-pointer mr-3"
                    icon={faEye}
                    onClick={() => {
                      onShowRowDataToModal(item);
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
      <div className="py-8">
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
