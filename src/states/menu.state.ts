import menuApi from "api/menu";
import { selector } from "recoil";
import { listStoreState, selectedStoreIdState } from "./store.state";

export const menuByStoreState = selector({
  key: "menuByStore",
  get: async ({ get }) => {
    const currentStore = get(selectedStoreIdState);
    if (currentStore === null || currentStore === undefined) {
      const store = get(listStoreState);
      const menu = await menuApi.getMenu(store[0].id);
      return menu.data;
    } else {
      const menu = await menuApi.getMenu(get(selectedStoreIdState));
      return menu.data;
    }
  },
});

export const currentStoreMenuState = selector({
  key: "currentStoreMenu",
  get: async ({ get }) => {
    const currentStore = get(selectedStoreIdState);
    if (currentStore === null || currentStore === undefined) {
      const store = get(listStoreState);
      const menu = await menuApi.getMenu(store[0].id);
      return menu.data;
    } else {
      const menu = await menuApi.getMenu(currentStore);
      console.log(menu.data);
      return menu.data;
    }
  },
});
