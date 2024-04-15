import React, { useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bannerImgOne from "../../assets/banner/bannerImgOne.jpg";
import bannerImgTwo from "../../assets/banner/bannerImgTwo.jpg";
import bannerImgThree from "../../assets/banner/bannerImgThree.jpg";
import bannerImgFour from "../../assets/banner/bannerImgFour.jpg";
import bannerImgFive from "../../assets/banner/bannerImgFive.jpg";

const Hero = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "40%",
          transform: "translate(-50% -50%)",
          width: "210px",
        }}
      >
        <ul
          style={{
            position: "absolute",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                background: "#131921",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid #f3a847",
              }
            : {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#232F3E",
                color: "white",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid white",
              }
        }
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="w-full">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          <div>
            <img
              src={bannerImgOne}
              alt="bannerImgOne"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={bannerImgTwo}
              alt="bannerImgTwo"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={bannerImgThree}
              alt="bannerImgThree"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={bannerImgFour}
              alt="bannerImgFour"
              className="w-full"
            />
          </div>
          <div>
            <img
               src={bannerImgFive}
              alt="bannerImgFive"
              className="w-full"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
