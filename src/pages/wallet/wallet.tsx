import { Divider } from "components/divider";
import { Banner } from "pages/index/banner";
import { Subscription } from "pages/profile";
import React, { Suspense } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { cartState, memberState } from "state";
import { Box, Page } from "zmp-ui";
import { Features } from "./categories";
import { WelcomeUser } from "./hello";
import { WalletBalance } from "./wallet-balance";
const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  const [cart, setCart] = useRecoilState(cartState);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <WelcomeUser />
      <Box className="flex-1 overflow-auto">
        {member.state === "hasValue" && member.contents !== null ? (
          <>
            <WalletBalance memberInfo={member.contents} />
            <Banner />
            <Suspense>
              <Features />
            </Suspense>
          </>
        ) : (
          <>
            <Banner />
            <Subscription />
          </>
        )}
        <Divider />
      </Box>
    </Page>
  );
};

export default WalletScreen;
