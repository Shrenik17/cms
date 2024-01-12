import React from "react";
import product_img_1 from "../../assets/product_img_1.png";
import product_img_2 from "../../assets/product_img_2.png";
import Image from "next/image";
const Carousel = () => {
  return (
    <div className="carousel carousel-center p-4 space-x-4 h-80 md:h-96 lg:h-128 rounded-box">
      <div className="carousel-item w-4/5 md:w-3/4 lg:w-2/3 h-full md:h-96 lg:h-128">
        <Image
          src={product_img_1}
          className="rounded-box h-full w-full"
          alt=""
        />
      </div>
      <div className="carousel-item w-4/5 md:w-3/4 lg:w-2/3 h-full md:h-96 lg:h-128">
        <Image
          src={product_img_2}
          className="rounded-box h-full w-full"
          alt=""
        />
      </div>
      <div className="carousel-item w-4/5 md:w-3/4 lg:w-2/3 h-full md:h-96 lg:h-128">
        <Image
          src={product_img_1}
          className="rounded-box h-full w-full"
          alt=""
        />
      </div>
      <div className="carousel-item w-4/5 md:w-3/4 lg:w-2/3 h-full md:h-96 lg:h-128">
        <Image
          src={product_img_2}
          className="rounded-box h-full w-full"
          alt=""
        />
      </div>
    </div>
  );
};

export default Carousel;
