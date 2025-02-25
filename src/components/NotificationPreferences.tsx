import { useState } from "react";

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    newsUpdates: false,
    emailNotifications: false,
    propertyAlerts: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="">
      <h2 className="text-[1.042vw] font-semibold text-premier-blue mb-[3.042vw]">
        Change your notification preferences
      </h2>

<div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleToggle("newsUpdates")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.newsUpdates ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.newsUpdates ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Subscribe to news and updates
        </label>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => handleToggle("emailNotifications")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.emailNotifications ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.emailNotifications ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Agree to receive email notifications
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleToggle("propertyAlerts")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.propertyAlerts ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.propertyAlerts ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Agree to receive property alerts
        </label>
      </div>
      </div>
      <button
          type="submit"
        className="w-[23.906vw] mt-[3.442vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
      >
        Submit
      </button>
    </div>
  );
};

export default NotificationPreferences;
