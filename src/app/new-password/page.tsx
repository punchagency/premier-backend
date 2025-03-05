import LoginForm from '@/components/Forms/LoginForm';
import Background from "../../../public/images/background.png"
import LogoImage from '../../../public/images/logo.png';
import Image from 'next/image';
import { IoChevronBack } from "react-icons/io5";
import ReturnToWebsite from '@/components/ReturnToWebsite';
import BlueLogo from '../../../public/images/blueLogo';
import NewPasswordForm from '@/components/Forms/NewPasswordForm';

export default function LoginPage() {
  return (
    <div
      className="w-full h-full bg-cover bg-center" 
      style={{backgroundImage: `url(${Background.src})`}}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-0">
        <div className="w-[43.594vw] space-y-8 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
          <ReturnToWebsite />
          <div className='flex flex-col items-center'>
            <BlueLogo />
          <h2 className="text-[1.042vw] text-premier-blue text-center mt-[1.458vw]">Create New Password</h2> 
          </div>
          <NewPasswordForm />
        </div>
      </div>
    </div>
  );
}
