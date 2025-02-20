import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import AccountDetailsDashboard from "./AccountDetails";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full">
      {/* Navbar */}
      <div className="bg-blue-800 text-white px-8 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Dashboard</h1>
          <div className="flex space-x-4">
            <button className="hover:text-blue-300 transition-colors duration-200">
              Home
            </button>
            <button className="hover:text-blue-300 transition-colors duration-200">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md">
        <div className="flex justify-start space-x-8 pl-16 py-4">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "Account"
                ? "border-b-2 border-blue-800 text-blue-800"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Account")}
          >
            Account
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "Change Password"
                ? "border-b-2 border-blue-800 text-blue-800"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Change Password")}
          >
            Change Password
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "activity"
                ? "border-b-2 border-blue-800 text-blue-800"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-8 pb-0">
        {activeTab === "Account" && (
          <AccountDetailsDashboard />
        )}
        {activeTab === "Change Password" && <ChangePasswordForm />}
        
        {activeTab === "activity" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Activity</h2>
            <p>This is the activity content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
