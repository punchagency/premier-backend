import Background from "../../../public/images/background.png"
import ReturnToWebsite from '@/components/ReturnToWebsite';
import BlueLogo from '../../../public/images/blueLogo';
import ForgotPassword from '@/components/Forms/ForgotPasswordForm';
import Link from "next/link";
export default function LoginPage() {
  return (
    <div
      className="w-full bg-cover bg-center" 
      style={{backgroundImage: `url(${Background.src})`}}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-0">
        <div className="w-[43.594vw] space-y-8 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
          <ReturnToWebsite />
          <div className='flex flex-col items-center'>
            <BlueLogo />
          <h2 className="text-[1.042vw] text-premier-blue text-center mt-[1.458vw]">Forgot Password</h2> 
          </div>
          <ForgotPassword />
          <Link href={'/login'} className="text-premier-blue text-center">Go Back</Link>
        </div>
      </div>
    </div>
  );
}
