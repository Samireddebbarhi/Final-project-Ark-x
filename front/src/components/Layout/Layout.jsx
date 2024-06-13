import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../helpers/Loader";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
