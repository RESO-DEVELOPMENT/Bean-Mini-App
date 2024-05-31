import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Subscription } from "pages/profile";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  selectedStoreState,
} from "states/store.state";
import {
  memberState,
} from "states/member.state";
import { OrderType, PaymentType } from "types/order";
import { getConfig } from "utils/config";
import { Payment } from "zmp-sdk";
import { Box, Button, Icon, Text, useSnackbar } from "zmp-ui";
import { PaymentPicker } from "./payment-picker";
import { cartState, prepareCartState } from "states/cart.state";

export const CartPreview: FC = () => {
  const setCart = useSetRecoilState(cartState);
  const cartPrepare = useRecoilValueLoadable(prepareCartState);
  const member = useRecoilValueLoadable(memberState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  console.log("cartPrepare", cartPrepare.contents);
  const onCheckout = async () => {
    const body = { ...cartPrepare.contents };
    const paymentMethod = cartPrepare.contents.paymentType == PaymentType.CASH ? "COD" : "POINTIFY";
    await Payment.createOrder({
      desc: `Thanh toán cho ${getConfig((config) => config.app.title)}`,
      item: [],
      method: paymentMethod,
      extradata: cartPrepare.contents.storeId,
      amount: cartPrepare.contents.finalAmount,
      success: async (data) => {
        await orderApi.createNewOrder(body).then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            snackbar.openSnackbar({
              duration: 2000,
              type: "success",
              text: "Đặt hàng thành công",
            });
            setCart((prevCart) => {
              let res = { ...prevCart };
              res = {
                ...prevCart,
                orderType: OrderType.TAKE_AWAY,
                productList: [],
                totalAmount: 0,
                shippingFee: 0,
                bonusPoint: 0,
                discountAmount: 0,
                totalQuantity: 0,
                promotionList: [],
                promotionCode: null,
              };
              return res;
            });
            navigate("/order-detail", {
              state: { id: res.data },
            });
          } else {
            console.log(" log eror", res);
            snackbar.openSnackbar({
              duration: 3000,
              type: "error",
              text: "Thất bại, " + res.data.Error,
            });
          }
        })
      },
      fail: (err) => {
        console.log("Payment error: ", err);
        snackbar.openSnackbar({
          duration: 3000,
          type: "error",
          text: "Thất bại, " + err.detail.Error,
        });
      },
    });
  };

  return (
    <Box
      flex
      flexDirection="column"
      className="sticky bottom-0 bg-background p-4 space-4"
    >
      {member.state === "hasValue" && member.contents !== null ? (
        <>
          <Box
            flex
            flexDirection="row"
            justifyContent="space-around"
            className=" flex-none mb-2 mx-2"
          >
            <Box
              flex
              className="space-x-2"
              onClick={() => navigate("/voucher")}
            >
              <Text size="xxSmall" className="text-primary">
                {cartPrepare.state === "hasValue" &&
                  cartPrepare.contents !== null &&
                  cartPrepare.contents.promotionCode !== null
                  ? cartPrepare.contents.promotionCode
                  : "KHUYẾN MÃI"}
              </Text>
            </Box>

            <Text.Title
              className="text-gray text-transform: uppercase;"
              size="small"
            >
              <PaymentPicker />
            </Text.Title>
          </Box>
          <Button
            type="highlight"
            disabled={
              cartPrepare.state === "hasValue" && cartPrepare.contents !== null
                ? cartPrepare.contents.productList.length > 0
                  ? false
                  : true
                : true
            }
            fullWidth
            onClick={onCheckout}
          >
            Đặt hàng
          </Button>
        </>
      ) : (
        <Subscription />
      )}
    </Box>
  );
};
