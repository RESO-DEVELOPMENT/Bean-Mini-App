import { Banner } from "pages/index/banner";
import { Subscription } from "pages/profile";
import { SwiperEn } from "pages/swiper-entertainment";
import { SwiperItem } from "pages/swiper-items";
import React, { useEffect } from "react";
import {
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { memberState, selectedStoreIndexState } from "state";
import { getStorage } from "zmp-sdk";
import { Box, Page, Text } from "zmp-ui";
import { WelcomeUser } from "./hello";
const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  const setStoreIdx = useSetRecoilState(selectedStoreIndexState);
  const flexContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  useEffect(() => {
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
  }, []);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box className="flex-1 overflow-auto">
        {member.state === "hasValue" && member.contents !== null ? (
          <>
            <WelcomeUser memberInfo={member.contents} />

            <Banner />

            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              <Text.Title size="normal">Dịch vụ</Text.Title>
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
            <Box className="h-24" />
            <Subscription />
            <SwiperItem />
            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              <Text.Title size="normal">Chương trình</Text.Title>
            </Box>
            <SwiperEn />
          </>
        )}
      </Box>
    </Page>
  );
};

export default WalletScreen;
