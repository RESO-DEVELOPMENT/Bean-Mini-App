import React, { FC, Suspense } from "react";
import { Box, Header, Icon, Text } from "zmp-ui";
import {
  useRecoilValueLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  nearbyStoresState,
  selectedStoreIndexState,
  selectedStoreState,
} from "state";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";
import {
  RequestStorePickerLocation,
  StorePicker,
} from "pages/cart/store-picker";

export const Welcome: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="baseline" className="space-x-2">
            <Icon icon="zi-location" className="my-auto" />
            <Suspense fallback={<RequestStorePickerLocation />}>
              <StorePicker />
            </Suspense>
          </Box>
        ) as unknown as string
      }
    />
  );
};
