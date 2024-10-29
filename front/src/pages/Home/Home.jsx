import React, { Suspense } from "react";
import BrandCarousel from "../../components/HeroSection/BrandCarousel";
import HeroCarousel from "../../components/HeroSection/HeroCarousel";
import TopProduct from "../../components/Cards/TopProduct";
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
      <div className="px-4 lg:px-0">
        <BrandCarousel />
      </div>
      <div className="py-12">
        <div className="text-4xl font-bold text-gray-800 text-center shadow-md rounded-md bg-white p-6 mx-4 lg:mx-auto max-w-screen-md">
          Top Products
        </div>
        <div className="px-4 lg:px-0">
          <Suspense fallback={<Loader />}>
            <TopProduct />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
