/*
 * trainDetailForm.tsx
 * This component is showing detail of train and passanger.
 */
import { FaCheck } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { getPersonDetailByIdActions } from "@/actions";
import { ToastType } from "@/state/toast/slice";

type TrainDetailFormProps = {
  trainNumberId?: string;
};
const TrainDetailForm = (props: TrainDetailFormProps) => {
  const { trainNumberId } = props;
  const { onCloseDrawer } = useDrawer();
  const { onShowToast } = useToast();
  const drawerRef = useRef<HTMLDivElement>(null);
  const { control, handleSubmit, register, reset, getValues } = useForm({
    defaultValues: {
      trainDetails: {
        trainNumber: "",
        PNRNumber: "",
        journeyStart: "",
        departureTime: "",
      },
      personDetail: [
        { name: "", age: "", mobileNumber: "", email: "", dob: "", _id: "" },
      ],
      luggage: [{ numberOfBags: "", weight: "" }],
    },
  });

  const passangerDetailById = async (id: string) => {
    try {
      const response: any = await getPersonDetailByIdActions(id);
      if (response) {
        reset(response.data);
      }
    } catch (error) {
      console.error("error while getting person detail", error);
    }
  };

  useEffect(() => {
    if (trainNumberId) {
      passangerDetailById(trainNumberId);
    }
  }, []);

  const {
    fields: fieldArrayPersonDetail,
    append: appendPersonDetail,
    remove: removePersonDetail,
  } = useFieldArray({
    control,
    name: "personDetail",
  });

  const {
    fields: luggageFields,
    append: appendLuggage,
    remove: removeLuggage,
  } = useFieldArray({
    control,
    name: "luggage",
  });

  // const onSubmit = async (data: any) => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/addTrainDetail", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data), // Send the data in the request body
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       reset();
  //       setReload(!reload);
  //       setOpen(false);
  //     } else {
  //       console.error("HTTP error:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // };

  const detailsData = getValues();

  return (
    <div ref={drawerRef}>
      <div className="p-10 h-[100%] overflow-y-auto ">
        <form
          className="h-full flex flex-col gap-[10px] "
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[10px] border-b-[20px] pb-[10px]">
            <label>Train Detail</label>
            <div className="flex flex-row">
              <label className="w-[20%]">Train Number :</label>
              <input
                className="border-2 border-black border-solid rounded-md p-0.5"
                {...register("trainDetails.trainNumber")}
                placeholder="TNumber"
              />
            </div>
            <div className="flex flex-row">
              <label className="w-[20%]">PNR Number :</label>
              <input
                className="border-2 border-black border-solid rounded-md p-0.5"
                {...register("trainDetails.PNRNumber")}
                placeholder="PNRNumber"
              />
            </div>
            <div>
              {detailsData && detailsData?.trainDetails?.journeyStart && (
                <div className="flex flex-row">
                  <label className="w-[20%]">Journey Start :</label>
                  <p>
                    {detailsData &&
                      detailsData.trainDetails &&
                      new Date(
                        detailsData.trainDetails.journeyStart
                      ).toLocaleDateString()}
                  </p>
                </div>
              )}
              {detailsData?.trainDetails?.departureTime && (
                <div className="flex flex-row">
                  <label className="w-[20%]">Departure Time :</label>
                  <p>
                    {detailsData &&
                      detailsData.trainDetails &&
                      new Date(
                        detailsData.trainDetails.departureTime
                      ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-b-[20px] pb-[10px]">
            <label>Person Detail</label>
            {fieldArrayPersonDetail.map((item, index) => (
              <div className="flex flex-col gap-[20px]" key={item.id}>
                <div className="flex justify-between">
                  <div className="basis-[45%] flex justify-between">
                    <label className="w-[20%]">Name :</label>
                    <Controller
                      render={({ field }) => (
                        <input
                          className="border-2 border-black border-solid rounded-md p-0.5"
                          placeholder="name"
                          {...field}
                        />
                      )}
                      name={`personDetail.${index}.name`}
                      control={control}
                    />
                  </div>

                  <div className="basis-[45%] flex justify-between">
                    <label className="w-[20%]">Age :</label>
                    <Controller
                      render={({ field }) => (
                        <input
                          className="border-2 border-black border-solid rounded-md p-0.5"
                          placeholder="age"
                          {...field}
                        />
                      )}
                      name={`personDetail.${index}.age`}
                      control={control}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="basis-[45%] flex justify-between">
                    <label>Number :</label>
                    <Controller
                      render={({ field }) => (
                        <input
                          className="border-2 border-black border-solid rounded-md p-0.5"
                          placeholder="mobileNumber"
                          {...field}
                        />
                      )}
                      name={`personDetail.${index}.mobileNumber`}
                      control={control}
                    />
                  </div>

                  <div className="basis-[45%] flex justify-between">
                    <label>Email :</label>
                    <Controller
                      render={({ field }) => (
                        <input
                          className="border-2 border-black border-solid rounded-md p-0.5"
                          placeholder="email"
                          {...field}
                        />
                      )}
                      name={`personDetail.${index}.email`}
                      control={control}
                    />
                  </div>
                </div>
                <button
                  className="bg-blue-300 text-white font-bold px-3 py-1.5 rounded-md"
                  type="button"
                  onClick={() => removePersonDetail(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            {/* <div>
              <button
                className="bg-blue-300 text-white font-bold px-3 py-1.5 rounded-md mt-3"
                type="button"
                onClick={() =>
                  appendPersonDetail({
                    name: "",
                    age: "",
                    mobileNumber: "",
                    email: "",
                  })
                }
              >
                Add Field
              </button>
            </div> */}
          </div>

          <div className="flex flex-col gap-[20px]">
            <label>Luggage Detail:</label>
            {luggageFields.map((item, index) => (
              <div className="flex flex-col gap-[10px]" key={item.id}>
                <div className=" flex ">
                  <label className="w-[18%]">Number Of Bags :</label>
                  <Controller
                    render={({ field }) => (
                      <input
                        className="border-2 border-black border-solid rounded-md p-0.5"
                        placeholder="numberOfBags"
                        {...field}
                      />
                    )}
                    name={`luggage.${index}.numberOfBags`}
                    control={control}
                  />
                </div>
                <div className="  flex ">
                  <label className="w-[18%]">Weight :</label>
                  <Controller
                    render={({ field }) => (
                      <input
                        className="border-2 border-black border-solid rounded-md p-0.5"
                        placeholder="Weight"
                        {...field}
                      />
                    )}
                    name={`luggage.${index}.weight`}
                    control={control}
                  />
                </div>
                <div className="flex flex-row align-middle ">
                  <button
                    className="w-full bg-blue-300 text-white font-bold px-3 py-1.5 rounded-md"
                    type="button"
                    onClick={() => removeLuggage(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div>
              <button
                className="bg-blue-300 text-white font-bold px-3 py-1.5 rounded-md"
                type="button"
                onClick={() => appendLuggage({ numberOfBags: "", weight: "" })}
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex   flex-row-reverse">
            <button
              type="button"
              className="bg-blue-300 text-white font-bold px-3 py-1.5 rounded-md"
              onClick={() => {
                reset();
                onCloseDrawer();
                onShowToast({
                  type: ToastType.success,
                  title: <FaCheck />,
                  content: "Drawer close successfully.",
                });
              }}
            >
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainDetailForm;
