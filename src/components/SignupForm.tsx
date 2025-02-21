'use client';

import { BsCheck2Circle } from "react-icons/bs";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from "./Spinner";
import { validateEmail } from "@/utils/validateEmail";
import { FcGoogle } from "react-icons/fc";

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
    } catch (error: unknown) { // Change err to error and add type
      setLoading(false);
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignup = () => {

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-red-500"><Spinner /></div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md  border border-gray-200 shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md  border border-gray-200 shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || isSuccess}
        className={`w-full rounded-md py-2 flex items-center justify-center transition-all duration-300 ${
          isSuccess 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {loading ? (
          <>
            <Spinner  /> 
            <span>Signing Up...</span>
          </>
        ) : isSuccess ? (
          <>
            <BsCheck2Circle className="w-5 h-5 mr-2" />
            <span>Signed Up</span>
          </>
        ) : (
          <span>Sign Up</span>
        )}
      </button>

<button type="button" className="w-full border border-gray-200 p-2 rounded-lg flex items-center justify-center" onClick={handleGoogleSignup}>
        <FcGoogle className="w-5 h-5 mr-2" />
</button>

      <p className="text-center text-sm">
        Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
      </p>
    </form>
  );
}