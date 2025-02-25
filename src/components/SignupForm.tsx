'use client';

import { BsCheck2Circle } from "react-icons/bs";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from "./Spinner";
import { validateEmail } from "@/utils/validateEmail";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { isValid, message } = validateEmail(formData.email);
      if (!isValid) {
        setError(message);
        setLoading(false);
        return;
      }
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Signup failed');
        setLoading(false);
      }
    } catch (error: unknown) {
      setLoading(false);
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);


  return (
    <form
      onSubmit={handleSubmit}
      className="w-[23.906vw] h-[23.906vw]"
    >
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
          required
          placeholder="Name"

        />
        <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
      </div>
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
            <span>Signing up...</span>
          </>
        ) : isSuccess ? (
          <>
            <span className="flex items-center"><BsCheck2Circle className="w-5 h-5 mr-2" />Signed up</span>
          </>
        ) : (
          <span>Sign up</span>
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
      <p className="text-center text-[#97A4B6] text-[0.833vw] mt-[5.042vw]">
        Already have an account?{" "}
        <Link href="/login" className="text-premier-blue hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}