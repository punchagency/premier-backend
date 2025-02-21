'use client';
import { BsCheck2Circle } from "react-icons/bs";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from "./Spinner";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
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
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setLoading(false);
        setError(data.message || 'Login failed');
      }
    } catch (error: unknown) {
      setLoading(false);
      setError('Login failed. Please try again.');
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-2 block w-full rounded-md border border-gray-200 shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-2 block w-full rounded-md border border-gray-200 shadow-sm p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || isSuccess}
        className={`w-full rounded-md py-2 mt-4 flex items-center justify-center transition-all duration-300 ${
          isSuccess 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {loading ? (
          <>
            <Spinner  /> 
            <span>Logging in...</span>
          </>
        ) : isSuccess ? (
          <>
            <BsCheck2Circle className="w-5 h-5 mr-2" />
            <span>Logged in</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
      <p className="text-center text-sm mt-4">
        Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
      </p>
    </form>
  );
}