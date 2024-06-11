import orderApi from "api/order";
import { atom, selector } from "recoil";
import { Cart } from "types/cart";
import { OrderType, PaymentType } from "types/order";
import { memberState } from "./member.state";

export const prepareCartState = selector<Cart>({
  key: "prepareCart",
  get: async ({ get }) => {
    const cart = get(cartState);
    const membership = await get(memberState);
    console.log("memebr", membership);
    if (membership !== undefined && membership !== null) {
      let req = {
        ...cart,
        customerId: membership.membershipId,
        customerPhone: membership.phoneNumber,
        customerName: membership.fullname
      };
      var res = await orderApi.prepareOrder(req);
      return res.data;
    } else {
      var res = await orderApi.prepareOrder(cart);
      return res.data;
    }
  },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    storeId: "",
    orderType: OrderType.TAKE_AWAY,
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

// export const totalPriceState = selector({
//   key: "totalPrice",
//   get: ({ get }) => {
//     const cart = get(cartState);
//     return cart.productList.reduce(
//       (total, item) => total + item.totalAmount,
//       0
//     );
//   },
// });
