import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { cartState, prepareCartState } from "state";
import { ProductList } from "types/cart";
import { showPaymentType } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";

export const PaymentInfo: FC = () => {
  const cart = useRecoilValue(cartState);

  return (
    <Box className="space-y-3 px-4 mb-2">
      <Text.Header>Thông tin thanh toán</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Text size="small">Tạm tính</Text>,
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[2px]"></Box>
                <Text size="small">
                  <DisplayPrice>{cart.finalAmount}</DisplayPrice>
                </Text>
              </Box>
            ),
          },
          {
            left: (
              <Box className="flex-1 space-y-[1px]">
                <Text size="small">Giảm giá</Text>
              </Box>
            ),
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[1px]"></Box>
                <Text size="small">
                  <DisplayPrice>{cart.discountAmount}</DisplayPrice>
                </Text>
              </Box>
            ),
          },
          {
            left: <Text size="small">Thanh toán</Text>,
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[1px]"></Box>
                <Text size="small">{showPaymentType(cart.paymentType)}</Text>
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
