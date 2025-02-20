import React from 'react';
import { useRouter } from 'next/navigation';

const AccountDetailsDashboard = () => {
    const router = useRouter();
    
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/auth/account", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, Anytown, USA',
    joined: 'January 1, 2020',
  };

  return (
    <div className="bg-gray-100 font-sans">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="space-y-8">
              <div className="mt-10">
                <label htmlFor="name" >Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="">
                <label htmlFor="email" >Email</label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="">
                <label htmlFor="phone" >Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  disabled
                  className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        
          <div>
            <h2 className="text-xl font-semibold mb-2">Account Information</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={user.joined}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="ml-2 text-blue-600 hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between bg-red-200 p-10 mt-20 rounded-3xl">
                <p className="text-red-900">Delete Account? Deleting your account will remove all your data from our database.</p>
              <button onClick={handleDeleteAccount} className="ml-2 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">Delete Account</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsDashboard;