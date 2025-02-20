'use client';

import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PropertiesTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/users');
        console.log(response, "Response")
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data: User[] = await response.json();
        console.log(data, "Data")
        setUserData(data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (userData?.length === 0) {
    return <div>No user data available</div>;
  }

  return (
    <div>
    <table className='table-fixed border-collapse border border-gray-300 w-full'>
      <thead className='bg-gray-300'>
        <tr>
          <th className='border border-gray-300'>User Name</th>
          <th className='border border-gray-300'>Property Email</th>
          <th className='border border-gray-300'>User Role</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {userData?.map((user: User) => (
          <tr key={user._id}>
            <td className='border border-gray-300'>{user.name}</td>
            <td className='border border-gray-300'>{user.email}</td>
            <td className='border border-gray-300'>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default PropertiesTable;