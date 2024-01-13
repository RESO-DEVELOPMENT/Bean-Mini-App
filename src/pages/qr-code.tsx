import React, { useEffect, useState } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { IoEyeSharp } from "react-icons/io5";
import wallet from "static/wallet.png";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

const QRCodePage: React.FC = () => {
  const [countdown, setCountdown] = useState(120);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const iconSize = "20px";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleUpdateClick = () => {
    setCountdown(120);
  };

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{ background: "#14D9C5" }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-center items-center">
          {/* <Icon className="mt-8" icon="zi-arrow-left" /> */}
          <span className="text-xl text-white font-bold mt-8">
            QR Thanh toán
          </span>
          {/* <Icon className="mt-8 color-white" icon="zi-more-horiz-solid" /> */}
        </div>

        <div className="bg-white p-8 rounded-lg my-4 text-black">
          <div className="text-center">Đưa mã này cho thu ngân</div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Barcode value="1234567890" width={2} height={50} fontSize={14} />
          </div>
          <div className="flex justify-center">
            <QRCode value="https://example.com" size={160} />
          </div>
          <div className="text-center text-sm mt-2">
            Tự động cập nhật sau {countdown}s.{" "}
            <button
              onClick={handleUpdateClick}
              className="text-green-600 underline"
            >
              Cập nhật
            </button>
          </div>
        </div>
        {/* aa */}
        <div className="relative my-4 -mt-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-dashed border-gray-300" />
          </div>
          <div
            className="absolute inset-0 h-0.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, grey 0, grey 10px, transparent 10px, transparent 20px)",
            }}
          />
        </div>
        <div
          className="bg-white rounded-lg "
          style={{ height: "134px", marginTop: "-18px" }}
        >
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white my-2 text-black">
            <div className="flex items-center">
              <Text.Title className="text-sm">Tài Khoản/Điểm</Text.Title>
              {/* <IoEyeSharp className="ml-4" size={iconSize} /> */}
            </div>
            {/* <div className="flex items-center">
              <Text className="text-primary text-sm">Xem tất cả</Text>
            </div> */}
          </div>

          {/* Wallet Info */}
          <div className="flex space-x-4 m-2">
            {[0, 1].map((index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg bg-white text-black ${
                  selectedIndex === index
                    ? "border-solid border border-green-600"
                    : ""
                }`}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                  width: "160px",
                  height: "70px",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center mr-8">
                  <div className="w-8 h-8 bg-green rounded-full mr-2">
                    <img className=" mr-1" src={wallet} />
                  </div>
                  <span className="font-bold">Ví Bean</span>
                </div>
                <span className="order-2 mr-2 font-bold ">239đ</span>
              </div>
            ))}
          </div>
        </div>
        {/* Promotions */}
        <div className="flex flex-row items-center my-2">
          {/* Separate Text "Ưu đãi của tôi" */}
          <div className="flex items-center">
            <span className="font-bold text-white">Ưu đãi của tôi</span>
          </div>
          <div
            className="flex items-end justify-end px-2 py-2 rounded-lg text-white w-46 h-10 ml-14 font-bold"
            style={{ background: "#6AD9CE" }}
          >
            <span className="text-m items-center whitespace-nowrap mr-1">
              Xem thêm
            </span>
            <Icon icon="zi-chevron-right" className="ml-1" />
          </div>
        </div>
        {/* <div className="flex">
          <div
            className="flex items-start justify-between px-3 py-2 mt-18 rounded-lg bg-white border-solid border border-green text-black"
            style={{
              flexDirection: "column",
              paddingBottom: "5px",
              alignItems: "flex-start",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
              width: "240px",
              height: "90px",
            }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green rounded-full mr-2 mb-12">
                <img className="mr-1" src={wallet} alt="Wallet" />
              </div>
              <div className="flex-1">
                <p className="text-m">Chuyển tiền đ...</p>
                <div className="flex items-center">
                  <p className="mr-3 font-bold relative text-sm">Hoàn 50%</p>
                  <button
                    className="bg-white rounded-full  text-green relative font-bold"
                    style={{
                      fontSize: "18px",
                      padding: "6px",
                      marginRight: "10px",
                      top: "4px",
                      left: "10px",
                      bottom: "2px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Chọn
                  </button>
                </div>
                <p className="order-2" style={{ float: "right" }}>
                  HSD: 1/12/2024
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QRCodePage;
