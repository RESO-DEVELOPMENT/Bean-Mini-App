import menuApi from "api/menu";
import { selector } from "recoil";
import { listStoreState, selectedStoreObjState } from "./store.state";

export const currentStoreMenuState = selector({
  key: "menuByStore",
  get: async ({ get }) => {
    const currentStore = get(selectedStoreObjState);
    // console.log("cua hang hien tai", currentStore)
    if (currentStore === null || currentStore === undefined || currentStore.id === "") {
      const store = get(listStoreState);
      const menu = await menuApi.getMenu(store[0].id);
      return menu.data;
    } else {
      console.log("goi api ne");
      const menu = await menuApi.getMenu(currentStore.id);
      console.log(menu)
      return menu.data;
    }
  },
});

// export const currentStoreMenuState = selector({
//   key: "currentStoreMenu",
//   get: async ({ get }) => {
//     const currentStore = get(selectedStoreIdState);
//     if (currentStore === null || currentStore === undefined) {
//       const store = get(listStoreState);
//       const menu = await menuApi.getMenu(store[0].id);
//       return menu.data;
//     } else {
//       const menu = await menuApi.getMenu(currentStore);
//       console.log(menu.data);
//       return menu.data;
//     }
//   },
// });

// export const storeMenuState = selector({
//   key: "storeMenu",
//   get: async ({ get }) => {
//     const currentStore = get(selectedStoreState);
//     if (currentStore === null || currentStore === undefined) {
//       const store = get(listStoreState);
//       const menu = await menuApi.getMenu(store[0].id);
//       return menu.data;
//     } else {
//       const menu = await menuApi.getMenu(currentStore.id);
//       return menu.data;
//     }
//   },
// });