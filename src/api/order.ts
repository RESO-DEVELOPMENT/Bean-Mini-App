import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Cart } from "types/cart";

const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TStore>>(`brands/stores`, {
    params,
  });

const createNewOrder = (cart: Cart) =>
  requestWebAdmin.post("/users/order", cart);

const prepareOrder = (cart: Cart) =>
  requestWebAdmin.post<Cart>("/orders/prepare", cart);
const orderApi = {
  getListStore,
  createNewOrder,
  prepareOrder,
};

export default orderApi;
