import React, { FC, Suspense } from "react";
import { Box, Header, Icon } from "zmp-ui";
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
          <Box flex alignItems="baseline" className="space-x-1">
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
