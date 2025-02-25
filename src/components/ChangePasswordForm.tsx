"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/change_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message) {
        setSuccess("Password changed successfully");
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error: unknown) {
      // Change err to error and add type
      setError("Password change failed. Please try again.");
      console.error("Password change error:", error);
    }
  };

  return (
    <div className="">
      {success && <div className="text-green-600 mb-4">{success}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <h2 className="text-[1.042vw] text-premier-blue font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-[1.198vw] w-[47.396vw] ">
        <div className="relative">
          <input
            type={showPassword.oldPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
          />
           <button
        type="button"
        onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        {showPassword.oldPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </button>
        </div>
        <div className="relative">
          <input
            type={showPassword.newPassword ? "text" : "password"}
            id="newPassword"
            value={formData.newPassword}
            placeholder="New Password"
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
            required
          />
          <button
        type="button"
          onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        {showPassword.newPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </button>
        </div>
        <div className="relative">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm New Password"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
            required
          />
          <button
        type="button"
        onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        {showPassword.confirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </button>
        </div>
          <button
          type="submit"
        className="w-[23.906vw] mt-[3.042vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
      >
        Submit
      </button>
      </form>
    </div>
  );
}
