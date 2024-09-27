/**
 * Manages user data submission and updates based on the provided ID or new entry.
 * Initializes form with existing user data if editing and handles navigation and notifications.
 */

"use client";
import {
  addUserAction,
  getUserByIdAction,
  updateUserAction,
} from "@/actions/index";

import * as Yup from "yup";
import { useEffect } from "react";
import { gender } from "@/utils/store";
import useToast from "@/hooks/useToast";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Title from "@/component/common/title";
import { TUser } from "@/types/shared-types";
import Button from "@/component/common/button";
import { ToastType } from "@/state/toast/slice";
import DropDown from "@/component/common/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

// Define Yup validation schema

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Number must be 10 digits")
    .required("Number is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
});

export default function SampleForm({ params }: any) {
  const { onShowToast } = useToast();
  const router = useRouter();
  const { id = "addNewUser" } = params;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (id != "addNewUser") initialiseValue();
  }, []);

  const initialiseValue = async () => {
    if (id != "addNewUser") {
      const res = await getUserByIdAction(id as string);
      if (res?.data) {
        reset(res.data);
      }
    }
  };
  const onSubmit: SubmitHandler<TUser> = async (payload) => {
    try {
      if (id != "addNewUser") {
        await updateUserAction({ id, ...payload });
      } else {
        await addUserAction(payload);
      }
      onShowToast({
        type: ToastType.success,
        title: <FaCheck />,
        content: "Successfull Submitted",
      });
      router.push("/sample-form");
    } catch (error) {
      onShowToast({
        type: ToastType.error,
        title: <FaCheck />,
        content: "Error while submitting",
      });
    }
  };

  return (
    <div className="px-10 py-4 pt-20 h-full">
      <Title>User Form</Title>
      <hr className="py-2" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex py-1">
          <Label className="w-1/4">Name</Label>
          <Input
            type={"text"}
            placeholder="Enter your name"
            className="border"
            name={"name"}
            register={register}
          />
          {errors.name && (
            <p className="text-red-500 pl-2">{errors.name.message as string}</p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Age</Label>
          <Input
            type={"text"}
            placeholder="Enter your age"
            className="border"
            name={"age"}
            register={register}
          />
          {errors.age && (
            <p className="text-red-500 pl-2">{errors.age.message as string}</p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Gender</Label>
          <DropDown name="gender" register={register} options={gender} />
          {errors.gender && (
            <p className="text-red-500 pl-2">
              {errors.gender.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Address</Label>
          <Input
            type={"text"}
            placeholder="Enter your address"
            className="border"
            name={"address"}
            register={register}
          />
          {errors.address && (
            <p className="text-red-500 pl-2">
              {errors.address.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Email</Label>
          <Input
            type="email"
            className="border"
            placeholder="Enter your email"
            name={"email"}
            register={register}
          />
          {errors.email && (
            <p className="text-red-500 pl-2">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Number</Label>
          <Input
            className="border"
            placeholder="Enter your number"
            type={"text"}
            name={"number"}
            register={register}
          />
          {errors.number && (
            <p className="text-red-500 pl-2">
              {errors.number.message as string}
            </p>
          )}
        </div>

        <div className="flex py-1">
          <Label className="w-1/4">Pincode</Label>
          <Input
            className="border"
            type={"text"}
            placeholder="Enter your pinode"
            name={"pincode"}
            register={register}
          />
          {errors.pincode && (
            <p className="text-red-500 pl-2">
              {errors.pincode.message as string}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              router.push("/sample-form");
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
