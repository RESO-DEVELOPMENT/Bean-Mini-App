import { createOrder } from "zmp-sdk";
import { Option } from "types/product";
import { getConfig } from "./config";
import { Cart, SelectedOptions } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { ProductList } from "pages/index/product-list";
import { useRecoilState } from "recoil";
import { cartState } from "state";
import { OrderType, PaymentType } from "types/order";
import orderApi from "api/order";

export function calcFinalPrice(product: Product) {
  let finalPrice = product.sellingPrice;

  return finalPrice;
}

export function getDummyImage(filename: string) {
  return `https://zalo-miniapp.github.io/zaui-coffee/dummy/${filename}`;
}

export function isIdentical(
  option1: SelectedOptions,
  option2: SelectedOptions
) {
  const option1Keys = Object.keys(option1);
  const option2Keys = Object.keys(option2);

  if (option1Keys.length !== option2Keys.length) {
    return false;
  }

  for (const key of option1Keys) {
    const option1Value = option1[key];
    const option2Value = option2[key];

    const areEqual =
      Array.isArray(option1Value) &&
      Array.isArray(option2Value) &&
      [...option1Value].sort().toString() ===
        [...option2Value].sort().toString();

    if (option1Value !== option2Value && !areEqual) {
      return false;
    }
  }

  return true;
}

const pay = (amount: number, description?: string) =>
  createOrder({
    desc:
      description ??
      `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: amount,
    success: (data) => {
      console.log("Payment success: ", data);
    },
    fail: (err) => {
      console.log("Payment error: ", err);
    },
  });

export function countCartAmount(cart: Cart) {
  cart.totalAmount = 0;
  cart.discountAmount = 0;
  cart.productList.map((item) => {
    cart.totalAmount += item.totalAmount;
    cart.totalQuantity += item.quantity;
  });
  cart.finalAmount = cart.totalAmount - cart.discountAmount!;
  return cart;
}
export function clearCart() {
  const [cart, setCart] = useRecoilState(cartState);

  let res = {
    ...cart,
    orderType: OrderType.EATIN,
    paymentType: PaymentType.CASH,
    productList: [],
    totalAmount: 0,
    shippingFee: 0,
    bonusPoint: 0,
    discountAmount: 0,
    finalAmount: 0,
    promotionList: [],
  };
  console.log("clear cart", res);
  setCart(res);
}
export async function prepareOrder() {
  const [cart, setCart] = useRecoilState(cartState);
  var res = await orderApi.prepareOrder(cart);
  console.log("prepare cart", res);
  setCart(res.data);
}

export default pay;

export function showPaymentType(paymentType: string) {
  switch (paymentType) {
    case PaymentType.CASH:
      return "Tiền mặt";

    case PaymentType.BANKING:
      return "Ngân hàng";
    case PaymentType.POINTIFY:
      return "Pointify";
    default:
      return "Tiền mặt";
  }
}
