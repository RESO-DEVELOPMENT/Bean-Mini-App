import React, { } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";
import { IoIosGift } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  margin: "10px",
};
const swiperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
}
const iconSize = "40px";
export const SwiperItem: FC = () => {
  const navigate = useNavigate();
  const swiperSlides1 = [
    <SwiperSlide key={0} style={swiperStyle} onClick={() => navigate("/qr")}>
      <div style={containerStyle}>
        <MdPayments className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Tích điểm</div>
    </SwiperSlide>,
    // <SwiperSlide key={1} onClick={() => navigate("/qr")}>
    //   <div style={containerStyle}>
    //     <FaStar className="icon-color" size={iconSize} />
    //   </div>
    //   <div className="text-center text-sm">Tích Điểm</div>
    // </SwiperSlide>,
    <SwiperSlide key={2} style={swiperStyle} onClick={() => navigate("/order")}>
      <div style={containerStyle}>
        <FaCartPlus className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Đặt món</div>
    </SwiperSlide>,
    <SwiperSlide key={3} style={swiperStyle} onClick={() => navigate("/voucher")}>
      <div style={containerStyle}>
        <IoTicket className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Khuyến mãi</div>
    </SwiperSlide>,
    <SwiperSlide key={4} style={swiperStyle} onClick={() => navigate("/gifts")}>
      <div style={containerStyle}>
        <IoIosGift className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Tặng quà</div>
    </SwiperSlide>,

    // <SwiperSlide key={4}>
    //   <div style={containerStyle}>
    //     <FaMoneyBillTransfer className="icon-color" size={iconSize} />
    //   </div>
    //   <div className="text-center text-sm">Đổi Điểm</div>
    // </SwiperSlide>,
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
