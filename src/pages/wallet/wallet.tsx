import { Divider } from "components/divider";
import { Banner } from "pages/index/banner";
import { Subscription } from "pages/profile";
import { SwiperAd } from "pages/swiper-ads";
import { SwiperEn } from "pages/swiper-entertainment";
import { SwiperItem } from "pages/swiper-items";
import React, { Suspense } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { memberState } from "state";
import { Box, Page, Text } from "zmp-ui";
import { Features } from "./categories";
import { WelcomeUser } from "./hello";
import { WalletBalance } from "./wallet-balance";
const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    height: "60px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const flexContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const blueTextStyle: React.CSSProperties = {
    color: "#14D9C5",
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <WelcomeUser />
      <Box className="flex-1 overflow-auto">
        {member.state === "hasValue" && member.contents !== null ? (
          <>
            <WalletBalance memberInfo={member.contents} />
            <Banner />
            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              <Text.Title size="normal">Dịch vụ</Text.Title>
              {/* <Text.Title className="text-sm" style={blueTextStyle}>
                Tất cả
              </Text.Title> */}
            </Box>
            <SwiperItem />
            {/* <Features /> */}
            <Box className="mx-4 mt-8" style={flexContainerStyle}>
              <Text.Title size="normal">Chương trình</Text.Title>
              {/* <Text.Title size="normal">Tất cả</Text.Title> */}
            </Box>
            <SwiperEn />
            <Suspense>{/* <Features /> */}</Suspense>
          </>
        ) : (
          <>
            <Banner />
            <Subscription />
          </>
        )}
        {/* <Divider /> */}
      </Box>
    </Page>
  );
};

export default WalletScreen;
