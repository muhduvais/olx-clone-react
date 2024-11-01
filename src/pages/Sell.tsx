import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { db } from '../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';

interface AdData {
  title: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

const Sell: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Cars');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const storage = getStorage();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      let imageUrl = '';
      
      if (image) {
        const storageRef = ref(storage, `ads/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const adData: AdData = {
        title,
        category,
        price: Number(price),
        description,
        imageUrl,
        createdAt: new Date(),
      };
      
      const docRef = await addDoc(collection(db, 'ads'), adData);
      console.log('Ad created with ID: ', docRef.id);
      
      setTitle('');
      setCategory('Cars');
      setPrice('');
      setDescription('');
      setImage(null);
      setImagePreview(null);

      navigate('/');
      toast.success('Ad created!');

      console.log('Form submitted, files saved!');
    } catch (error) {
      console.error('Error adding ad:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
        return navigate('/');
      }
  }, [user, navigate]);

  return (
    <>
    <ToastContainer />
      <div className="sell w-screen flex flex-col items-center justify-center">
        <div className="navbar flex items-center px-10 bg-[#F7F8F9] w-full h-[70px]">
          <div className="button cursor-pointer hover:bg-gray-200 hover:rounded-full p-3 hover:shadow-lg active:text-gray-500" onClick={handleBack}>
            <FaArrowLeft />
          </div>
        </div>

        <h1 className='text-2xl uppercase font-bold p-5'>Post Your Ad</h1>
        <div className="createAd mx-auto border border-gray-300 rounded-lg p-6 bg-white shadow-lg w-[40%]">
          <h2 className="text-xl font-bold mb-10 text-start uppercase">Create an Ad</h2>
          <form className="space-y-6 w-[80%]" onSubmit={handleSubmit}>
          
            <div className="form-input">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-start">Enter the Title</label>
              <input 
                type="text" 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-[#002F34] rounded-md focus:outline-none focus:border-blue-500" 
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-1  text-start">Select Category</label>
              <select 
                id="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-[#002F34] rounded-md focus:outline-none focus:border-blue-500" required>
                  <option value="Cars">Cars</option>
                  <option value="Properties">Properties</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Bikes">Bikes</option>
                  <option value="Electronics & Appliances">Electronics & Appliances</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Passion">Passion</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-input">
              <label htmlFor="price" className="block text-gray-700 font-medium mb-1  text-start">Price</label>
              <input 
                type="number" 
                id="price" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-[#002F34] rounded-md focus:outline-none focus:border-blue-500" 
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1  text-start">Description</label>
              <textarea 
                id="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-[#002F34] rounded-md focus:outline-none focus:border-blue-500" rows={4}
                required
              ></textarea>
            </div>

            <div className="form-input">
              <label htmlFor="image" className="block text-gray-700 font-medium mb-1 text-start">Image</label>
              <div className="w-full h-40 flex items-center justify-center rounded-lg border border-dashed border-gray-400 cursor-pointer relative overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Selected" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                ) : (
                  <p className="text-gray-500">Click to select an image</p>
                )}
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>
            </div>

            <div className="btn-div w-full text-start">
              <button type="submit" className="bg-[#002F34] px-3 border-3 border-[#002F34] text-white py-3 rounded-lg font-bold ">
                Post now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sell;