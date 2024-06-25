import React from "react";

import QRCode from "react-qr-code";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { Subscription } from "./profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentFallback } from "components/content-fallback";
import { MembershipWallets } from "./wallet/membership-wallet";
import { Box, Icon, Page } from "zmp-ui";

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const member = useRecoilValueLoadable(memberState);

  if (member.state == "loading" || member.state == "hasError") {
    return <ContentFallback />;
  }

  return (
    <Page className="bg-primary p-4 text-black flex justify-center items-center min-h-screen">
  <Box className="h-full flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg">
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
          <div className="flex justify-center mt-4">
            <button
              className="px-14 py-3 border-2 border-primary rounded-lg flex items-center"
              onClick={() => navigate("/history-transaction")}
            >
              <Icon icon="zi-clock-2" className="mr-2" />
              Giao dịch của bạn
            </button>
          </div>
        </>
      ) : (
        <Subscription />
      )}
    </div>
  </Box>
</Page>

  );
};

export default QRCodePage;
