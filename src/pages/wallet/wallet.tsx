import { Divider } from "components/divider";
import { Banner } from "pages/index/banner";
import { Subscription } from "pages/profile";
import { SwiperAd } from "pages/swiper-ads";
import { SwiperEn } from "pages/swiper-entertainment";
import { SwiperItem } from "pages/swiper-items";
import React, { Suspense, useEffect } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { memberState, selectedStoreIndexState } from "state";
import { getStorage } from "zmp-sdk";
import { Box, Page, Text } from "zmp-ui";
import { Features } from "./categories";
import { WelcomeUser } from "./hello";
import { WalletBalance } from "./wallet-balance";
const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  const setStoreIdx = useSetRecoilState(selectedStoreIndexState);
  const flexContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  useEffect(
    () => {
      getStorage({
        keys: ["storeIndex"],
        success: (data) => {
          const { storeIndex } = data;
          console.log("store index", storeIndex);
          setStoreIdx(storeIndex ?? 0);
        },
        fail: (error) => {
          setStoreIdx(0);
          console.log(error);
        },
      });
    },
    //eslint-disable-next-line
    []
  );

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box className="flex-1 overflow-auto">
        {member.state === "hasValue" && member.contents !== null ? (
          <>
            <WelcomeUser memberInfo={member.contents} />
            {/* <WalletBalance memberInfo={member.contents} /> */}
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
            </Box>
            <SwiperEn />
          </>
        ) : (
          <>
            <Banner />
            <Subscription />
            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              <Text.Title size="normal">Chương trình</Text.Title>
              {/* <Text.Title size="normal">Tất cả</Text.Title> */}
            </Box>
            <SwiperEn />
          </>
        )}
        {/* <Divider /> */}
      </Box>
    </Page>
  );
};

export default WalletScreen;
