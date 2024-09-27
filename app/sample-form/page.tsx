/**
 * For demo purpose only
 * Component for displaying sample page with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */

"use client";
import { deleteUserAction, getUserAction } from "@/actions/index";
import Button from "@/component/common/button";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import Utils from "@/utils";
import { faStreetView, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const initialFilter = {
  searchQuery: "",
  currentPage: 1,
  noOfRecord: 10,
};

const ModalList = () => {
  const router = useRouter();
  const { onShowToast } = useToast();
  const searchParams = useSearchParams();
  const [userList, setUserList] = useState<TUser[]>([]);
  const [items, setItems] = useState(10);
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
    Utils.updateQueryParams(updateFilter, router);
  };

  const fetchData = async () => {
    try {
      const response = await getUserAction({
        ...filterModel,
        ...Utils.getQuery(),
      });
      if (response.status == eHTTPStatusCode.OK) {
        setUserList(response.data || []);
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
    fetchData();
  }, [searchParams]);

  const addUser = () => {
    router.push("/sample-form/addNewUser");
  };
  const updateUser = (id: string) => {
    router.push(`/sample-form/${id}`);
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await deleteUserAction(id);
      onShowToast({
        type:
          res.status == eHTTPStatusCode.OK
            ? ToastType.success
            : ToastType.error,
        title: <FaCheck />,
        content: res.message,
      });
      fetchData();
    } catch (error) {
      console.log("Error while deleting :-", error);
    }
  };

  const startIndex = (filterModel.currentPage - 1) * 10;

  return (
    <div className="px-10 pb-4 pt-20 h-full">
      <Title>User Details</Title>
      <div className="flex flex-row justify-between mb-3">
        <div className="flex gap-2">
          <Label>Search Name</Label>
          <Input
            className="border"
            type="text"
            value={filterModel.searchQuery}
            placeholder={"search anything..."}
            name={""}
            onChange={(e) => {
              updateFilterModal({
                searchQuery: e.target.value,
                currentPage: 1,
              });
            }}
          />
        </div>
        <Button onClick={addUser}>Add User</Button>
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b">
            <th>Sr</th>
            <th>Name</th>
            <th>Number</th>
            <th>email</th>
            <th>age</th>
            <th>Pin Code </th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length ? (
            userList.map((item, index: number) => (
              <tr
                className="border-b even:bg-gray-200 odd:bg-white"
                key={index + 1}
              >
                <td className="text-center ">{startIndex + index + 1}</td>
                <td className="text-center ">{item.name}</td>
                <td className="text-center">{item.number}</td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">{item.age}</td>
                <td className="text-center">{item.pincode}</td>
                <td className="text-center">{item.gender}</td>
                <td className="text-center">
                  <FontAwesomeIcon
                    className="cursor-pointer mr-2"
                    icon={faStreetView}
                    onClick={() => {
                      updateUser(item._id);
                    }}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faTrash}
                    onClick={() => {
                      deleteUser(item._id);
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

export default ModalList;
type TUser = {
  _id: string;
  name: string;
  age: string | number;
  gender: string;
  number: string | number;
  adress: string;
  email: string;
  pincode: number | string;
};
