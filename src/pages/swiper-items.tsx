import React, { useState, FunctionComponent } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";
import { IoTicket, IoTicketOutline } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const containerStyle: React.CSSProperties = {
  display: "flex", // Enables Flexbox
  justifyContent: "center", // Centers content horizontally
  alignItems: "center", // Centers content vertically
  position: "relative",
  backgroundColor: "#ffffff",
  padding: "6px",
  borderRadius: "10px",
  // boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
  margin: "10px",
  width: "60px",
  height: "60px", // Adjust height as needed
};
const iconSize = "38px";
export const SwiperItem: FC = () => {
  const navigate = useNavigate();
  const swiperSlides1 = [
    <SwiperSlide key={0} onClick={() => navigate("/qr")}>
      <div style={containerStyle}>
        <MdPayments className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Thanh toán</div>
    </SwiperSlide>,
    <SwiperSlide key={1} onClick={() => navigate("/qr")}>
      <div style={containerStyle}>
        <FaStar className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Tích Điểm</div>
    </SwiperSlide>,
    <SwiperSlide key={2} onClick={() => navigate("/cart")}>
      <div style={containerStyle}>
        <FaCartPlus className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Đặt món</div>
    </SwiperSlide>,
    <SwiperSlide key={3} onClick={() => navigate("/voucher")}>
      <div style={containerStyle}>
        <IoTicketOutline className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Voucher</div>
    </SwiperSlide>,

    <SwiperSlide key={4}>
      <div style={containerStyle}>
        <FaMoneyBillTransfer className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Đổi Điểm</div>
    </SwiperSlide>,
  ];
  return (
    <Box m={2}>
      <Swiper
        spaceBetween={2}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {swiperSlides1}
      </Swiper>
    </Box>
  );
};
