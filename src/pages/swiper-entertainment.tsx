import React, { useState, FunctionComponent } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { listBlogState } from "state";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";

const container2Style: React.CSSProperties = {
  position: "relative",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  margin: "auto",
  height: "150px",
  width: "150px",
};

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slideNext()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="#04bfad"
        className="bi bi-arrow-right-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
      </svg>
    </button>
  );
};

export const SwiperEn: FC = () => {
  const swiper = useSwiper();
  const blogList = useRecoilValueLoadable(listBlogState);
  const navigate = useNavigate();
  const gotoPage = (id: string) => {
    navigate("/blog", { state: { id } });
  };
  return blogList.state === "hasValue" && blogList.contents !== null ? (
    <Box m={4}>
      <Swiper spaceBetween={0} slidesPerView={2}>
        {blogList.contents.map((item, index) => (
          <SwiperSlide
            key={`slide${index + 1}`}
            onClick={() => gotoPage(item.id)}
            className="p-1"
          >
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
            <div
              className="slide-label m-3 text-sm font-medium"
              style={{ textAlign: "center" }}
            >
              {item.title}
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute top-1/3 right-0 transform -translate-y-1/2 z-10">
          <NextButton />
        </div>
      </Swiper>
    </Box>
  ) : (
    <Box />
  );
};
