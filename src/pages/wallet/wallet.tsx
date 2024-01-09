import { Divider } from "components/divider";
import { Banner } from "pages/index/banner";
import { Categories } from "pages/index/categories";
import { Subscription } from "pages/profile";
import React, { Suspense } from "react";
import { useRecoilValueLoadable } from "recoil";
import { memberState, phoneState, userState } from "state";
import { Box, Page } from "zmp-ui";
import { Features } from "./categories";
import { WelcomeUser } from "./hello";
import { WalletBalance } from "./wallet-balance";
const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <WelcomeUser />
      <Box className="flex-1 overflow-auto">
        {member.state === "hasValue" && member.contents !== null ? (
          <>
            <WalletBalance memberBalance={member.contents} />
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
