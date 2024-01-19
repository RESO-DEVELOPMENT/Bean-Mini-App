import { createOrder } from "zmp-sdk";
import { Option } from "types/product";
import { getConfig } from "./config";
import { Cart } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { ProductList } from "pages/index/product-list";
import { useRecoilState } from "recoil";
import {
  OrderStatus,
  OrderType,
  PaymentStatus,
  PaymentType,
} from "types/order";
import orderApi from "api/order";
import { val, value } from "zmp-dom";
import { TransactionTypeEnum } from "types/transaction";

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
      return "VÍ BEAN";
    default:
      return "TIỀN MẶT";
  }
}
export function showOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "Đang thực hiện";
    case OrderStatus.PAID:
      return "Đã hoàn thành";
    case OrderStatus.CANCELED:
      return "Đã huỷ";
    default:
      return "Đang thực hiện";
  }
}
export function showPaymentStatus(status: string) {
  switch (status) {
    case PaymentStatus.PENDING:
      return "Chưa thanh toán";
    case PaymentStatus.PAID:
      return "Đã thanh toán";
    case PaymentStatus.FAIL:
      return "Thanh toán thất bại";
    default:
      return "Chưa thanh toán";
  }
}

export function showTransactionType(type: string) {
  switch (type) {
    case TransactionTypeEnum.PAYMENT:
      return "Thanh toán đơn hàng";
    case TransactionTypeEnum.GET_POINT:
      return "Tích điểm";
    case TransactionTypeEnum.TOP_UP:
      return "Nạp tiền";
    default:
      return "Không có thông tin";
  }
}
export function showTransactionStatus(status: string) {
  switch (status) {
    case "FAIL":
      return "Thất bại";
    case "SUCCESS":
      return "Thành công";
    default:
      return "Không có thông tin";
  }
}
