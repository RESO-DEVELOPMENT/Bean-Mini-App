import orderApi from "api/order";
import { atom, selector } from "recoil";
import { Cart } from "types/cart";
import { OrderType, PaymentType } from "types/order";

export const prepareCartState = selector<Cart>({
  key: "prepareCart",
  get: async ({ get }) => {
    const cart = get(cartState);
    var res = await orderApi.prepareOrder(cart);
    return res.data;
  },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    storeId: "",
    orderType: OrderType.EATIN,
    paymentType: PaymentType.CASH,
    productList: [],
    totalAmount: 0,
    shippingFee: 0,
    bonusPoint: 0,
    discountAmount: 0,
    finalAmount: 0,
    totalQuantity: 0,
    customerId: null,
    promotionList: [],
    promotionCode: null,
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.productList.reduce(
      (total, item) => total + item.totalAmount,
      0
    );
  },
});
