import orderApi from "api/order";
import { memberState } from "./user.state";
import { selector } from "recoil";
import { requestOrderTransactionTriesState } from "./order.state";

export const listTransactionState = selector({
  key: "listTransaction",
  get: async ({ get }) => {
    const request = get(requestOrderTransactionTriesState);
    if (request) {
      const member = get(memberState);
      const listOrder = await orderApi.getListTransactions(
        member?.membershipId || "",
        {
          page: 1,
          size: 100,
        }
      );
      return listOrder.data.items;
    }
    return [];
  },
});
