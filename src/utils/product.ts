import { createOrder } from "zmp-sdk";
import { Option } from "types/product";
import { getConfig } from "./config";
import { Cart } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { ProductList } from "pages/index/product-list";
import { useRecoilState } from "recoil";
import { OrderStatus, OrderType, PaymentType } from "types/order";
import orderApi from "api/order";
import { val, value } from "zmp-dom";

export function calcFinalPrice(product: Product) {
  let finalPrice = product.sellingPrice;

  return finalPrice;
}

export function getDummyImage(filename: string) {
  return `https://zalo-miniapp.github.io/zaui-coffee/dummy/${filename}`;
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

export function prepareCart(cart: Cart) {
  cart.totalAmount = 0;
  cart.discountAmount = 0;
  cart.totalQuantity = 0;
  cart.productList.map((item) => {
    cart.totalAmount += item.totalAmount;
    cart.totalQuantity += item.quantity;
  });
  cart.finalAmount = cart.totalAmount - cart.discountAmount!;
  // orderApi.prepareOrder(cart).then((value) => {
  //   return value.data;
  // });
  return cart;
}

export default pay;

export function showPaymentType(paymentType: string) {
  switch (paymentType) {
    case PaymentType.CASH:
      return "TIỀN MẶT";
    case PaymentType.BANKING:
      return "Ngân hàng";
    case PaymentType.POINTIFY:
      return "Ví POINTIFY";
    default:
      return "Tiền mặt";
  }
}
export function showOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "Đang thực hiện";

    case OrderStatus.PAID:
      return "Đã hoàn thành";
    case OrderStatus.CANCELED:
      return "Đã huỹ";
    default:
      return "Đang thực hiện";
  }
}
