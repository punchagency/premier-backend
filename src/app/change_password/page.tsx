import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";


export default function change_password() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Change Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}