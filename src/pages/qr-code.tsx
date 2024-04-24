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
import { Subscription } from "./profile";

const QRCodePage: React.FC = () => {
  const [countdown, setCountdown] = useState(120);
  const qrCode = useRecoilValueLoadable(qrState);
  const member = useRecoilValueLoadable(memberState);

  const [retry, setRetry] = useRecoilState(requestRetriveQRstate);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    if (retry == 0 || countdown == 0) {
      handleUpdateClick();
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);
  useEffect(() => {
    handleUpdateClick();
  }, []);
  const handleUpdateClick = () => {
    setRetry((r) => r + 1);
    setCountdown(120);
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary">
      <div className="px-4 py-20">
        {/* Header */}
        <div className="flex justify-center items-center">
          {/* <Icon className="mt-8" icon="zi-arrow-left" /> */}
          <span className="text-xl text-white font-bold m-4">
            Mã Thành Viên
          </span>
          {/* <Icon className="mt-8 color-white" icon="zi-more-horiz-solid" /> */}
        </div>
        <div className="bg-white p-4 rounded-lg  text-black">
          {member.state === "hasValue" && member.contents !== null ? (
            <>
              <div className="text-center">Đưa mã này vào thiết bị quét mã</div>
              <div className="flex justify-center my-8">
                <QRCode
                  value={
                    member.state === "hasValue" && qrCode.contents !== null
                      ? qrCode.contents
                      : ""
                  }
                  size={220}
                />
              </div>
              <div className="text-center text-sm my-4">
                Tự động cập nhật sau {countdown}s.{" "}
                <button
                  onClick={handleUpdateClick}
                  className="text-green-600 underline"
                >
                  Cập nhật
                </button>
              </div>
            </>
          ) : (
            <Subscription />
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
