/**
 * Handles user form submission for adding or updating users.
 * Populates form with user data when editing and displays toast notifications on success or failure.
 */

"use client";
import {
  addUserAction,
  getUserByIdAction,
  updateUserAction,
} from "@/actions/index";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import { TUser } from "@/types/shared-types";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
type Tprops = {
  id?: string;
  refreshList: () => void;
};

export default function SampleForm(props: Tprops) {
  const { id = 0, refreshList } = props;
  const { onCloseModal } = useModal();
  const { onShowToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>();

  useEffect(() => {
    if (id) initialiseValue();
  }, [id]);

  const initialiseValue = async () => {
    if (id) {
      const res = await getUserByIdAction(id);
      console.log("res edit", id, res);
      if (res?.data) {
        reset(res.data);
      }
    }
  };
  const onSubmit: SubmitHandler<TUser> = async (payload) => {
    try {
      if (id) {
        await updateUserAction({ id, ...payload });
      } else {
        await addUserAction(payload);
      }
      onShowToast({
        type: ToastType.success,
        title: <FaCheck />,
        content: "Successfull Submitted",
      });
      refreshList();
      onCloseModal();
    } catch (error) {
      onShowToast({
        type: ToastType.error,
        title: <FaCheck />,
        content: "Error while submitting",
      });
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex py-1">
          <label className="w-1/4">Name</label>
          <input
            className="border"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 pl-2">{errors.name.message as string}</p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Age</label>
          <input
            className="border"
            {...register("age", { required: "Age is required" })}
          />
          {errors.age && (
            <p className="text-red-500 pl-2">{errors.age.message as string}</p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Gender</label>
          <select
            className="border"
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 pl-2">
              {errors.gender.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Address</label>
          <input
            className="border"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 pl-2">
              {errors.address.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Email</label>
          <input
            type="email"
            className="border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 pl-2">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Number</label>
          <input
            className="border"
            {...register("number", { required: "Number is required" })}
          />
          {errors.number && (
            <p className="text-red-500 pl-2">
              {errors.number.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <label className="w-1/4">Pincode</label>
          <input
            className="border"
            {...register("pincode", { required: "Pincode is required" })}
          />
          {errors.pincode && (
            <p className="text-red-500 pl-2">
              {errors.pincode.message as string}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            onCloseModal();
          }}
          className="bg-blue-400 rounded-lg px-2 text-white mr-2"
        >
          Close
        </button>

        <button
          className="bg-blue-400 rounded-lg px-2 text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
