import SignupForm from '@/components/SignupForm';
import BlueLogo from '../../../public/images/blueLogo';
import ReturnToWebsite from '@/components/ReturnToWebsite';
import Background from "../../../public/images/background.png"
export default function SignupPage() {
  return (
    <div
      className="w-full h-full bg-cover bg-center" 
      style={{backgroundImage: `url(${Background.src})`}}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-0">
        <div className="w-[43.594vw] h-[42.229vw] space-y-20 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">

          <div className='flex flex-col items-center'>
            <BlueLogo />
            <h2 className="text-[1.042vw] text-premier-blue text-center mt-[1.458vw]">Create Account</h2>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}