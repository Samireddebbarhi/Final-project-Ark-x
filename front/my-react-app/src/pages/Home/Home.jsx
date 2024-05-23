import React, { Suspense } from 'react';
import BrandCarausel from '../../components/HeroSection/BrandCarausel';
import HeroCarausel from '../../components/HeroSection/HeroCarausel';
// import ProductCard from '../../components/Cards/ProductCard';
import Loader from '../../helper/Loader';
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer';


const Home = () => {
  return( 
  <div>
    <Header/>
      <HeroCarausel />
      <div className='text-4xl p-4 mb-3 font-bold text-gray-800 text-center shadow-md rounded-md'>Ours Brands</div>
      <BrandCarausel />
      <div className='text-4xl p-4 mb-3 font-bold text-gray-800 text-center shadow-md rounded-md'>Top Products</div>
      {/* <ProductCard /> */}
     <Footer/>
      
  </div>
  )
};

export default Home;