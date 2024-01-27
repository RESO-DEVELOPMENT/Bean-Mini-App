import React, { useEffect, useState } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { IoEyeSharp } from "react-icons/io5";
import wallet from "static/wallet.png";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { qrState, memberState, requestRetriveQRstate } from "state";
import { DisplayPrice } from "components/display/price";
import { DisplayValue } from "components/display/value";

const QRCodePage: React.FC = () => {
  const [countdown, setCountdown] = useState(120);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const iconSize = "20px";
  const qrCode = useRecoilValueLoadable(qrState);
  const member = useRecoilValue(memberState);
  const pointWallet = member?.level.memberWallet.find(
    (e) => e.walletType.name === "POINT"
  );
  const monney = member?.level.memberWallet.find(
    (e) => e.walletType.name === "MONEY"
  );
  const [retry, setRetry] = useRecoilState(requestRetriveQRstate);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    if (retry == 0 || countdown == 0) {
      setRetry((r) => r + 1);
      setCountdown(120);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  const handleUpdateClick = () => {
    setRetry((r) => r + 1);
    setCountdown(120);
  };

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary">
      <div className="px-4 py-12">
        {/* Header */}
        <div className="flex justify-center items-center">
          {/* <Icon className="mt-8" icon="zi-arrow-left" /> */}
          <span className="text-xl text-white font-bold m-4">
            QR Thanh toán
          </span>
          {/* <Icon className="mt-8 color-white" icon="zi-more-horiz-solid" /> */}
        </div>
        <div className="bg-white p-4 rounded-lg  text-black">
          <div className="text-center">Đưa mã này cho nhân viên </div>
          <div className="flex justify-center my-8">
            <QRCode
              value={
                qrCode.state === "hasValue" && qrCode.contents !== null
                  ? qrCode.contents
                  : ""
              }
              size={200}
            />
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
          <div className="flex items-center justify-between  py-2 rounded-lg bg-white my-2 text-black">
            <div className="flex items-center">
              <Text.Title className="text-base ml-3">
                Tài Khoản / Điểm
              </Text.Title>
              {/* <IoEyeSharp className="ml-4" size={iconSize} /> */}
            </div>
            {/* <div className="flex items-center">
              <Text className="text-primary text-sm">Xem tất cả</Text>
            </div> */}
          </div>
          <div className="flex items-baseline space-x-2 ">
            <div
              className={
                "flex-2 items-center justify-between p-3 w-40 rounded-lg bg-white text-black border-solid border border-primary"
              }
            >
              <div className="flex items-center ">
                <span className="text-sm">Ví Bean </span>
              </div>
              <span className="order-2 font-bold ">
                <DisplayValue
                  value={monney?.balance ?? 0}
                  unit={" " + monney?.walletType.currency}
                />
              </span>
            </div>
            <div
              className={
                "flex-2 items-center justify-between p-3 w-40 rounded-lg bg-white text-black border-solid border border-primary"
              }
            >
              <div className="flex items-center mr-8">
                <span className="text-sm">Ví Điểm</span>
              </div>
              <span className="order-2 mr-2 font-bold ">
                {pointWallet?.balance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
