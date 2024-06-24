import React from "react";

import QRCode from "react-qr-code";
import {  useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { Subscription } from "./profile";
import { useSearchParams } from "react-router-dom";
import { ContentFallback } from "components/content-fallback";
import { MembershipWallets } from "./wallet/membership-wallet";

const QRCodePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const member = useRecoilValueLoadable(memberState);

  if(member.state == "loading" || member.state == "hasError"){
    return <ContentFallback />
  }

  return (
    <div className="flex flex-col w-full h-full bg-primary">
      <div className="px-4 py-20">
        {/* Header */}
        <div className="flex justify-center items-center">
          {/* <Icon className="mt-8" icon="zi-arrow-left" /> */}
          <span className="text-xl text-white font-bold m-4">
            Mã Thành Viên
          </span>
        </div>
        
        <div className="bg-white p-4 rounded-lg  text-black">
          {member.state === "hasValue" && member.contents !== null ? (
            <>
               <MembershipWallets />
              <div className="text-center">Đưa mã này vào thiết bị quét mã</div>
              <div className="flex justify-center my-8">
                <QRCode
                  value={
                    code ??
                    member.contents.memberLevel.membershipCard[0]
                      .membershipCardCode
                  }
                  size={220}
                />
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
