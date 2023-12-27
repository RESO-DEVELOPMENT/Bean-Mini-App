import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import {
  Category,
  CategoryType,
  Product,
  ProductTypeEnum,
} from "types/store-menu";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { TStore } from "types/store";
import { wait } from "utils/async";
import storeApi from "api/store";
import menuApi from "api/menu";
import blogApi from "api/blog";
import { CategoryId } from "types/category";

import { getAccessToken } from "zmp-sdk/apis";
import { OrderType, PaymentType } from "types/order";

export const accessTokenState = selector({
  key: "token",
  get: () =>
    getAccessToken({
      success: (accessToken) => {
        return accessToken;
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    }),
});

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
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

export const listBlogState = selector({
  key: "listBlog",
  get: async () => {
    const listBlog = await blogApi.getListBlog({
      page: 1,
      size: 10,
      brandCode: "BEANAPP",
    });
    return listBlog.data.items;
  },
});

export const storeMenuState = selector({
  key: "storeMenu",
  get: async ({ get }) => {
    const currentStore = get(selectedStoreState);
    if (currentStore === null || currentStore === undefined) {
      const store = get(listStoreState);
      const menu = await menuApi.getMenu(store[0].id);
      return menu.data;
    } else {
      const menu = await menuApi.getMenu(currentStore.id);
      return menu.data;
    }
  },
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: async ({ get }) => {
    const menu = get(storeMenuState);
    return menu.categories.filter((cate) => cate.type === CategoryType.NORMAL);
  },
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    const menu = get(storeMenuState);
    return menu.products.filter(
      (product) =>
        product.type === ProductTypeEnum.SINGLE ||
        product.type === ProductTypeEnum.PARENT
    );
  },
});

export const childrenProductState = selector<Product[]>({
  key: "childProducts",
  get: async ({ get }) => {
    const menu = get(storeMenuState);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter(
      (product) => product.type === "SINGLE" || product.type === "PARENT"
    );
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], CategoryId>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter(
        (product) =>
          product.categoryId.includes(categoryId) &&
          (product.type === "SINGLE" || product.type === "PARENT")
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    storeId: "",
    orderType: OrderType.EATIN,
    paymentType: PaymentType.CASH,
    productList: [],
    totalAmount: 0,
    shippingFee: 0,
    bonusPoint: 0,
    discountAmount: 0,
    finalAmount: 0,
    promotionList: [],
  },
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.productList.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.productList.reduce(
      (total, item) => total + item.totalAmount,
      0
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
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

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(listStoreState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store: TStore) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(listStoreState);
    const setCart = get(cartState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        success: async (data) => {
          let { token } = data;
        },
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});
