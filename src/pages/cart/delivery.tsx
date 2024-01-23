import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense } from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useSetRecoilState,
} from "recoil";
import { cartState } from "state";
import { Cart } from "types/cart";
import { Box, Icon, Text } from "zmp-ui";
import { RequestStorePickerLocation, StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";

export const Delivery: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return (
    <Box className="space-y-2 px-4">
      <Text.Header>Hình thức nhận hàng</Text.Header>

      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-location" className="my-auto" />,
            right: (
              <Suspense fallback={<RequestStorePickerLocation />}>
                <StorePicker />
              </Suspense>
            ),
          },
          {
            left: <Icon icon="zi-clock-1" className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-[2px]">
                  <TimePicker />
                  <Text size="xSmall" className="text-gray">
                    Thời gian nhận hàng
                  </Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  onChange={(e) =>
                    setCart((prevCart) => {
                      let res = { ...prevCart };
                      res = {
                        ...prevCart,
                        deliveryAddress: e.currentTarget.value,
                      };
                      return res;
                    })
                  }
                  placeholder="Nhận món tại"
                  className="border-none px-0 w-full focus:outline-none"
                  maxRows={4}
                />
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};
