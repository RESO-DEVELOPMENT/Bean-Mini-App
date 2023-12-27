import { Divider } from "components/divider";
import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import HomePage from "./index";
import { Banner } from "./index/banner";
import { Categories } from "./index/categories";
import { Inquiry } from "./index/inquiry";
import { ProductList } from "./index/product-list";
import { Recommend } from "./index/recommend";

const WalletScreen: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box className="flex-1 overflow-auto">
        <Banner />
      </Box>
    </Page>
  );
};

export default WalletScreen;
