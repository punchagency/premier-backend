import LoginForm from '@/components/Forms/LoginForm';
import Background from "../../../public/images/background.png"
import LogoImage from '../../../public/images/logo.png';
import Image from 'next/image';
import { IoChevronBack } from "react-icons/io5";
import ReturnToWebsite from '@/components/ReturnToWebsite';
import BlueLogo from '../../../public/images/blueLogo';

export default function LoginPage() {
  return (
    <div
      className="w-full h-full bg-cover bg-center" 
      style={{backgroundImage: `url(${Background.src})`}}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-0">
        <div className="w-[43.594vw] h-[calc(38.229vw+5.667vh)] space-y-[1.667vw] p-[1.667vw] bg-white rounded-xl shadow-lg flex flex-col items-center">
          <ReturnToWebsite />
          <div className='flex flex-col items-center'>
            <BlueLogo />
          <h2 className="text-[1.042vw] text-premier-blue text-center mt-[1.458vw]">Login to your account</h2> 
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
