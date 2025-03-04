"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),     
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (response?.error) {
        throw new Error(`HTTP error! status: ${response?.error}`);
      }

    } catch (error) {
      setErrors({ email: "Login failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting}) => (
        
        <Form className="w-[23.906vw] h-[26.906vw] mt-[3.49vw] relative">
          <div className="space-y-4">
            <div className="relative">
              <Field
                type="email"
                name="email"
                className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                placeholder="Email Address"
              />
              <MdOutlineEmail
                size={17}
                className="absolute right-[0.842vw] top-[1.2vw] text-gray-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[0.729vw] mt-[0.442vw]"
              />
            </div>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                placeholder="Password"
              />
              <span
                className="absolute right-[0.842vw] top-[1.2vw] cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={17} />
                ) : (
                  <AiOutlineEye size={17} />
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end  mt-[0.442vw]">
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mr-auto text-[0.729vw]"
              />
            <Link
              href="/forgot-password"
              className="text-[#97A4B6] text-[0.729vw]  text-right hover:text-gray-500"
              >
                Forgot Password?
              </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[23.906vw] mt-[2.042vw] text-white p-[0.625vw] rounded-[0.833vw] flex items-center justify-center bg-premier-blue"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-center my-[2.135vw] ">
            <hr className="w-full" />{" "}
            <span className="mx-[0.677vw] text-nowrap text-[#97A4B6] text-[0.833vw]">
              or login with
            </span>{" "}
            <hr className="w-full" />
          </div>

          <button
            onClick={() => signIn("google", { redirect: true, callbackUrl: "/dashboard" })}
            type="button"
            className="p-[0.833vw] border border-[#E8EBEF] rounded-[0.833vw]  w-full flex items-center justify-center"
          >
            <FcGoogle size={22} />
          </button>

          <p className="text-center text-[#97A4B6] text-[0.833vw] absolute bottom-0 left-[5.833vw]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-premier-blue hover:underline">
              Sign up
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
