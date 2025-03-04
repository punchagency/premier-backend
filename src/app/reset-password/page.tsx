"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReturnToWebsite from "@/components/ReturnToWebsite";
import Background from "../../../public/images/background.png";
import BlueLogo from "../../../public/images/blueLogo";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      if (!token) {
        setVerificationStatus("error");
        setMessage("Invalid reset link");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        return;
      }

      setIsVerifying(true);
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if(data?.success){
          setMessage(data.message)
          setVerificationStatus("success");
          setTimeout(() => {
            router.push(`/new-password?token=${token}`);
          }, 2000);
        }

        if (!data?.success) {
          setVerificationStatus("error");
          setMessage(data.message);
          setTimeout(() => {
            router.push("/login");
          }, 5000);
          return;
        }
      } catch (error) {
        setVerificationStatus("error");
        setMessage("Failed to verify reset link");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div
      className="w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-0">
        <div className="w-[43.594vw] space-y-8 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
          <ReturnToWebsite />
          <div className="flex flex-col items-center">
            <BlueLogo />
            {verificationStatus === "verifying" && (
              <>
                <h1 className="text-[1.042vw] text-premier-blue font-semibold text-center mt-[1.458vw]">
                  Resetting Your Password
                </h1>
                <p className="my-6 font-light text-gray-600">
                  Please wait while we process your password reset...
                </p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-premier-blue mx-auto"></div>
              </>
            )}
            {verificationStatus === "success" && (
              <>
                <h1 className="text-[1.042vw] text-premier-blue font-semibold text-center mt-[1.458vw]">
                  Password Reset Successful
                </h1>
                <p className="my-6 text-green-600">
                  {message}
                </p>
                <p className="text-sm text-gray-600">
                Redirecting you to create new password...
                </p>
              </>
            )}
            {verificationStatus === "error" && (
              <>
                <h1 className="text-[1.042vw] text-center mt-[1.458vw] font-semibold text-red-600">
                  Password Reset Failed
                </h1>
                <p className="my-6 text-red-600">
                  {message}
                </p>
                <p className="text-sm text-gray-600">
                  Redirecting you to login...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
