import { createOrder, EventName, events, Payment } from "zmp-sdk";
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
export const pay = (cart: Cart) =>
  Payment.createOrder({
    desc: `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: cart.finalAmount,
    success: (data) => {
      console.log("Payment success: ", data);
      events.on(EventName.OpenApp, async (data) => {
        const params = data?.path;
      });
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
    case PaymentType.POINTIFY:
      return "Điểm BEAN";
    default:
      return "TIỀN MẶT";
  }
}
export function showOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.NEW:
      return "Chờ xác nhận";
    case OrderStatus.PENDING:
      return "Đang thực hiện";
    case OrderStatus.PAID:
      return "Đã hoàn thành";
    case OrderStatus.CANCELED:
      return "Đã huỷ";
    case OrderStatus.DELIVERING:
      return "Đang giao";
    case OrderStatus.DELIVERED:
      return "Giao thành công";
    default:
      return "Đang thực hiện";
  }
}
export function showDeliStatus(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "Đang thực hiện";
    case OrderStatus.PAID:
      return "Đã hoàn thành";
    case OrderStatus.CANCELED:
      return "Đã huỷ";
    case OrderStatus.DELIVERING:
      return "Đang giao";
    case OrderStatus.DELIVERED:
      return "Giao thành công";
    default:
      return "Đang thực hiện";
  }
}
export function showOrderType(type: string) {
  switch (type) {
    case OrderType.EATIN:
      return "Tại quầy";
    case OrderType.DELIVERY:
      return "Giao hàng";
    case OrderType.TAKE_AWAY:
      return "Mang đi";
    default:
      return "Mang đi";
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
