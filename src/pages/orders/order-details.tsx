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
import { showPaymentType } from "utils/product";
import { displayDate, displayTime } from "utils/date";

const OrderDetailsPage: FC = () => {
  const location = useLocation();
  const id = location.state?.id;
  const orderDetail = useRecoilValueLoadable(getOrderDetailstate(id));
  console.log("orderDetail", orderDetail);
  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết đơn hàng" className="pt-12" showBackIcon={true} />
      <Box className="bg-white mb-2 pr-2 pl-2">
        {orderDetail.state === "hasValue" && orderDetail.contents !== null ? (
          <>
            <Card inset>
              <div className="flex pb-4 pt-4 pr-2 pl-2">
                <Text.Title className="text-m text-center pl-2">
                  {orderDetail.contents.storeName}
                </Text.Title>
                <Icon icon="zi-chevron-right" />
              </div>
              <hr />
              <div>
                {orderDetail.contents.productList.map((detail) => (
                  <Card inset>
                    <div className="flex p-2">
                      <div className="flex pr-2">
                        {/* <img
                        className="img-bill-orders rounded-md mr-2"
                        src="https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"
                      /> */}
                        <b className="text-gray font-semibold">1x</b>
                      </div>
                      <div className="pl-2">
                        <Text.Header>{detail.name}</Text.Header>
                        <Text>
                          <p>{detail.note}</p>
                        </Text>
                        <b className="text-[14px] font-semibold">
                          <DisplayPrice>{detail.finalAmount}</DisplayPrice>
                        </b>
                      </div>
                    </div>
                    <hr />
                  </Card>
                ))}
              </div>
              <Card inset>
                <div className="px-2 py-1">
                  <Text.Header className=" text-[18px]">Thanh Toán</Text.Header>
                  <div className="flex justify-between   ">
                    <p>
                      Tạm tính ({orderDetail.contents.productList.length} phần)
                    </p>
                    <p>
                      <DisplayPrice>
                        {orderDetail.contents.totalAmount}
                      </DisplayPrice>
                    </p>
                  </div>
                  {/* <div className="flex justify-between pr-3 pl-3 p-1">
                  <p>Phí áp dụng</p>
                  <p>
                    <DisplayPrice>
                      {orderDetail.contents.}
                    </DisplayPrice>
                  </p>
                </div> */}
                  <div className="flex justify-between ">
                    <p>Giảm giá</p>
                    <p>
                      {"-"}
                      <DisplayPrice>
                        {orderDetail.contents.discount}
                      </DisplayPrice>
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1 flex justify-between text-[18px] font-semibold">
                  <div className="flex">
                    <span className="text-[16px]">
                      Thanh toán{" "}
                      {showPaymentType(orderDetail.contents.paymentType)}
                    </span>
                  </div>
                  <p className="text-[16px]">
                    <DisplayPrice>
                      {orderDetail.contents.finalAmount}
                    </DisplayPrice>
                  </p>
                </div>
              </Card>
            </Card>
            <Box className="bg-white ">
              <Card inset>
                <div className="px-2 py-1 ">
                  <Text.Header className="text-sm pb-1">
                    Mã đơn: {orderDetail.contents.invoiceId}
                  </Text.Header>
                  <Text>
                    {displayTime(new Date(orderDetail.contents.checkInDate))}{" "}
                    {displayDate(new Date(orderDetail.contents.checkInDate))}
                  </Text>
                </div>
                <hr />
                <div className="flex p-2">
                  <p className="mr-2">
                    <Icon icon="zi-user-window-solid" />
                  </p>
                  <div>
                    <p className="text-[16px] font-semibold">
                      {orderDetail.contents.customerInfo.name}{" "}
                      {orderDetail.contents.customerInfo.phone}
                    </p>
                    <p></p>
                    <p>{orderDetail.contents.customerInfo.address}</p>
                  </div>
                </div>
              </Card>
              <button className="font-bold bg-zinc-200 p-3  text-[18px] rounded-md hover:bg-zinc-400 w-full ">
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
