import { atom, selector, selectorFamily } from "recoil";
import { Product, ProductTypeEnum } from "types/store-menu";
import { currentStoreMenuState } from "./menu.state";
import { wait } from "utils/async";

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    const menu = get(currentStoreMenuState);
    let res =  menu.products.filter(
      (product) =>
        product.type === ProductTypeEnum.SINGLE ||
        product.type === ProductTypeEnum.PARENT
    );
    return res;
  },
});

export const childrenProductState = selector<Product[]>({
  key: "childProducts",
  get: async ({ get }) => {
    const menu = get(currentStoreMenuState);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});


export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = [...get(productsState)]; // Tạo bản sao của mảng products
    // Không cần filter lại vì productsState đã được filter
    // chỉ cần sắp xếp lại danh sách sản phẩm theo displayOrder
    const sortedProducts = products.sort((a, b) => b.displayOrder - a.displayOrder);
    return sortedProducts;
  },
});



export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter(
        (product) =>
          product.categoryId.includes(categoryId)
      );
    },
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});


export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

// export const storeProductsByCollectionIdState = selectorFamily({
//   key: "storeProductsByCollectionId",
//   get:
//     (collectionId: string) =>
//     async ({ get }) => {
//       const menu = get(currentStoreMenuState);
//       const productsByCollectionId = menu.products.filter(
//         (p) => p.collectionIds.includes(collectionId) && p.type === "PARENT"
//       );
//       return productsByCollectionId;
//     },
// });

// export const storeProductsByCategoryIdState = selectorFamily<Product[], string>(
//   {
//     key: "storeProductsByCategoryId",
//     get:
//       (categoryId: string) =>
//       async ({ get }) => {
//         const menu = get(currentStoreMenuState);
//         const result = menu.products.filter(
//           (p) =>
//             p.categoryId == categoryId &&
//             (p.type === ProductTypeEnum.SINGLE ||
//               p.type === ProductTypeEnum.PARENT)
//         );
//         return result;
//       },
//   }
// );

// export const isAddedProductState = atom({
//   key: "isAddedProductState",
//   default: false,
// });

// export const searchedProductsByKeywordState = selectorFamily<
//   Map<TStore, Product[]>,
//   string
// >({
//   key: "searchedProductsByKeyword",
//   get:
//     (keyword: string) =>
//     async ({ get }) => {
//       const stores = get(listStoreState);
//       // console.log(stores);
//       //nơi lưu trữ kết quả trả về
//       const res: Map<TStore, Product[]> = new Map();
//       stores.map((store) => {
//         let menu = get(storeMenuByInputIdState(store.id));
//         let products = menu.products.filter(
//           (p) =>
//             p.type == ProductTypeEnum.PARENT || p.type == ProductTypeEnum.SINGLE
//         );
//         let avaiProducts: Product[] = products.filter((product) =>
//           product.name
//             .trim()
//             .toLowerCase()
//             .includes(keyword.trim().toLowerCase())
//         );
//         if (avaiProducts.length >= 2) {
//           res.set(store, [avaiProducts[0], avaiProducts[1]]);
//         } else if (avaiProducts.length == 1) {
//           res.set(store, [avaiProducts[0]]);
//         }
//       });
//       return res;
//     },
// });

// export const currentStoreChildrenProductNoParamState = selector<Product[]>({
//   key: "currentStoreChildrenProduct",
//   get: async ({ get }) => {
//     const menu = get(currentStoreMenuState);
//     return menu.products.filter(
//       (product) => product.type === ProductTypeEnum.CHILD
//     );
//   },
// });

// export const currentStoreChildrenProductState = selectorFamily<
//   Product[],
//   string
// >({
//   key: "currentStoreChildrenProduct",
//   get:
//     (storeId: string) =>
//     async ({ get }) => {
//       if (storeId.length == 0) return [];
//       const menu = get(storeMenuByInputIdState(storeId));
//       return menu.products.filter(
//         (product) => product.type === ProductTypeEnum.CHILD
//       );
//     },
// });
