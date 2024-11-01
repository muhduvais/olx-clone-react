import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import loadingGif from '../assets/loading.gif';

interface Product {
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ItemDetails: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNumber, setShowNumber] = useState<boolean>(false);

  const { user, isLoginModalOpen } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (itemId) {
          const productRef = doc(db, 'ads', itemId);
          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            setProduct(productDoc.data() as Product);
          } else {
            setError('Product not found');
          }
        }
      } catch (error) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (loading) {
    return (
      <div className="loading w-screen h-screen flex items-center justify-center">
        <img src={loadingGif} alt="Loading..." className="w-20 md:w-40" />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      {isLoginModalOpen && <LoginModal />}
      <div className="main w-screen flex items-center justify-center px-4 md:px-20 lg:px-40">
        <div className="main-container w-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8 py-10 mt-20">
          {/* Left Container */}
          <div className="left-container flex flex-col text-left gap-y-5">
            <div className="img-div">
              <img
                src={product?.imageUrl}
                alt="Product"
                className="rounded-md w-full object-cover"
              />
            </div>

            <div className="details flex flex-col bg-white border-2 rounded-md p-4 md:p-6">
              <div className="top-part pb-4">
                <h2 className="text-lg font-bold pb-2">Details</h2>
                <ul className="text-sm">
                  <li className="pb-3 text-xl">{product?.title}</li>
                  <li>
                    <span className="font-semibold">Category:</span>{' '}
                    {product?.category}
                  </li>
                </ul>
              </div>
              <hr />
              <div className="bottom-part pt-4">
                <h2 className="text-lg font-bold pb-2">Description</h2>
                <p className="text-sm">{product?.description}</p>
              </div>
            </div>
          </div>

          {/* Right Container */}
          <div className="right-container flex flex-col w-full lg:w-[70%] gap-y-4">
            <div className="right-details text-start flex flex-col bg-white border-2 rounded-md p-4 md:p-5">
              <h2 className="price text-2xl md:text-3xl font-bold pb-3">
                ₹ {product?.price}
              </h2>
              <p>{product?.description}</p>
            </div>

            <div className="user-details text-start flex flex-col items-center justify-center bg-white border-2 rounded-md p-4 md:p-5">
              <h2 className="text-lg font-semibold">
                {user ? user.displayName : 'Username'}
              </h2>
              <button className="outline-none border-2 hover:border-4 rounded border-black w-full p-3 my-3 font-bold">
                Chat with seller
              </button>
              <div className="contact-number flex items-center gap-x-2">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                >
                  <path
                    className="rui-lquEm"
                    d="M784.555 852.395c-331.435-14.635-598.315-281.515-612.949-612.949l149.973-59.989 91.691 183.424-70.997 35.499v26.453c0 141.653 115.243 256.896 256.896 256.896h26.453l11.861-23.637 23.68-47.36 183.381 91.733-59.989 149.931zM918.101 643.456l-256.939-128.469-57.472 19.2-30.037 60.032c-74.069-11.093-132.736-69.803-143.872-143.872l60.075-30.037 19.157-57.429-128.427-256.939-54.187-20.608-214.187 85.632-26.88 39.808c0 401.365 326.571 727.893 727.936 727.893l39.765-26.88 85.632-214.187-20.608-54.187z"
                  ></path>
                </svg>
                <p>{showNumber ? '9654882157' : '**********'}</p>
                <p
                  className="text-xs text-blue-600 underline cursor-pointer"
                  onClick={() => setShowNumber((prev) => !prev)}
                >
                  {showNumber ? 'Hide number' : 'Show number'}
                </p>
              </div>
            </div>

            <div className="place text-start flex flex-col justify-center bg-white border-2 rounded-md p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-bold pb-2 md:pb-3">
                Posted in
              </h2>
              <p className="text-xs text-gray-600">Juhu, Mumbai, Maharashtra</p>
            </div>

            <div className="map text-start flex flex-col justify-center bg-white border-2 rounded-md p-4 md:p-5">
              <iframe
                className="gmap_iframe w-full"
                height="250"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=navimumbai&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemDetails;