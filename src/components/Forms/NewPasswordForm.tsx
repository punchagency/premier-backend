"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

export default function NewPasswordForm() {
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

const token = useSearchParams().get("token");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
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
      const response = await fetch("/api/auth/new_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...values, token }),
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="h-[15.833vw] ">
            <div className="space-y-[1.042vw]">
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

            <div className="mt-[1.682vw] flex justify-center">
              <Link href="/login">
                <p className="text-premier-blue">Back to Login</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
