"use client";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "formik";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {data:session} = useSession();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void, setErrors: (errors: any) => void }
  ) => {
    setIsSubmitting(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email }),
    });

    if (response.ok) {
      setIsSubmitting(false);
      setSuccessMessage("Reset link sent to email");
    } else {
      setIsSubmitting(false);
      setErrors({ email: "Failed to send reset link" });
      setErrorMessage("Failed to send reset link");
    }
  };
  return (
    <div className="flex items-center justify-center py-[2.208vw]">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        <Form>
          {successMessage && <div className="text-green-500 text-center text-[0.729vw] mb-[1.642vw] ">{successMessage}</div>}
          {errorMessage && <div className="text-red-500 text-center text-[0.729vw] mb-[1.642vw] ">{errorMessage}</div>}
          <Field name="email" placeholder="Email" className="w-full p-[1.042vw] border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-[0.729vw] mt-[0.442vw]" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[23.906vw] mt-[2.042vw] text-white p-[0.625vw] rounded-[0.833vw] flex items-center justify-center bg-premier-blue"
          >
            {isSubmitting ? "Sending reset link..." : "Send reset link"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
