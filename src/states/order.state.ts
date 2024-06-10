import orderApi from "api/order";
import { atom, selector, selectorFamily } from "recoil";
import { memberState } from "./member.state";
import { OrderDetails, PaymentType } from "types/order";
import { Payment } from "types/payment";

export const requestOrderTransactionTriesState = atom({
  key: "requestOrderTransactionTries",
  default: 0,
});

export const listOrderState = selector({
  key: "listOrder",
  get: async ({ get }) => {
    const request = get(requestOrderTransactionTriesState);
    if (request) {
      const member = get(memberState);
      if (member !== null) {
        const listOrder = await orderApi.getListOrder(member?.membershipId ?? "", {
          page: 1,
          size: 100,
        });
        return listOrder.data.items;
      }
    }
    return [];
  },
});

export const getOrderDetailstate = selectorFamily<OrderDetails, string>({
  key: "orderDetails",
  get: (orderId) => async () => {
    const order = await orderApi.getOrderDetails(orderId);
    return order.data;
  },
});

export const paymentTypeState = atom<Payment[]>({
  key: "paymentType",
  default: [
    // {
    //   type: PaymentType.POINTIFY,
    //   name: "Điểm Bean",
    // },
    {
      type: PaymentType.CASH,
      name: "Tiền mặt",
    },
  ],
});

// export const selectLocationState = atom<string>({
//   key: "selectLocationState",
//   default: "",
// });

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

// export const addressState = atom({
//   key: "address",
//   default: "",
// });