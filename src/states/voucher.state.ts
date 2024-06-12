import { selector } from "recoil";
import { voucherGroupApi } from "api/vouchergroup";


export const listVoucherForSaleState = selector({
  key: "listVoucherForSale",
  get: async ({ get }) => {
    const listOrder = await voucherGroupApi.getVouchersForSale();
    // console.log("voucher group", listOrder.data)
    return listOrder.data;
  },
});