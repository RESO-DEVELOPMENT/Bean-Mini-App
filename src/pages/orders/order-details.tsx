import React, { FC } from "react";
import { Card } from "zmp-framework/react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import { useLocation } from "react-router-dom";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { getOrderDetailstate } from "state";
import { DisplayPrice } from "components/display/price";
import { showOrderType, showPaymentType } from "utils/product";
import { displayDate, displayTime } from "utils/date";
import { ListRenderer } from "components/list-renderer";
import { OrderStatus, OrderType } from "types/order";
import { showOrderStatus } from "utils/product";
import { useNavigate } from "react-router-dom";

const OrderDetailsPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const orderDetail = useRecoilValueLoadable(getOrderDetailstate(id));
  console.log("orderDetail", orderDetail);

  const handleSupportClick = () => {
    navigate("/feedback");
  };

  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết đơn hàng" className="pt-12" showBackIcon={true} />
      <Box>
        {orderDetail.state === "hasValue" && orderDetail.contents !== null ? (
          <>
            <Box className="space-y-3 px-4 my-2">
              <Text.Header>Đơn hàng</Text.Header>
              {orderDetail.contents.productList.length > 0 ? (
                <ListRenderer
                  items={orderDetail.contents.productList}
                  limit={3}
                  onClick={(item) => {
                    // setEditingItem(item);
                    // open();
                  }}
                  renderKey={({ quantity }) => JSON.stringify({ quantity })}
                  renderLeft={(item) => (
                    <div className="flex justify-between">
                      <Text
                        className="text-primary font-medium pr-2"
                        size="small"
                      >
                        x{item.quantity}
                      </Text>
                      <img className="img-bill-orders" src={item.picUrl} />
                    </div>
                  )}
                  renderRight={(item) => (
                    <Box flex className="space-x-1">
                      <Box className="space-y-1 flex-1">
                        <Text size="small">{item.name}</Text>
                      </Box>
                      <Text className="text-gray" size="xSmall">
                        <DisplayPrice>{item.finalAmount}</DisplayPrice>
                      </Text>
                    </Box>
                  )}
                />
              ) : (
                <Text
                  className="bg-background rounded-xl py-8 px-4 text-center text-gray"
                  size="xxSmall"
                >
                  Không có sản phẩm trong đơn hàng
                </Text>
              )}
            </Box>
            <Box className="space-y-3 px-4 mb-2">
              <Text.Header>Thanh toán</Text.Header>
              <ListRenderer
                noDivider
                items={[
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Tạm tính</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text size="small">
                          <DisplayPrice>
                            {orderDetail.state == "hasValue" &&
                            orderDetail.contents !== null
                              ? orderDetail.contents.totalAmount
                              : 0}
                          </DisplayPrice>
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        {orderDetail.state == "hasValue" &&
                        orderDetail.contents !== null
                          ? orderDetail.contents.promotionList!.map((p) => (
                              <Text
                                size="small"
                                className="pb-4 whitespace-nowrap"
                              >
                                {p.promotionName}
                              </Text>
                            ))
                          : ""}
                      </Box>
                    ),
                    right:
                      orderDetail.state == "hasValue" &&
                      orderDetail.contents !== null ? (
                        orderDetail.contents.promotionList!.map((p) =>
                          p.effectType == "setDiscount" ? (
                            <Box flex className="space-x-1">
                              <Box className="flex-1 space-y-[2px]"></Box>
                              <Text size="small" className="text-primary pb-4">
                                -<DisplayPrice>{p.discountAmount}</DisplayPrice>
                              </Text>
                            </Box>
                          ) : (
                            <Box flex className="space-x-1">
                              <Box className="flex-1 space-y-[2px]"></Box>
                              <Text size="small" className="pb-4">
                                +{p.discountAmount}
                              </Text>
                            </Box>
                          )
                        )
                      ) : (
                        <Box />
                      ),
                  },
                  {
                    left: <hr className="p-0" />,
                    right: <hr className="p-0" />,
                  },
                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        <Text.Title size="small">Tổng thanh toán</Text.Title>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[1px]"></Box>
                        <Text.Title size="small">
                          <DisplayPrice>
                            {orderDetail.state == "hasValue" &&
                            orderDetail.contents !== null
                              ? orderDetail.contents.finalAmount
                              : 0}
                          </DisplayPrice>
                        </Text.Title>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        <Text.Title size="small">Phương thức</Text.Title>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[1px]"></Box>
                        <Text.Title size="small">
                          {showPaymentType(orderDetail.contents.paymentType)}
                        </Text.Title>
                      </Box>
                    ),
                  },
                ]}
                limit={4}
                renderLeft={(item) => item.left}
                renderRight={(item) => item.right}
              />
            </Box>

            <Box className="space-y-3 px-4 mb-2">
              <Text.Header>Thông tin đơn hàng</Text.Header>
              <ListRenderer
                noDivider
                items={[
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Mã đơn</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text.Title size="small">
                          {orderDetail.state == "hasValue" &&
                          orderDetail.contents !== null
                            ? orderDetail.contents.invoiceId
                            : ""}
                        </Text.Title>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        <Text size="small">Trạng thái</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[1px]"></Box>
                        <Text size="small">
                          {showOrderStatus(orderDetail.contents.orderStatus)}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Nhận món</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text size="small">
                          {orderDetail.state == "hasValue" &&
                          orderDetail.contents !== null
                            ? showOrderType(orderDetail.contents.orderType)
                            : ""}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Địa chỉ </Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text size="small">
                          {orderDetail.state == "hasValue" &&
                          orderDetail.contents !== null
                            ? orderDetail.contents.orderType ==
                              OrderType.DELIVERY
                              ? orderDetail.contents.customerInfo.address
                              : orderDetail.contents.storeName
                            : ""}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Thời gian giao</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text size="small">
                          {orderDetail.state == "hasValue" &&
                          orderDetail.contents !== null
                            ? orderDetail.contents.customerInfo.deliTime
                            : ""}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box flex className="space-x-1">
                        <Text size="small">Ngày đặt</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[2px]"></Box>
                        <Text size="small">
                          {orderDetail.state == "hasValue" &&
                          orderDetail.contents !== null
                            ? displayTime(
                                new Date(orderDetail.contents.checkInDate)
                              ) +
                              " " +
                              displayDate(
                                new Date(orderDetail.contents.checkInDate)
                              )
                            : ""}
                        </Text>
                      </Box>
                    ),
                  },

                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        <Text size="small">Tên người nhận</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[1px]"></Box>
                        <Text size="small">
                          {orderDetail.contents.customerInfo.name}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    left: (
                      <Box className="flex-1 space-y-[1px]">
                        <Text size="small">SĐT</Text>
                      </Box>
                    ),
                    right: (
                      <Box flex className="space-x-1">
                        <Box className="flex-1 space-y-[1px]"></Box>
                        <Text size="small">
                          {orderDetail.contents.customerInfo.phone}
                        </Text>
                      </Box>
                    ),
                  },
                ]}
                limit={5}
                renderLeft={(item) => item.left}
                renderRight={(item) => item.right}
              />
            </Box>
            <Box className="space-y-3 px-4 my-2">
              <button className="font-bold bg-red-300 p-3  text-[18px] rounded-md hover:bg-red-400  w-full ">
                Huỷ đơn
              </button>
              <button
                onClick={handleSupportClick}
                className="font-bold bg-zinc-200 p-3  text-[18px] rounded-md hover:bg-zinc-400 w-full "
              >
                Bạn cần hỗ trợ?
              </button>
            </Box>
          </>
        ) : (
          <Box />
        )}
      </Box>

      {/* <button className=" fixed bottom-14 right-0 font-bold bg-sky-200 p-2 w-screen text-[20px] rounded-md text-cyan-800 hover:text-sky-200 hover:bg-cyan-800">
        Đặt lại
      </button> */}
    </Page>
  );
};

export default OrderDetailsPage;
