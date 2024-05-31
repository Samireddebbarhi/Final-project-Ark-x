import React, { Suspense } from "react";
import BrandCarousel from "../../components/HeroSection/BrandCarousel";
import HeroCarousel from "../../components/HeroSection/HeroCarousel";
import ProductCard from "../../components/Cards/ProductCard";
import Loader from "../../helpers/Loader";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <div className="py-12">
        <div className="text-4xl font-bold text-gray-800 text-center shadow-md rounded-md bg-white p-6 mx-4 lg:mx-auto max-w-screen-md">
          Our Brands
        </div>
      </div>
      <BrandCarousel />
      <div className="py-12">
        <div className="text-4xl font-bold text-gray-800 text-center shadow-md rounded-md bg-white p-6 mx-4 lg:mx-auto max-w-screen-md">
          Top Products
        </div>
      </div>
    </div>
  );
};

export default Home;
