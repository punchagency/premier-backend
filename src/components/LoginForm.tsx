"use client";

import { BsCheck2Circle } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "./Spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthenticated, setUser, updateUserDetails } from "@/redux/features/userSlice";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "data");

      if (data.success) {
        setIsSuccess(true);
        setLoading(false);
      console.log('User data received:', data.user); // Debug log
        
        dispatch(setUser(data.user));
        dispatch(setAuthenticated(true));
        if (data.user.role === "admin") {
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 2000);
        } else {
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      } else {
        setLoading(false);
        setError(data.message || "Login failed");
      }
    } catch (error: unknown) {
      setLoading(false);
      setError("Login failed. Please try again.");
      console.error("Error:", error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[23.906vw] h-[23.906vw] mt-[3.49vw]"
    >
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-4">
      <div className="relative">
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
          required
          placeholder="Email Address"

        />
        <MdOutlineMailOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
          required
          placeholder="Password"

        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
          </div>
          <button
        type="submit"
        disabled={loading || isSuccess}
        className={`w-[23.906vw] mt-[3.042vw] text-white p-[0.625vw] rounded-[0.833vw] flex items-center justify-center ${
          isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-premier-blue"
        } text-white`}
      >
        {loading ? (
          <>
            <span>Logging in...</span>
          </>
        ) : isSuccess ? (
          <>
            <span className="flex items-center"><BsCheck2Circle className="w-5 h-5 mr-2" />Logged in</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
      <div className="flex justify-center items-center mt-[1.458vw]">
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
          <Link href="#" className="text-premier-blue font-medium hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      <p className="text-center text-[#97A4B6] text-[0.833vw] mt-[4.542vw]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-premier-blue hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
