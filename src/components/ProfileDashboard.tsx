import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import AccountDetailsDashboard from "./AccountDetails";
import DeleteAccount from "./DeleteAccount";
import NotificationPreferences from "./NotificationPreferences";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");

  return (
    <div className="min-h-screen flex flex-col space-y-[1vw]">
      <h1 className="pt-[1.5vw] ps-[2.6vw] text-[1.458vw] font-normal text-premier-blue font-ranade">
        Welcome 
      </h1>

      {/* Tabs */}

      <div className="flex justify-start space-x-[2.6vw] pl-[2.6vw] py-[1vw]">
        <button
          className={`py-2 text-premier-blue ${
            activeTab === "Personal Details"
              ? "border-b-2 border-premier-orange text-premier-orange"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Personal Details")}
        >
          Personal Details
        </button>
        <button
          className={`py-2 text-premier-blue ${
            activeTab === "Notification Preferences"
              ? "border-b-2 border-premier-orange text-premier-orange"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Notification Preferences")}
        >
          Notification Preferences
        </button>
        <button
          className={`py-2 text-premier-blue ${
            activeTab === "Change Password"
              ? "border-b-2 border-premier-orange text-premier-orange"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Change Password")}
        >
          Change Password
        </button>
        <button
          className={`py-2 text-premier-blue ${
            activeTab === "Delete Account"
              ? "border-b-2 border-premier-orange text-premier-orange"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Delete Account")}
        >
          Delete Account
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-[2.6vw] pb-[4.6vw]">
        {activeTab === "Personal Details" && <AccountDetailsDashboard />}
        {activeTab === "Notification Preferences" && <NotificationPreferences />}
        {activeTab === "Change Password" && <ChangePasswordForm />}

        {activeTab === "Delete Account" && <DeleteAccount />}
      </div>
    </div>
  );
};

export default ProfileDashboard;
