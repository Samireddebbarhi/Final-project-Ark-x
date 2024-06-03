import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import b1 from "../../assets/banner/1.jpeg";
import b2 from "../../assets/banner/2.jpeg";
import b3 from "../../assets/banner/3.jpeg";
import b4 from "../../assets/banner/4.jpeg";

const handleDragStart = (e) => e.preventDefault();
const items = [
  <img
    src={b1}
    style={{ width: "100%", height: "500px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b2}
    style={{ width: "100%", height: "500px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b3}
    style={{ width: "100%", height: "500px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b4}
    style={{ top: "20px", width: "100%", height: "500px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
];

const HeroCarausel = () => {
  return (
    <div
      style={{
        top: "20px",
        width: "100%",
        height: "450px",
        objectFit: "cover",
      }}
    >
      <AliceCarousel
        infinite
        disableDotsControls
        mouseTracking={true}
        autoPlay
        autoPlayInterval="2000"
        items={items}
        disableButtonsControls
        touchTracking
      />
    </div>
  );
};

export default HeroCarausel;
