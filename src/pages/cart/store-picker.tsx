import { ActionSheet } from "components/fullscreen-sheet";
import { ListItem } from "components/list-item";
import React, { FC, useState, useEffect } from "react";
import {
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  selectedStoreObjState,
  selectedStoreState,
} from "states/store.state";
import { nearbyStoresState } from "states/store.state";
import { cartState } from "states/cart.state";
import { OrderType, PaymentType } from "types/order";
import { TStore } from "types/store";
import { displayDistance } from "utils/location";
import { useSnackbar } from "zmp-ui";

export const StorePicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const nearbyStores = useRecoilValue(nearbyStoresState)
  const setStoreObj = useSetRecoilState(selectedStoreObjState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const setCart = useSetRecoilState(cartState);
  const snackbar = useSnackbar();
  useEffect(
    () => {
      setCart((prevCart) => {
        let res = { ...prevCart };
        res = {
          ...prevCart,
          storeId: selectedStore?.id,
        };
        return res;
      });

    },
    [selectedStore]
  );
  return (
    <>
      <ListItem
        onClick={() => {
          setVisible(true);
          snackbar.openSnackbar({
            duration: 3000,
            position: "top",
            type: "warning",

            text: "Khi đổi cửa hàng, các sản phẩm từ cửa hàng cũ sẽ bị xoá",
          });
        }}
        title={selectedStore.name || ""}
        subtitle={selectedStore.address || ""}
      />

        createPortal(
          <ActionSheet
            title="Các cửa hàng ở gần bạn"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              nearbyStores.map(
                (store: TStore & { distance?: number }, i) => ({
                  text: store.distance
                    ? `${store.name} - ${displayDistance(store.distance)}`
                    : store.name,
                  highLight: store.id === selectedStore?.id,
                  onClick: () => {
                    setStoreObj(store);
                    setCart((prevCart) => {
                      let res = { ...prevCart };
                      res = {
                        ...prevCart,
                        productList: [],
                        orderType: OrderType.EATIN,
                        paymentType: PaymentType.CASH,
                        totalAmount: 0,
                        shippingFee: 0,
                        bonusPoint: 0,
                        discountAmount: 0,
                        finalAmount: 0,
                        promotionList: [],
                        totalQuantity: 0,
                      };

                      return res;
                    });
                    setVisible(false);
                  },
                })
              ),
              [{ text: "Đóng", close: true, danger: true }],
            ]}
          ></ActionSheet>,
          document.body
        )
    </>
  );
};

export const RequestStorePickerLocation: FC = () => {
  return (
    <ListItem
      onClick={() => {}}
      title="Chọn cửa hàng"
      subtitle="Yêu cầu truy cập vị trí"
    />
  );
};
