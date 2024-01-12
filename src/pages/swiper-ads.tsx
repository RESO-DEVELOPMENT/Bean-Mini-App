import React, { useState, FunctionComponent } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";

const container1Style: React.CSSProperties = {
  position: "relative",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  margin: "10px",
  height: "180px",
};

const imagePaths = [
  "docs/dummy/banner-3.jpg",
  "docs/dummy/banner-2.jpg",
  "docs/dummy/banner-1.jpg",
];

const swiperSlides = imagePaths.map((path) => (
  <div style={container1Style}>
    <img
      src={path}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
  </div>
));

export const SwiperAd: FC = () => {
  const navigate = useNavigate();
  return (
    <Box className=" mt-5">
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides={true}
        onSlideChange={() => console.log("thay đổi slide")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {swiperSlides.map((slideContent, index) => (
          <SwiperSlide key={index}>{slideContent}</SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
