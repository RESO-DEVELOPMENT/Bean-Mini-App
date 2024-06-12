import { selector } from "recoil";
import { memberState } from "./member.state";
import userApi from "api/user";


export const listPromotionState = selector({
  key: "listPromotion",
  get: async ({ get }) => {
    const member = get(memberState);
    const listOrder = await userApi.getListPromotion(member?.membershipId ?? "", {
      brandCode: "BeanApp",
    });
    // console.log("promotion", listOrder.data)
    return listOrder.data;
  },
});



