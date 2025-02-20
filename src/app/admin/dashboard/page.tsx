import PropertiesTable from "@/components/PropertiesTable";


const AdminDashboard = () => {
  return (
    
        <div className="container mx-auto px-4 py-8">
      <div className=" text-center mb-6">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
          <h2 className="text-lg font-medium">Properties</h2>
          <p className="text-sm text-gray-500">
            View and manage all properties
          </p>
        </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <PropertiesTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
