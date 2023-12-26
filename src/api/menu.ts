import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { TMenu } from "types/store-menu";

const getMenu = (storeId: string, params?: any) =>
  requestWebAdmin.get<TMenu>(`users/stores/${storeId}/menu`, {
    params,
  });

const menuApi = {
  getMenu,
};

export default menuApi;
