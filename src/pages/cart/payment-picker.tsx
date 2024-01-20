import { ActionSheet } from "components/fullscreen-sheet";

import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  cartState,
  paymentTypeState,
  requestLocationTriesState,
  selectedStoreState,
} from "state";
import { showPaymentType } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";

export const PaymentPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const paymentList = useRecoilValueLoadable(paymentTypeState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [cart, setCart] = useRecoilState(cartState);
  return (
    <>
      {/* <ListItem
        onClick={() => {
          setVisible(true);
        }}
        title={showPaymentType(cart.paymentType)}
        subtitle={undefined}
      /> */}
      <Box
        flex
        className="space-x-2"
        onClick={() => {
          setVisible(true);
        }}
      >
        <Text size="xLarge" className="font-medium text-sm text-primary">
          {showPaymentType(cart.paymentType)}
        </Text>
        <Icon className="bottom-0.5" icon="zi-chevron-up" />
      </Box>
      {paymentList.state === "hasValue" &&
        createPortal(
          <ActionSheet
            title="Các phương thức thanh toán"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              paymentList.contents.map((e) => ({
                text: e.name,
                highLight: e.type === cart?.paymentType,
                onClick: () => {
                  setCart((prevCart) => {
                    let res = { ...prevCart };
                    res = {
                      ...prevCart,
                      paymentType: e.type,
                    };
                    return res;
                  });
                  setVisible(false);
                },
              })),
              [{ text: "Đóng", close: true, danger: true }],
            ]}
          ></ActionSheet>,
          document.body
        )}
    </>
  );
};
