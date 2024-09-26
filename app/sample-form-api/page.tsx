/**
 * For demo purpose only
 * Component for displaying sample page with filters and pagination.
 * Handles dynamic URL parameters for search and occupancy filtering.
 */

"use client";
import { deleteUserAction } from "@/actions/index";
import Pagination from "@/component/common/pagination";
import { eHTTPStatusCode } from "@/enums/shared-enums";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import ApiUtil from "@/utils/api";
import { faStreetView, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const ModalList = () => {
  const router = useRouter();
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
    router.push(`sample-form-api?${queryParams.toString()}`);
  };
  const onPageChange = (pageNo: string | number) => {
    updateSearchParams("currentPage", pageNo.toString() || "1");
  };

  const fetchData = async () => {
    try {
      const res = await ApiUtil.post("/sample-form", {
        searchQuery,
        currentPage,
      });
      const response = await res.json();
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
    router.push("/sample-form-api/addNewUser");
  };
  const updateUser = (id: string) => {
    router.push(`/sample-form-api/${id}`);
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
    <div className="p-[5rem] h-full">
      <div className="flex flex-row justify-between mb-3">
        <h1 className="text-black-900 font-bold pb-2">User List</h1>
      </div>
      <div className="flex flex-row justify-between mb-3">
        <label>Search Name</label>
        <input
          className="border"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            updateSearchParams("searchQuery", e.target.value);
          }}
        />
        <button onClick={addUser}>Add User</button>
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
                      // updateUser(item._id);
                    }}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faTrash}
                    onClick={() => {
                      // deleteUser(item._id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={10}
        items={totalItems}
        initialPage={currentPage}
        onPageChange={onPageChange}
      />
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
