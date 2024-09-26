/*
 * trainDetailForm.tsx
 * This component is showing detail of train and passanger.
 */
import { getPersonDetailByIdActions } from "@/actions";
import Button from "@/component/common/button";
import Input from "@/component/common/input";
import Label from "@/component/common/label";
import Title from "@/component/common/title";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import { useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

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
            <Title>Train Detail</Title>
            <div className="flex flex-row">
              <Label className="w-[20%]">Train Number :</Label>
              <Input
                type={"text"}
                className="border-2 border-black border-solid rounded-md p-0.5"
                {...register("trainDetails.trainNumber")}
                placeholder="TNumber"
              />
            </div>
            <div className="flex flex-row">
              <Label className="w-[20%]">PNR Number :</Label>
              <Input
                type={"text"}
                className="border-2 border-black border-solid rounded-md p-0.5"
                {...register("trainDetails.PNRNumber")}
                placeholder="PNRNumber"
              />
            </div>
            <div>
              {detailsData && detailsData?.trainDetails?.journeyStart && (
                <div className="flex flex-row">
                  <Label className="w-[20%]">Journey Start :</Label>
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
                  <Label className="w-[20%]">Departure Time :</Label>
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
            <Label>Person Detail</Label>
            {fieldArrayPersonDetail.map((item, index) => (
              <div className="flex flex-col gap-[20px]" key={item.id}>
                <div className="flex justify-between">
                  <div className="basis-[45%] flex justify-between">
                    <Label className="w-[20%]">Name :</Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          type={"text"}
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
                    <Label className="w-[20%]">Age :</Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          type={"text"}
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
                    <Label>Number :</Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          type={"text"}
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
                    <Label>Email :</Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          type={"text"}
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
                <Button type="button" onClick={() => removePersonDetail(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[20px]">
            <Label>Luggage Detail:</Label>
            {luggageFields.map((item, index) => (
              <div className="flex flex-col gap-[10px]" key={item.id}>
                <div className=" flex ">
                  <Label className="w-[18%]">Number Of Bags :</Label>
                  <Controller
                    render={({ field }) => (
                      <Input
                        type={"text"}
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
                  <Label className="w-[18%]">Weight :</Label>
                  <Controller
                    render={({ field }) => (
                      <Input
                        type={"text"}
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
                  <Button type="button" onClick={() => removeLuggage(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div>
              <Button
                type="button"
                onClick={() => appendLuggage({ numberOfBags: "", weight: "" })}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex   flex-row-reverse">
            <Button
              type="button"
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
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainDetailForm;
