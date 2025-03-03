"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

export default function ChangePasswordForm() {
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (
    values: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Record<string, string>) => void;
    }
  ) => {
    try {
      const response = await fetch("/api/auth/change_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.message) {
        setSuccess("Password changed successfully");
      } else if (data.error) {
        setErrors(data.error);
      }
    } catch (error: unknown) {
      setErrors({
        oldPassword: "Password change failed. Please try again.",
        newPassword: "Password change failed. Please try again.",
        confirmPassword: "Password change failed. Please try again.",
      });
      console.error("Password change error:", error);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="">
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <h2 className="text-[1.042vw] text-premier-blue font-semibold mb-10">
        Change Password
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[47.396vw] ">
            <div className="space-y-[1.042vw]">
              <div className="relative">
                <Field
                  type={showPassword.oldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  autoComplete="old-password"
                  placeholder="Old Password"
                  className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword.oldPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              <div className="relative">
                <Field
                  type={showPassword.newPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  autoComplete="new-password"
                  placeholder="New Password"
                  className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPassword: !showPassword.newPassword,
                    })
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword.newPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              <div className="relative">
                <Field
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="confirm-password"
                  placeholder="Confirm New Password"
                  className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword.confirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
            type="submit"
            disabled={isSubmitting}
            className="w-[23.906vw] mt-[1.682vw] text-white p-[0.625vw] rounded-[0.833vw] flex items-center justify-center bg-premier-blue"
          >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
