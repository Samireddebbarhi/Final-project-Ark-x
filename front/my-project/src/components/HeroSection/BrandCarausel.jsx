import React from 'react';
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

const BrandCarausel = () => {
  return (
    <div>
      {/* brands */}
      < section className="md:py-10  " >
        <div className="md:container mx-auto">
          <div className="relative flex   overflow-x-hidden">
            <div className="py-12  animate-marquee5 whitespace-nowrap flex md:gap-10  ">
              <span className="text-4xl mx-4">
                <img
                  src={b1}
                  alt=""
                />
              </span>
              <span className="text-4xl  mx-4">
                <img
                  src={b2} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b3} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b4} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b5} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b6} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b7} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b8} alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b9} alt=""
                />
              </span>
            </div>

            <div className="absolute top-0 py-12 animate-marquee6 whitespace-nowrap flex md:gap-10 ">
              <span className="text-4xl mx-4">
                <img
                  src={b10}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b11}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b12}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b13}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b14}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b15}
                  alt=""
                />
              </span>{" "}
              <span className="text-4xl mx-4">
                <img
                  src={b16}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b17}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b18}
                  alt=""
                />
              </span>
              <span className="text-4xl mx-4">
                <img
                  src={b19}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </section >
    </div>
  );
};

export default BrandCarausel;
