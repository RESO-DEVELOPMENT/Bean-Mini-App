import React, { useState, FunctionComponent } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";
import { IoTicket, IoTicketOutline } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { FaStore } from "react-icons/fa";

const containerStyle: React.CSSProperties = {
  display: "flex", // Enables Flexbox
  justifyContent: "center", // Centers content horizontally
  alignItems: "center", // Centers content vertically
  position: "relative",
  backgroundColor: "#ffffff",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  marginTop: "10px",
  marginRight: "10px",
  marginLeft: "10px",
  width: "60px",
  height: "60px", // Adjust height as needed
};
const iconSize = "30px";
const swiperSlides1 = [
  <SwiperSlide>
    <div style={containerStyle}>
      <IoTicketOutline className="icon-color" size={iconSize} />
    </div>
    <div className="ml-3">Voucher</div>
  </SwiperSlide>,
  <SwiperSlide>
    <div style={containerStyle}>
      <FaStore className="icon-color" size={iconSize} />
    </div>
    <div className="ml-6">Deer</div>
  </SwiperSlide>,
  <SwiperSlide>
    <div style={containerStyle}>
      <FaMoneyBillTransfer className="icon-color" size={iconSize} />
    </div>
    <div className="ml-3">Đổi Điểm</div>
  </SwiperSlide>,
  <SwiperSlide>
    <div style={containerStyle}>
      <FaStar className="icon-color" size={iconSize} />
    </div>
    <div className="ml-2">Tích Điểm</div>
  </SwiperSlide>,
  <SwiperSlide>
    <div style={containerStyle}>
      <MdPayments className="icon-color" size={iconSize} />
    </div>
    <div className="ml-3">Payment</div>
  </SwiperSlide>,
];

export const SwiperItem: FC = () => {
  const navigate = useNavigate();
  return (
    <Box m={4}>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {swiperSlides1}
      </Swiper>
    </Box>
  );
};
