import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { cartState, prepareCartState } from "state";
import { OrderType, PaymentType } from "types/order";
import { showPaymentType } from "utils/product";
import { Box, Button, Text, useSnackbar } from "zmp-ui";

export const CartPreview: FC = () => {
  const [cart, setCart] = useRecoilStateLoadable(cartState);
  const cartPrepare = useRecoilValueLoadable(prepareCartState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  console.log("cartPrepare", cartPrepare.contents);
  const onCheckout = async () => {
    try {
      const res = await orderApi.createNewOrder(cartPrepare.contents);
      console.log(res.data);
      let cartToClear = {
        ...cart,
        storeId: cart.contents.storeId,
        orderType: OrderType.EATIN,
        paymentType: PaymentType.CASH,
        productList: [],
        totalAmount: 0,
        shippingFee: 0,
        bonusPoint: 0,
        discountAmount: 0,
        finalAmount: 0,
        promotionList: [],
        totalQuantity: 0,
      };
      setCart(cartToClear);
      console.log("clear cart", res);
      snackbar.openSnackbar({
        type: "success",
        text: "đặt hàng thành công",
      });
      navigate("/order-detail", { state: { id: res.data } });
    } catch (error) {
      console.log(error);
      snackbar.openSnackbar({
        type: "error",
        text: `đặt hàng thất bại `,
      });
    }
  };
  return (
    <Box
      flex
      flexDirection="column"
      className="sticky bottom-0 bg-background p-4 space-4"
    >
      <Box
        flex
        flexDirection="row"
        justifyContent="space-between"
        className=" flex-none mb-3 mx-4"
      >
        <Text.Title
          className="text-gray text-transform: uppercase;"
          size="small"
        >
          {cartPrepare.state === "hasValue" && cartPrepare.contents !== null
            ? showPaymentType(cartPrepare.contents.paymentType)
            : "TIỀN MẶT"}
        </Text.Title>
        <Text.Title
          onClick={() => navigate("/voucher")}
          className="text-primary"
          size="small"
        >
          {cartPrepare.state === "hasValue" &&
          cartPrepare.contents !== null &&
          cartPrepare.contents.promotionCode !== null
            ? cartPrepare.contents.promotionCode
            : "KHUYẾN MÃI"}
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={
          cartPrepare.state === "hasValue" && cart.contents !== null
            ? cartPrepare.contents.totalQuantity == 0
            : true
        }
        fullWidth
        onClick={onCheckout}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
