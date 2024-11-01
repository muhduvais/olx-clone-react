import { FC } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import UseFetchAds from '../components/UseFetchAds';
import loadingGif from '../assets/loading.gif';

interface Ad {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

const Home: FC = () => {
  const { isLoginModalOpen } = useAuth();
  const { ads, loading, error } = UseFetchAds();

  if (loading) return (
    <div className="loading w-screen h-screen flex items-center justify-center">
      <img src={loadingGif} alt="Loading" width="350px" />
    </div>
  );

  if (error) return <div>Error loading ads: {error.message}</div>; 

  return (
    <>
      <Navbar />
      {isLoginModalOpen && <LoginModal />}
      <div className="main-container w-full px-4 sm:px-12 md:px-20 lg:px-44 py-12">
        <div className="products-container mt-[50px]">
          <h2 className="py-5 text-start text-2xl">Fresh Recommendations</h2>
          <div className="product-cards grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {ads.map((ad: Ad) => (
              <ProductCard 
                key={ad.id}
                id={ad.id}
                title={ad.title}
                price={ad.price}
                category={ad.category}
                description={ad.description}
                image={ad.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;