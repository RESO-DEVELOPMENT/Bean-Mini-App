import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil";
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
import orderApi from "api/order";
import zaloApi from "api/zalo-api";
import userApi from "api/user";
import axios from "utils/axios";

export const accessTokenState = selector({
  key: "accessToken",
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

export const phoneTokenState = selector({
  key: "phoneToken",
  get: () =>
    getPhoneNumber({
      success: async (data) => {
        console.log(data);
        if (data.token !== undefined) {
          return data.token;
        } else {
          return null;
        }
      },
      fail: (error) => {
        // Xử lý khi gọi api thất bại
        console.log(error);
        return null;
      },
    }),
});

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const memberState = selector({
  key: "member",
  get: ({ get }) => {
    const user = get(userState);
    const phone = get(phoneState);
    if (phone !== undefined) {
      userApi.userLogin(phone, user.name).then((value) => {
        console.log("user", value.data.userInfo);

        return value.data.userInfo;
      });
    }
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

export const prepareCartState = selector({
  key: "preopareCart",
  get: async ({ get }) => {
    const cart = get(cartState);
    var res = await orderApi.prepareOrder(cart);
    console.log("prepare cart", res);
    return res.data;
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
    return products
      .filter(
        (product) => product.type === "SINGLE" || product.type === "PARENT"
      )
      .sort((a, b) => b.displayOrder - a.displayOrder);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], string>({
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
    totalQuantity: 0,
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
    return stores;
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
      const accessToken = await getAccessToken();
      const { latitude, longitude, token } = await getLocation({
        success: async (data) => {
          let { token } = data;
          console.log("token", token);
          if (token !== undefined) {
            console.log("accessToken", accessToken);
            await zaloApi.getUserLocation(token, accessToken).then((value) => {
              console.log("location", value.data.data);
              return {
                latitude: value.data.data.latitude,
                longitude: value.data.data.longitude,
              };
            });
          }
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

export const phoneState = selector<string | undefined>({
  key: "phone",
  get: async ({ get }) => {
    const accessToken = await getAccessToken();
    let phone = "0337076898";
    if (true) {
      const { token } = await getPhoneNumber({ fail: console.warn });
      if (token !== undefined) {
        console.log("token", token);
        console.log("accessToken", accessToken);
        await zaloApi.getUserPhone(token, accessToken).then((value) => {
          console.log("phone", value.data.data.number);
          phone = value.data.data.number.replace(/^\84/, "0");
        });
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

      return phone;
    }
    return;
  },
});
