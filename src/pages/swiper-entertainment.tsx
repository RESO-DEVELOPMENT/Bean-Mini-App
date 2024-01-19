import React, { useState, FunctionComponent } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { listBlogState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";

const container2Style: React.CSSProperties = {
  position: "relative",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  margin: "10px",
  height: "140px",
  width: "140px",
};
const imageInfo = [
  { path: "docs/dummy/product-square-1.jpg", label: "Siêu Khuyến Mãi" },
  {
    path: "docs/dummy/product-square-6.jpg",
    label: "Giảm 20% cafe deer",
  },
  { path: "docs/dummy/product-square-8.jpg", label: "Mừng tết đến xuân về" },
];

const swiperSlides2 = imageInfo.map((item, index) => (
  <SwiperSlide key={`slide${index + 1}`}>
    <div style={container2Style}>
      <img
        src={item.path}
        alt={`Slide ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
    <div
      className="slide-label"
      style={{ textAlign: "center", marginTop: "10px" }}
    >
      {item.label}
    </div>
  </SwiperSlide>
));

export const SwiperEn: FC = () => {
  const blogList = useRecoilValueLoadable(listBlogState);
  const navigate = useNavigate();
  return blogList.state === "hasValue" && blogList.contents !== null ? (
    <Box m={4}>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {blogList.contents.map((item, index) => (
          <SwiperSlide key={`slide${index + 1}`}>
            <div style={container2Style}>
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="slide-label mr-1" style={{ textAlign: "center" }}>
              {item.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : (
    <Box />
  );
};
