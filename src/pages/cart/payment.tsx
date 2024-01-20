import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { cartState, prepareCartState } from "state";
import { prepareCart, showPaymentType } from "utils/product";
import { Box, Text } from "zmp-ui";

export const PaymentInfo: FC = () => {
  const cartPrepare = useRecoilValueLoadable(prepareCartState);
  return (
    <Box className="space-y-3 px-4 mb-2">
      <Text.Header>Thông tin thanh toán</Text.Header>
      <ListRenderer
        noDivider
        items={[
          {
            left: <Text size="small">Tạm tính</Text>,
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[2px]"></Box>
                <Text size="small">
                  <DisplayPrice>
                    {cartPrepare.state == "hasValue" &&
                    cartPrepare.contents !== null
                      ? cartPrepare.contents.totalAmount
                      : 0}
                  </DisplayPrice>
                </Text>
              </Box>
            ),
          },
          {
            left: (
              <Box className="flex-1 space-y-[1px]">
                {cartPrepare.state == "hasValue" &&
                cartPrepare.contents !== null
                  ? cartPrepare.contents.promotionList!.map((p) => (
                      <Text size="xxSmall">{p.name}</Text>
                    ))
                  : ""}
              </Box>
            ),
            right:
              cartPrepare.state == "hasValue" &&
              cartPrepare.contents !== null ? (
                cartPrepare.contents.promotionList!.map((p) =>
                  p.effectType == "setDiscount" ? (
                    <Box flex className="space-x-1">
                      <Box className="flex-1 space-y-[2px]"></Box>
                      <Text size="xxSmall">
                        -<DisplayPrice>{p.discountAmount}</DisplayPrice>
                      </Text>
                    </Box>
                  ) : (
                    <Box flex className="space-x-1">
                      <Box className="flex-1 space-y-[2px]"></Box>
                      <Text size="xxSmall">+{p.discountAmount}</Text>
                    </Box>
                  )
                )
              ) : (
                <Box />
              ),
          },
          {
            left: (
              <Box className="flex-1 space-y-[1px]">
                <Text.Title size="small">Thanh toán</Text.Title>
              </Box>
            ),
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[1px]"></Box>
                <Text.Title size="small">
                  <DisplayPrice>
                    {cartPrepare.state == "hasValue" &&
                    cartPrepare.contents !== null
                      ? cartPrepare.contents.finalAmount
                      : 0}
                  </DisplayPrice>
                </Text.Title>
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
