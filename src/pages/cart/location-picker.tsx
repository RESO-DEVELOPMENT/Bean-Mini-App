import { ActionSheet } from "components/fullscreen-sheet";
import { ListItem } from "components/list-item";

import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { cartState, selectedStoreState } from "state";
import { OrderType } from "types/order";

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const selectedStore = useRecoilValueLoadable(selectedStoreState);
  const [cart, setCart] = useRecoilState(cartState);
  const locations =
    selectedStore.contents.locationNearby != null
      ? selectedStore.contents.locationNearby
          .split("_")
          .map((item: string) => item.trim())
      : [];
  return (
    <>
      <ListItem
        onClick={() => {
          setVisible(true);
        }}
        title={cart?.deliveryAddress ?? "Nhận tại cửa hàng"}
        subtitle={"Địa chỉ nhận hàng"}
      />
      {selectedStore.state === "hasValue" &&
        createPortal(
          <ActionSheet
            title="Địa chỉ giao hàng có thể giao"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              locations.map((e) => ({
                text: e,
                highLight: e === cart?.deliveryAddress,
                onClick: () => {
                  setCart((prevCart) => {
                    let res = { ...prevCart };
                    res = {
                      ...prevCart,
                      orderType: OrderType.DELIVERY,
                      deliveryAddress: e,
                    };
                    return res;
                  });
                  setVisible(false);
                },
              })),
              [
                {
                  text: "Nhận tại cửa hàng",
                  highLight: cart?.deliveryAddress === undefined,
                  onClick: () => {
                    setCart((prevCart) => {
                      let res = { ...prevCart };
                      res = {
                        ...prevCart,
                        orderType: OrderType.TAKE_AWAY,
                        deliveryAddress: undefined,
                      };
                      return res;
                    });
                    setVisible(false);
                  },
                },
                { text: "Đóng", close: true, danger: true },
              ],
            ]}
          ></ActionSheet>,
          document.body
        )}
    </>
  );
};
