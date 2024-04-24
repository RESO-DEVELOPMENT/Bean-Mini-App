import { ListRenderer } from "components/list-renderer";
import { ProductItem } from "components/product/item";
import React, { FC, Suspense, useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import "./orders.css";
import {
  categoriesState,
  listOrderState,
  listTransactionState,
  memberState,
  productsByCategoryState,
  requestOrderTransactionTriesState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Icon, Page, Tabs, Text } from "zmp-ui";
import OrderCard from "./card-order";
import TransactionCard from "./card-transaction";
import { Card } from "react-bootstrap";
import { displayDate, displayTime } from "utils/date";
import { DisplayPrice } from "components/display/price";
import { showOrderStatus } from "utils/product";
import { OrderStatus } from "types/order";
import { useNavigate } from "react-router-dom";
import { Subscription } from "pages/profile";
const HistoryPicker: FC = () => {
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  const orderListData = useRecoilValueLoadable(listOrderState);
  const transactionListData = useRecoilValueLoadable(listTransactionState);
  const handleResetClick = (event) => {
    event.stopPropagation();
    navigate("/order");
    // const handleResetClick = (orderId) => {
    //   navigate("/order");
  };

  const navigate = useNavigate();
  const retry = useSetRecoilState(requestOrderTransactionTriesState);
  const member = useRecoilValueLoadable(memberState);
  useEffect(() => {
    retry((r) => r + 1);
  }, []);
  const gotoPage = (id: string) => {
    navigate("/order-detail", { state: { id } });
  };
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
                    <Box
                      key={index}
                      onClick={() => gotoPage(order.id)}
                      className="m-2 p-2 bg-white"
                      flex
                    >
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
                        <div className="flex mt-1 justify-center">
                          <Text.Header
                            className=" m-1 flex-1 align-middle font-normal text-m text-primary"
                            onClick={() => gotoPage(order.id)}
                          >
                            Chi tiết đơn hàng
                          </Text.Header>
                          {order.status !== OrderStatus.PENDING && (
                            <button
                              className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
                              onClick={handleResetClick}
                            >
                              Đặt lại
                            </button>
                          )}
                        </div>
                      </Card>
                    </Box>
                  ))}
                </div>
              ) : (
                <Box />
              )}
              {/* <ListRenderer
    onClick={(item) => {
      gotoPage(item.navigate);
    }}
    items={[
      {
        navigate: "/order-detail",
        // left: <Icon icon="zi-user" />,
        right: (
          <Box flex>
            <Card>
              <div className="flex justify-between time-order  mb-2">
                <Text className="text-[17px]">10/12/2024, 08:23</Text>
                <Text className="font-bold bg-emerald-100 p-0.5 pr-1 pl-1 rounded-md text-green">
                  Giao thành công
                </Text>
              </div>
              <div className="flex mb-2">
                <div className="m-2">
                  <img
                    className="img-orders rounded-md"
                    src="https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"
                  />
                </div>
                <div>
                  <Text.Header className="text-[18px] leading-6 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </Text.Header>
                  <Text className="text-[17px]">
                    2 phần - <b className="font-semibold">132.000đ</b>
                  </Text>
                </div>
              </div>
              <hr className="hr-order" />
              <div className="flex mt-4 justify-center">
                <Text.Header className="flex-1 align-middle font-normal text-sm">
                  Xem chi tiết đơn hàng
                </Text.Header>
                <button className="font-bold bg-sky-200 p-1 pl-6 pr-6 rounded-md text-cyan-800 text-sm hover:text-sky-200 hover:bg-cyan-800">
                  Đặt lại
                </button>
              </div>
            </Card>
          </Box>
        ),
      },
    ]}
    // renderLeft={(item) => item.left}
    renderRight={(item) => item.right}
  /> */}
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

// const ListOrder: FC<{ categoryId: string }> = ({categoryId}) => {
//   const productsByCategory = useRecoilValue(
//     productsByCategoryState(categoryId)
//   );

//   if (productsByCategory.length === 0) {
//     return (
//       <Box className="flex-1 bg-background p-4 flex justify-center items-center">
//         <Text size="xSmall" className="text-gray">
//           Không có sản phẩm trong danh mục
//         </Text>
//       </Box>
//     );
//   }
//   return (
//     <Box className="bg-background grid grid-cols-2 gap-4 p-4">
//       {productsByCategory.map((product) => (
//         <ProductItem key={product.id} product={product} onQuantityChange={0} />
//       ))}
//     </Box>
//   );
// };

const HistoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header showBackIcon={false} title="Hoạt động" />
      <HistoryPicker key={1} />
    </Page>
  );
};

export default HistoryPage;
