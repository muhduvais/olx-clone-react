import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Carousel } from "flowbite-react";
import guitar from '../assets/guita.png'
// import love from '../assets/love.png'
// import avatar from '../assets/avatar.png'

const LoginModal: React.FC = () => {
  const { login, closeLoginModal } = useAuth();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="relative bg-white rounded shadow-lg max-w-md w-[400px] p-6 pt-10">
        <button
          onClick={closeLoginModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        <div onClick={(event) => event.stopPropagation()} className="p-6 pl-2 pr-2 pt-0 bg-white">
          <Carousel 
            slide={true} 
            indicators={true} 
            showThumbs={false} 
            showStatus={false} 
            showArrows={true} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000}
            className="w-full h-56 pb-5 rounded-none overflow-hidden"
            theme={{
              indicators: {
                active: {
                  off: "bg-gray-300",
                  on: "bg-teal-300"
                },
                base: "h-2 w-2 rounded-full",
                wrapper: "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
              },
              scrollContainer: {
                base: "flex h-full snap-mandatory scroll-smooth",
                snap: "snap-x"
              }, 
              control: {
                base: "inline-flex items-center justify-center bg-transparent",
                icon: "w-8 text-white dark:text-black"
              },
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <img className="w-24 pb-5" src={guitar} alt="Car Image 1" />
              <p style={{ color: '#002f34' }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                Help us become one of the safest places to buy and sell.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* <img className="w-24 pb-5" src={love} alt="Car Image 2" />
              <p style={{ color: '#002f34' }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                Close deals from the comfort of your home.
              </p> */}
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* <img className="w-24 pb-5" src={avatar} alt="Car Image 3" />
              <p style={{ color: '#002f34' }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                Keep all your favorites in one place.
              </p> */}
            </div>
          </Carousel>
        </div>

        <button className="flex gap-1 items-center border-2 border-black w-full outline-none px-3 py-[10px] my-2 rounded text-start">
          <svg width="22px" height="22px" viewBox="0 0 1024 1024" fillRule="evenodd">
            <path d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path>
          </svg>
          <h2 className="pl-1 font-semibold">Continue with phone</h2>
        </button>
        
        <button 
          className="flex items-center relative justify-center border border-gray-300 w-full outline-none px-3 py-2 my-2 rounded"
          onClick={login}
        >
          <svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="absolute left-4">
            <g>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Continue with Google
        </button>
        
        <p className="font-semibold py-3 text-sm">OR</p>
        <h3 className="underline font-semibold cursor-pointer">Login with Email</h3>
        
        <div className="info px-5 pt-16">
          <p className="text-xs text-gray-400 pb-3">All your personal details are safe with us.</p>
          <p className="text-xs text-gray-400 w-full">
            If you continue, you are accepting <a href="" className="text-blue-600">OLX Terms and Conditions and Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
