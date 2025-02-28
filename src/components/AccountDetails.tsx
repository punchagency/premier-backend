import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomPhoneInput from "./PhoneInput";
import { updateUserDetails } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AccountDetailsDashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const initialValues = {
    name: user?.name || "",
    phone: user?.phone || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Required"),
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .required("Required"),
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    values: { name: string; phone: string },
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Record<string, string>) => void;
    }
  ) => {
    try {

      if(user?.phone === values.phone && user?.name === values.name){
          setErrors({
            phone: "Phone number is already in use",
            name: "Name is already in use",
          });
        return;
      }

      const resultAction = await dispatch(
        updateUserDetails({
          name: values.name,
          phone: values.phone,
        })
      );
      if (updateUserDetails.fulfilled.match(resultAction)) {
        setSuccess("Account details updated successfully");
      } else {
        setErrors({
          name:
            (resultAction.payload as string) ||
            "Failed to update account details",
        });
      }
    } catch (error) {
      setErrors({
        name: "Failed to update account details",
      });
      console.error("Error updating account details:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className="w-[47.396vw]">
          <Form className="space-y-8">
            <div className="">
              <h2 className="text-[1.042vw] text-premier-blue font-semibold mb-2">
                Your Details
              </h2>

              {success && (
                <div className="text-green-700">
                  {success}
                </div>
              )}

              <div className="space-y-[1.042vw]">
                <div className="mt-10">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="">
                  <Field
                    type="text"
                    disabled
                    value={user?.email}
                    name="email"
                    placeholder="Your Email *"
                    className="w-full p-[1.042vw] border bg-white border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="">
                  <CustomPhoneInput
                    value={user?.phone || ""}
                    name="phone"
                    placeholder="Your Number *"
                    onChange={(value) => setFieldValue("phone", value)}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[23.906vw] mt-[3.042vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
            >
              {isSubmitting ? "Updating..." : "Submit"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AccountDetailsDashboard;
