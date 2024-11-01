import React from 'react';
import './Footer.css';
import playstore from '../assets/playstore.webp';
import appstore from '../assets/appstore.webp';
import footer_brand1 from '../assets/footer_brand1.svg';
import footer_brand2 from '../assets/footer_brand2.svg';
import footer_brand3 from '../assets/footer_brand3.svg';
import footer_brand4 from '../assets/footer_brand4.svg';
import footer_brand5 from '../assets/footer_brand5.svg';
import footer_brand6 from '../assets/footer_brand6.svg';

const Footer = () => {
  return (
    <div className='footer w-screen mx-auto'>
      <div className="top-footer bg-[#EBEEEF] mt-10 w-screen flex items-start text-start justify-between px-40">
        <div className="list-div flex flex-col py-2 pb-4">
          <h2 className="text-sm py-2 font-bold uppercase">Popular locations</h2>
          <ul className="popular flex flex-col text-start text-xs text-gray-500 gap-y-1">
            <li className="cursor-pointer">Kolkata</li>
            <li className="cursor-pointer">Mumbai</li>
            <li className="cursor-pointer">Chennai</li>
            <li className="cursor-pointer">Pune</li>
          </ul>
        </div>
        <div className="list-div flex flex-col py-2 pb-4">
          <h2 className="text-sm py-2 font-bold uppercase">Trending locations</h2>
          <ul className="trending flex flex-col text-start text-xs text-gray-500 gap-y-1">
            <li className="cursor-pointer">Bhubaneshwar</li>
            <li className="cursor-pointer">Hyderabad</li>
            <li className="cursor-pointer">Chandigarh</li>
            <li className="cursor-pointer">Nashik</li>
          </ul>
        </div>
        <div className="about list-div flex flex-col py-2 pb-4">
          <h2 className="text-sm py-2 font-bold uppercase">About Us</h2>
          <ul className="flex flex-col text-start text-xs text-gray-500 gap-y-1">
            <li className="cursor-pointer">Tech@OLX</li>
          </ul>
        </div>
        <div className="olx list-div flex flex-col py-2 pb-4">
          <h2 className="text-sm py-2 font-bold uppercase">OLX</h2>
          <ul className="flex flex-col text-start text-xs text-gray-500 gap-y-1">
            <li className="cursor-pointer">Blog</li>
            <li className="cursor-pointer">Help</li>
            <li className="cursor-pointer">Sitemap</li>
            <li className="cursor-pointer">Legal & Privacy information</li>
            <li className="cursor-pointer">Vulnerability Disclosure Program</li>
          </ul>
        </div>
        <div className="list-div flex flex-col py-2 pb-4">
          <h2 className="text-sm py-2 font-bold uppercase">Follow Us</h2>
          <ul className="flex text-start text-xs text-gray-500 gap-x-1">
            {/* Add social media icons here */}
          </ul>
        </div>
      </div>
      <div className="bottom-footer bg-[#F8F9FA] py-4 flex flex-col items-center">
        <div className="app-downloads flex justify-center gap-x-4 mb-2">
          <img src={playstore} alt="Download on Play Store" className="h-10" />
          <img src={appstore} alt="Download on App Store" className="h-10" />
        </div>
        <div className="footer-brands flex justify-center gap-x-4 mb-2">
          <img src={footer_brand1} alt="Brand 1" className="h-8" />
          <img src={footer_brand2} alt="Brand 2" className="h-8" />
          <img src={footer_brand3} alt="Brand 3" className="h-8" />
          <img src={footer_brand4} alt="Brand 4" className="h-8" />
          <img src={footer_brand5} alt="Brand 5" className="h-8" />
          <img src={footer_brand6} alt="Brand 6" className="h-8" />
        </div>
        <p className="text-xs text-gray-500">© 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;