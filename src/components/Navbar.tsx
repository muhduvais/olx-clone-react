import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/symbol.png';
import sell_btn from '../assets/addButton.png';
import search1 from '../assets/search1.svg';
import search from '../assets/search.svg';
import dropdown from '../assets/arrow-down.svg';
import location_icon from '../assets/location.svg';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const { user, logout, openLoginModal } = useAuth();

    const [location, setLocation] = useState<string>('Kerala');
    const [locationDropdown, setLocationDropdown] = useState<boolean>(false);

    const handleSellBtn = () => {
        if (user) {
            navigate('/sell');
        } else {
            openLoginModal();
        }
    };

    console.log('User: ', user);

    return (
        <div>
            <div className="navbar fixed flex items-center justify-between top-0 left-0 w-full h-[70px] mx-auto bg-gray-300 z-10">
                <div className="nav-left flex items-center gap-x-2">
                    <img src={logo} alt="Logo" className="logo cursor-pointer" onClick={() => navigate('/')} />
                    <div className="location flex bg-white justify-between px-3 py-[10px] border-black border-2 rounded w-[280px] h-[48px] relative">
                        <img src={search1} alt="Search icon" className="search-1 mr-2 w-[20px]" />

                        <input type="text" className="border-none outline-none" value={location} readOnly />

                        <img
                            src={dropdown}
                            alt="Dropdown arrow"
                            className={`arrow-down mr-1 ${locationDropdown ? 'rotate-180' : ''} cursor-pointer`}
                            onClick={() => setLocationDropdown((prev) => !prev)}
                        />

                        <div className={`location-dropdown absolute top-12 left-0 right-0 bg-white shadow-2xl flex flex-col items-start gap-y-2 p-5 rounded ${locationDropdown ? 'block' : 'hidden'}`}>
                            <h3 className="text-sm text-gray-600 pb-3">Popular Locations</h3>
                            <ul className="flex flex-col text-start text-gray-700 gap-y-4">
                                {['Kerala', 'Tamil Nadu', 'Panjab', 'Maharashtra'].map((loc) => (
                                    <li
                                        key={loc}
                                        className="flex gap-4 cursor-pointer"
                                        onClick={() => {
                                            setLocation(loc);
                                            setLocationDropdown(false);
                                        }}
                                    >
                                        <img src={location_icon} alt="" className="w-[25px]" />
                                        <span>{loc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`search-bar flex bg-white pl-3 border-black border-2 ${user ? 'w-[740px]' : 'w-[900px]'} h-[48px] rounded`}>
                        <input type="text" className="border-none outline-none w-full" placeholder="Find Cars, Mobile Phones and more..." />
                        <div className="bg-[#002F34] p-[10px]">
                            <img src={search} alt="Search button" className="searchbar-img w-[30px] cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="nav-right flex items-center gap-x-3 px-5">
                    <div className="language flex gap-2 pr-2">
                        <h3 className="font-semibold">English</h3>
                        <img src={dropdown} alt="Language dropdown arrow" className="arrow-down cursor-pointer" />
                    </div>

                    {user && (
                        <div className="user-in flex items-center justify-between">
                            <svg
                                width="34px"
                                height="34px"
                                viewBox="0 0 1024 1024"
                                data-aut-id="icon"
                                className="pr-3 cursor-pointer"
                                fillRule="evenodd"
                            >
                                <path
                                    className="rui-w4DG7"
                                    d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"
                                ></path>
                            </svg>

                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 1024 1024"
                                data-aut-id="icon"
                                className="cursor-pointer"
                                fillRule="evenodd"
                            >
                                <path
                                    className="rui-w4DG7"
                                    d="M730.855 763.955h-435.559c-0.833-87.945-2.676-279.627-2.676-289.496 0-119.351 98.911-216.463 220.498-216.463s220.455 97.112 220.455 216.463c0 10-1.843 201.594-2.72 289.496v0zM819.282 748.603c0.92-93.341 2.062-266.38 2.062-274.144 0-141.589-98.692-260.545-231.64-294.319 2.192-7.237 3.684-14.782 3.684-22.765 0-44.345-35.969-80.27-80.27-80.27-44.345 0-80.27 35.923-80.27 80.27 0 7.983 1.491 15.483 3.684 22.765-132.948 33.731-231.64 152.687-231.64 294.319 0 7.721 1.14 182.339 2.019 276.030l-90.27 36.581 0.92 64.609h316.032c3.729 40.881 37.679 73.031 79.523 73.031s75.794-32.151 79.523-73.031h312.962l1.754-64.523-88.078-38.556z"
                                ></path>
                            </svg>
                        </div>
                    )}

                    {user ? (
                        <h3 className="login underline font-bold pr-2 cursor-pointer" onClick={logout}>
                            Logout
                        </h3>
                    ) : (
                        <h3 className="login underline font-bold pr-2 cursor-pointer" onClick={openLoginModal}>
                            Login
                        </h3>
                    )}
                    <div className="sell-btn">
                        <img
                            src={sell_btn}
                            alt="Sell button"
                            className="sell-btn rounded-[55px] shadow-md cursor-pointer"
                            onClick={handleSellBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;