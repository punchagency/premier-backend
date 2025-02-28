"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignupForm() {
  const router = useRouter();

  const initialValues = { name: "", email: "", password: "" };

  const invalidEmails = [
    "test@example.com",
    "fake@domain.com",
    "test@tempmail.com",
    "fake@disposablemail.com",
    "test@dev.com",
    "fake@fakemail.com",
    "test@temp.com",
    "test@gmail.com",
    "fake@gmail.com",
    "test@yahoo.com",
    "fake@yahoo.com",
    "test@hotmail.com",
    "fake@hotmail.com",
    "test@outlook.com",
    "fake@outlook.com",
    "test@aol.com",
    "fake@aol.com",
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "trashmail.com",
    "tempmail.com",
    "dispostable.com",
    "getnada.com",
    "fakeinbox.com",
    "maildrop.cc",
  ];
  const invalidDomains = [
    "tempmail.com",
    "disposablemail.com",
    "dev.com",
    "fakemail.com",
    "temp.com",
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "trashmail.com",
    "tempmail.com",
    "dispostable.com",
    "getnada.com",
    "fakeinbox.com",
    "maildrop.cc",
  ];

  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const isInvalidDomain = (email: string) => {
    const domain = email.split("@")[1];
    return invalidDomains.includes(domain);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .notOneOf(invalidEmails, "This email is not allowed")
      .test(
        "is-invalid-domain",
        "Please use a valid email address",
        (value) => !isInvalidDomain(value || "")
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be 20 characters or less")
      .required("Password is required"),
  });


  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      setSubmissionStatus("submitting");
      const response = await fetch("/api/auth/verfiy-email", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
        setErrors({ email: data.message || "Signup failed" });
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error sending email:", error);
      setErrors({ email: "Signup failed. Please try again." });
    } finally {
      setSubmitting(false);
    }

    // try {
    //   const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const data = await response.json();

    //   if (data.success) {
    //       router.push("/login");
    //   } else {
    //     setErrors({ email: data.message || "Signup failed" });
    //   }
    // } catch (error: unknown) {
    //   setErrors({ email: "Signup failed. Please try again." });
    //   console.error("Signup error:", error);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-[23.906vw] h-[28.906vw] mt-[3.49vw] relative">
          <div className="space-y-4">
            {submissionStatus === "success" && (
              <div className="text-center text-green-500 text-[0.833vw]">
                Verification email sent! Please check your email for
                verification.
              </div>
            )}
            <div className="relative">
              <Field
                type="text"
                name="name"
                className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                placeholder="Name"
              />
              <FiUser
                size={17}
                className="absolute right-[0.842vw] top-[1.2vw] text-gray-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-[0.729vw]"
              />
            </div>
            <div className="relative">
              <Field
                type="email"
                name="email"
                className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
                placeholder="Email Address"
              />
              <MdOutlineMailOutline
                size={17}
                className="absolute right-[0.842vw] top-[1.2vw] text-gray-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[0.729vw]"
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
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-[0.729vw]"
              />
            </div>
          </div>
          <div className="flex justify-start items-center mt-[0.658vw]">
            <input
              type="checkbox"
              name="Privacy Policy"
              id="Privacy Policy"
              className="mr-[0.625vw] border border-premier-blue rounded-[0.167vw] w-[0.833vw] h-[0.833vw] accent-premier-blue focus:outline-premier-blue focus:ring-premier-blue"
            />
            <label
              htmlFor="Privacy Policy"
              className="text-[0.833vw] text-[#97A4B6]"
            >
              By clicking here, you agree to our{" "}
              <Link
                href="#"
                className="text-premier-blue font-medium hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || submissionStatus === "success"}
            className="w-[23.906vw] mt-[1.442vw] text-white p-[0.625vw] rounded-[0.833vw] flex items-center justify-center bg-premier-blue"
          >
             {submissionStatus === "submitting"
              ? "Sending verification email..."
              : submissionStatus === "success"
              ? "Verification email sent!"
              : "Sign Up"}
          </button>

          <div className="flex items-center justify-center my-[1.135vw] ">
            <hr className="w-full" />{" "}
            <span className="mx-[0.677vw] text-nowrap text-[#97A4B6] text-[0.833vw]">
              or sign up with
            </span>{" "}
            <hr className="w-full" />
          </div>

          <button
            onClick={() => signIn("google")}
            type="button"
            className="p-[0.833vw] border border-[#E8EBEF] rounded-[0.833vw]  w-full flex items-center justify-center"
          >
            <FcGoogle size={22} />
          </button>

          <p className="text-center text-[#97A4B6] text-[0.833vw] absolute bottom-0 left-[5.833vw]">
            Already have an account?{" "}
            <Link href="/login" className="text-premier-blue hover:underline">
              Login
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
