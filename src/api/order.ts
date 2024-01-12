import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Cart } from "types/cart";
import { OrderPreview } from "types/order";
import { Transaction } from "types/transaction";

const getListOrder = (id: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<OrderPreview>>(`users/${id}/orders`, {
    params,
  });
const getListTransactions = (id: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<Transaction>>(`users/${id}/transactions`, {
    params,
  });
const createNewOrder = (cart: Cart) =>
  requestWebAdmin.post("/users/order", cart);

const prepareOrder = (cart: Cart) =>
  requestWebAdmin.post<Cart>("/orders/prepare", cart);
const orderApi = {
  getListOrder,
  getListTransactions,
  createNewOrder,
  prepareOrder,
};

export default orderApi;
