/**
 * Component for displaying sample page with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */

"use client";
import { deleteUserAction, getUserAction } from "@/actions/index";
import Button from "@/component/common/button";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Pagination from "@/component/common/pagination";
import Title from "@/component/common/title";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import { faStreetView, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import SampleForm from "./form";

const SampleList = () => {
  const router = useRouter();
  const { onShowDrawer } = useDrawer();
  const { onShowToast } = useToast();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const currentPage =
    (searchParams.get("currentPage") as unknown as number) || 1;
  const [totalItems, setTotalItems] = useState<number>(0);
  const [userList, setUserList] = useState<TUser[]>([]);

  const updateSearchParams = (key: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    if (key !== "currentPage") {
      queryParams.set("currentPage", "1");
    }
    router.push(`drawer-form?${queryParams.toString()}`);
  };
  const onPageChange = (pageNo: string | number) => {
    updateSearchParams("currentPage", pageNo.toString() || "1");
  };

  const fetchData = async () => {
    try {
      const response = await getUserAction({
        searchQuery,
        currentPage,
      });
      if (response.status == eHTTPStatusCode.OK) {
        setUserList(response.data || []);
        setTotalItems(response.totalItems || 0);
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
    onShowDrawer({
      dimmer: true,
      width: "50%",
      name: "Show Drawer Form",
      Component: () => <SampleForm refreshList={fetchData} />,
    });
  };
  const updateUser = (id: string) => {
    onShowDrawer({
      dimmer: true,
      width: "50%",
      name: "Show Drawer Form",
      Component: () => <SampleForm id={id} refreshList={fetchData} />,
    });
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

  const startIndex = (currentPage - 1) * 10;

  return (
    <div className="px-10 pb-4 pt-20 h-full">
      <Title>User Details</Title>
      <div className="flex flex-row justify-between mb-3">
        <div className="flex gap-2">
          <Label>Search Name</Label>
          <Input
            className="border"
            type="text"
            placeholder={"search anything..."}
            value={searchQuery}
            name={""}
            onChange={(e) => {
              updateSearchParams("searchQuery", e.target.value);
            }}
          />
        </div>
        <Button onClick={addUser}>Add User</Button>
      </div>
      <table className="p-2 table-fixed border border-collapse border-spacing-3 border-slate-400 w-full">
        <thead>
          <tr className="border-b-2">
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
          {userList &&
            userList.map((item, index: number) => (
              <tr
                className="border-b-2 even:bg-gray-200 odd:bg-white"
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
            ))}
        </tbody>
      </table>
      <div className="py-8">
        <Pagination
          itemsPerPage={10}
          items={totalItems}
          onPageChange={onPageChange}
          initialPage={currentPage}
        />
      </div>
    </div>
  );
};

export default SampleList;
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
