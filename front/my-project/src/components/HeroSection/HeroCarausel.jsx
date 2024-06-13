import React from "react"
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import b1 from "../../assets/banner/1.jpg"
import b2 from "../../assets/banner/2.jpg"
import b3 from "../../assets/banner/3.jpg"


const handleDragStart = (e) => e.preventDefault();
const items =[
  <img
    src={b1}
    style={{width:"100%", height:"320px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b2}
    style={{width:"100%", height:"320px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
  <img
    src={b3}
    style={{width:"100%", height:"320px", objectFit: "cover" }}
    alt="..."
    onDragStart={handleDragStart}
  />,
]

const HeroCarausel = () => {
  return (
    <div style={{ width:"100%", height:"350px", objectFit: "cover" }}>
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
