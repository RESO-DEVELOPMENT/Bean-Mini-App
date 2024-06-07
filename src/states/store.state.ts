import menuApi from "api/menu";
import storeApi from "api/store";
import { atom, selector, selectorFamily } from "recoil";

import { TStore } from "types/store";

export const selectedStoreObjState = atom<TStore>({
  key: "selectedStoreObj",
  default: {
    id: "",
    brandId: "",
    name: "",
    shortName: "",
    code: "",
    email: "",
    address: "",
    status: "",
    wifiName: "",
    wifiPassword: "",
    lat: "",
    long: "",
    locationNearby: "",
    distance: 0,
  },
});

export const selectedStoreIdState = atom<string>({
  key: "selectedStoreId",
  default: "",
});

// export const selectedStoreNameState = atom<string>({
//   key: "selectedStoreName",
//   default: "Tên Quán",
// });

// export const selectedStoreIndexState = atom<number>({
//   key: "selectedStoreIndex",
//   default: 0,
// });
// export const selectLocationState = atom<string>({
//   key: "selectLocationState",
//   default: "",
// });

export const selectedStoreState = selector({
  key: "selectedStore",
  get: async ({ get}) => {
    const stores = get(listStoreState);
    const storeObj = get(selectedStoreObjState);
    var result;
    if(storeObj.id !== "" || storeObj.id !== null)
         result = stores.filter((s) => s.id === storeObj.id)[0] || stores[0];
    return result;
  },
});

export const listStoreState = selector({
  key: "listStore",
  get: async () => {
    const listStore = await storeApi.getListStore({
      page: 1,
      size: 10,
      brandCode: "BEANAPP",
    });
    return listStore.data.items;
  },
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    const stores = get(listStoreState);
    return stores;
  },
});

// export const selectedStoreByIdState = selector({
//   key: "selectedStoreById",
//   get: async ({ get }) => {
//     const id = get(selectedStoreIdState);
//     const stores = get(listStoreState);
//     return stores.filter((s) => s.id === id)[0];
//   },
// });

export const storeMenuByInputIdState = selectorFamily({
  key: "storeMenuByInputId",
  get:
    (storeId: string) =>
    async () => {
      const menu = await menuApi.getMenu(storeId);
      return menu.data;
    },
});

// export const storeIdsByCategoryState = selector({
//   key: "storeIdsByCategory",
//   get: async ({ get }) => {
//     const categoryId = get(selectedCategoryIdState);

//     const stores = get(listStoreState);

//     const res = stores.map((store) => {
//       const menu = get(storeMenuByInputIdState(store.id));
//       return menu.categories.some((c) => c.id === categoryId) ? store : null;
//     });
//     const filteredRes = res.filter((store) => store !== null);
//     return filteredRes;
//   },
// });

// export const storeCollectionsByIdState = selector({
//   key: "storeCollectionsById",
//   get: async ({ get }) => {
//     const menu = get(currentStoreMenuState);
//     return menu.collections;
//   },
// });

// export const selectedStoreCategoriesState = selector({
//   key: "selectedStoreCategories",
//   get: async ({ get }) => {
//     const menu = get(currentStoreMenuState);
//     return menu.categories;
//   },
// });
