"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlueLogo from "../../../public/images/blueLogo";
import ReturnToWebsite from "@/components/ReturnToWebsite";
import Background from "../../../public/images/background.png";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");

  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
        if (verificationAttempted.current) return;
      verificationAttempted.current = true;
      if (!token) {
        setVerificationStatus("error")
        setMessage("No Token!")
        setTimeout(() => {
            router.push("/login");
          }, 5000);
        return;
      }

      setIsVerifying(true);
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if(data?.success){
            setMessage(data.message)
        }

        if (!data?.success) {
          setVerificationStatus("error");  
          setMessage(data.message) 
          setTimeout(() => {
            router.push("/login");
          }, 5000);
          return;
        }

        setVerificationStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } catch (error) {
        setVerificationStatus("error");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
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
                  Verifying Your Email & Creating Your Account
                </h1>
                <p className="my-6 font-light text-gray-600">
                  Please wait while we verify your email address & create your Account...
                </p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-premier-blue mx-auto"></div>
              </>
            )}
            {verificationStatus === "success" && (
              <>
                <h1 className="text-[1.042vw] text-premier-blue font-semibold text-center mt-[1.458vw]">
                  Email Verified & Account Created!
                </h1>
                <p className="my-6 text-green-600">
                  {message}
                </p>
                <p className="text-sm text-gray-600">
                  Redirecting you to login...
                </p>
              </>
            )}
            {verificationStatus === "error" && (
              <>
                <h1 className="text-[1.042vw] text-center mt-[1.458vw] font-semibold text-red-600">
                  Verification Failed 
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
