import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import b1 from "../../assets/logos/1.png";
import b2 from "../../assets/logos/2.png";
import b3 from "../../assets/logos/3.png";
import b4 from "../../assets/logos/4.png";
import b5 from "../../assets/logos/5.png";
import b6 from "../../assets/logos/6.png";
import b7 from "../../assets/logos/7.png";
import b8 from "../../assets/logos/8.png";
import b9 from "../../assets/logos/9.png";
import b10 from "../../assets/logos/10.png";
import b11 from "../../assets/logos/11.png";
import b12 from "../../assets/logos/12.png";
import b13 from "../../assets/logos/13.png";
import b14 from "../../assets/logos/14.png";
import b15 from "../../assets/logos/15.png";
import b16 from "../../assets/logos/16.png";
import b17 from "../../assets/logos/17.png";
import b18 from "../../assets/logos/18.png";
import b19 from "../../assets/logos/19.png";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src={b1}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b2}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b3}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b4}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b5}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b6}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b7}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b8}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b9}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b10}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b11}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b12}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b13}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b14}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b15}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b16}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b17}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b18}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b19}
    style={{ width: "120", height: "100px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
];

const BrandCarousel = () => {
  return (
    //   <div className='flex flex-row p-4 overflow-x-auto  shadow-md '>
    //       <div className="relative float-center  w-full" >
    //       <img
    //         src={apple}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt=".."
    //       />
    //     </div>
    //     <div className=" relative float-center w-full">
    //       <img
    //         src={blackberry}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={samsung}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={nokia}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={virgin}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={htc}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={sony}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>
    //     <div className="relative float-center w-full">
    //       <img
    //         src={toshiba}
    //         className="block w-40 h-40 transform hover:translate-y-2 cursor-pointer"
    //         alt="..."
    //       />
    //     </div>

    // </div>

    <div style={{ width: "100%", height: "120px", objectFit: "cover" }}>
      <AliceCarousel
        infinite
        disableDotsControls
        mouseTracking={true}
        autoPlay
        autoPlayInterval="1000"
        items={items}
        disableButtonsControls
        touchTracking
        paddingRight="1200"
      />
    </div>
  );
};

export default BrandCarousel;
