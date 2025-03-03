import React, { useState } from "react";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import AccountDetailsDashboard from "./AccountDetails";
import DeleteAccount from "./DeleteAccount";
import { useAppSelector } from "@/redux/hooks";
import SubscriptionPreferences from "../SubscriptionPreferences";
const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const { user } = useAppSelector((state) => state.user);

  console.log(user, "user");

  return (
    <div className="min-h-screen flex flex-col space-y-[1vw]">
      <h1 className="mt-[3.5vw] ps-[2.6vw] text-[1.458vw] font-normal text-premier-blue font-ranade">
        Welcome {user?.name}
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
            activeTab === "Subscription Preferences"
              ? "border-b-2 border-premier-orange text-premier-orange"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Subscription Preferences")}
        >
          Subscription Preferences
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
        {activeTab === "Subscription Preferences" && <SubscriptionPreferences />}
        {activeTab === "Change Password" && <ChangePasswordForm />}
        {activeTab === "Delete Account" && <DeleteAccount />}
      </div>
    </div>
  );
};

export default ProfileDashboard;
