import React, { FC, Suspense, useCallback, useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import "./orders.css";
import { selectedCategoryIdState } from "states/category.state";
import { listOrderState } from "states/order.state";
import { requestOrderTransactionTriesState } from "states/order.state";
import { memberState } from "states/member.state";
import { Box, Header, Icon, Page, Tabs, Text } from "zmp-ui";
import TransactionCard from "./card-transaction";
import { Card } from "react-bootstrap";
import { displayDate, displayTime } from "utils/date";
import { DisplayPrice } from "components/display/price";
import { prepareCart, showOrderStatus } from "utils/product";
import { OrderStatus } from "types/order";
import { useNavigate } from "react-router-dom";
import { Subscription } from "pages/profile";
import { listTransactionState } from "states/transaction.state";
import {
  listStoreState,
  selectedStoreIdState,
} from "states/store.state";
import { cartState } from "states/cart.state";
import ProductRePicker from "components/product/repicker";
import { ContentFallback } from "components/content-fallback";
const HistoryPicker: FC = () => {
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  const orderListData = useRecoilValueLoadable(listOrderState);
  const transactionListData = useRecoilValueLoadable(listTransactionState);
  const navigate = useNavigate();
  const handleResetClick = (event) => {
    event.stopPropagation();
    navigate("/order");
  };
  const [stores, setStores] = useState([]);
  let storesResponse = useRecoilValueLoadable(listStoreState);
  useEffect(() => {
    setStores(storesResponse.contents);
  }, []);

  const retry = useSetRecoilState(requestOrderTransactionTriesState);
  const member = useRecoilValueLoadable(memberState);
  useEffect(() => {
    retry((r) => r + 1);
  }, []);
  const gotoPage = (id: string) => {
    navigate("/order-detail", { state: { id } });
  };
  const setCurrentStoreId = useSetRecoilState(selectedStoreIdState);
  const [cart, setCart] = useRecoilState(cartState);
  const reAddToCart = useCallback((store, reOrderProducts) => {
    if (!store) return;
    setCurrentStoreId(store.id);
    setCart((prevCart) => {
      const isSameStore = prevCart.storeId === store.id;
      const newCart = isSameStore
        ? {
            ...prevCart,
            storeId: store.id,
          }
        : {
            ...prevCart,
            storeId: store.id,
            productList: [],
          };

      const updatedProductList = newCart.productList.map((addedProduct) => {
        const productToAdd = reOrderProducts.find(
          ({ product }) =>
            product.menuProductId === addedProduct.productInMenuId
        );

        if (productToAdd) {
          return {
            ...addedProduct,
            quantity: addedProduct.quantity + productToAdd.quantity,
            finalAmount:
              addedProduct.finalAmount +
              productToAdd.quantity * productToAdd.product.sellingPrice,
          };
        }

        return addedProduct;
      });

      const newProducts = reOrderProducts
        .filter(
          ({ product }) =>
            !updatedProductList.some(
              (addedProduct) =>
                addedProduct.productInMenuId === product.menuProductId
            )
        )
        .map(({ product, quantity }) => ({
          productInMenuId: product.menuProductId,
          parentProductId: product.parentProductId,
          name: product.name,
          type: product.type,
          quantity,
          sellingPrice: product.sellingPrice,
          code: product.code,
          categoryCode: product.code,
          totalAmount: product.sellingPrice * quantity,
          discount: 0,
          finalAmount: product.sellingPrice * quantity,
          picUrl: product.picUrl,
        }));

      newCart.productList = updatedProductList.concat(newProducts);

      return prepareCart(newCart);
    });

    navigate("/cart");
  }, []);

  return (
    <>
      {member.state === "hasValue" && member.contents !== null ? (
        <Tabs
          scrollable
          defaultActiveKey={selectedCategory}
          className="category-tabs"
        >
          <Tabs.Tab key={0} label="Đơn hàng">
            <Suspense>
              {orderListData.state === "hasValue" &&
              orderListData.contents !== null ? (
                <div
                  style={{
                    overflowY: "auto",
                    flex: 1,
                  }}
                >
                  {orderListData.contents.map((order, index) => (
                    <Box key={index} className="m-2 p-2 bg-white" flex>
                      <Card className="time-order">
                        <div className="flex justify-between">
                          <Text.Title size="normal">
                            {order.invoiceId.slice(-5)}
                          </Text.Title>

                          <Text
                            className={
                              order.status == OrderStatus.NEW
                                ? "font-bold bg-gray p-1 rounded-md text-white"
                                : order.status == OrderStatus.PENDING
                                ? "font-bold bg-blue-400 p-1 rounded-md text-white"
                                : order.status == OrderStatus.PAID
                                ? "font-bold bg-emerald-400 p-1 rounded-md text-white"
                                : "font-bold bg-red-400 p-1 rounded-md text-white"
                            }
                          >
                            {showOrderStatus(order.status)}
                          </Text>
                        </div>

                        <div className="flex my-1">
                          <Icon
                            className="text-primary"
                            size={22}
                            icon="zi-location"
                          />
                          <Text.Header className="text-md leading-6 ml-1">
                            {order.storeName}
                          </Text.Header>
                        </div>
                        <div className="flex justify-between mx-1 my-2">
                          <Text>
                            {displayDate(new Date(order.endDate))}{" "}
                            {displayTime(new Date(order.endDate))}
                          </Text>
                          <Text.Header>
                            <DisplayPrice>{order.finalAmount}</DisplayPrice>
                          </Text.Header>
                        </div>

                        <hr className="hr-order" />
                        <div className="flex mt-1 justify-between">
                          <div
                            className="m-1 "
                            onClick={() => gotoPage(order.id)}
                          >
                            <Text.Header>Chi tiết đơn hàng</Text.Header>
                          </div>
                          {order && order.status !== OrderStatus.PENDING && (
                            <ProductRePicker
                              isUpdate={false}
                              orderId={order.id}
                              key={order.id}
                              reAddToCart={reAddToCart}
                            />
                          )}
                        </div>
                      </Card>
                    </Box>
                  ))}
                </div>
              ) : (
                <Box>
                  <ContentFallback />
                </Box>
              )}
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab key={1} label="Giao dịch">
            <Suspense>
              {transactionListData.state === "hasValue" &&
              transactionListData.contents !== null ? (
                <div
                  style={{
                    overflowY: "auto",
                    flex: 1,
                  }}
                >
                  {transactionListData.contents.map((order) => (
                    <TransactionCard key={order.id} trans={order} />
                  ))}
                </div>
              ) : (
                <Box />
              )}
            </Suspense>
          </Tabs.Tab>
        </Tabs>
      ) : (
        <Subscription />
      )}
    </>
  );
};

const HistoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header showBackIcon={false} title="Hoạt động" />
      <HistoryPicker key={1} />
    </Page>
  );
};

export default HistoryPage;
