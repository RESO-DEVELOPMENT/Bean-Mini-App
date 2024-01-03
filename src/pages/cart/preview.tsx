import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, totalPriceState, totalQuantityState } from "state";
import { OrderType, PaymentType } from "types/order";
import pay, { clearCart } from "utils/product";
import { Box, Button, Text, useSnackbar } from "zmp-ui";

export const CartPreview: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const onCheckout = async () => {
    try {
      const res = await orderApi.createNewOrder(cart);
      console.log(res.data);
      let cartToClear = {
        ...cart,
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

      navigate("/");
    } catch (error) {
      console.log(error);
      snackbar.openSnackbar({
        type: "error",
        text: `đặt hàng thất bại `,
      });
    }
  };
  return (
    <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {cart.totalQuantity} sản phẩm
        </Text>
        <Text.Title size="large">
          <DisplayPrice>{cart.finalAmount}</DisplayPrice>
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={cart.totalQuantity == 0}
        fullWidth
        onClick={onCheckout}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
