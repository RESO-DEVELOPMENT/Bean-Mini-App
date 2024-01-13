import React, { FC } from "react";
import { Card } from "zmp-framework/react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";

const OrderDetailsPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết đơn hàng" className="pt-12" showBackIcon={true} />
      <Box className="bg-white mb-2 pr-2 pl-2">
        <Card inset>
          <div className="flex pb-4 pt-4 pr-2 pl-2">
            <Text.Header className="text-[20px] pl-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text.Header>
            <Icon icon="zi-chevron-right" />
          </div>
          <hr />
          <div>
            <Card inset>
              <div className="flex p-2">
                <div className="flex pr-2">
                  <img
                    className="img-bill-orders rounded-md mr-2"
                    src="https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"
                  />
                  <b className="text-gray font-semibold">1x</b>
                </div>
                <div className="pl-2">
                  <Text.Header>
                    Lorem ipsum dolor sit amet dolor sit.
                  </Text.Header>
                  <Text>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum dolor sit amet</p>
                  </Text>
                  <b className="text-[14px] font-semibold">75.000đ</b>
                </div>
              </div>
              <hr />
            </Card>
            <Card inset>
              <div className="flex p-2">
                <div className="flex pr-2">
                  <img
                    className="img-bill-orders rounded-md mr-2"
                    src="https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"
                  />
                  <b className="text-gray font-semibold">1x</b>
                </div>
                <div className="pl-2">
                  <Text.Header>
                    Lorem ipsum dolor sit amet dolor sit.
                  </Text.Header>
                  <Text>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum dolor sit amet</p>
                  </Text>
                  <b className="text-[14px] font-semibold">75.000đ</b>
                </div>
              </div>
              <hr />
            </Card>
          </div>
          <Card inset>
            <div className="pb-4">
              <Text.Header className="p-3 text-[18px]">Thanh Toán</Text.Header>
              <div className="flex justify-between pr-3 pl-3 p-1 ">
                <p>Tạm tính (2 phần)</p>
                <p>150.000đ</p>
              </div>
              <div className="flex justify-between pr-3 pl-3 p-1">
                <p>Phí áp dụng</p>
                <p>0đ</p>
              </div>
              <div className="flex justify-between pr-3 pl-3 p-1">
                <p>Giảm giá</p>
                <p>-10.000đ</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between p-3 text-[18px] font-semibold">
              <div className="flex">
                <span className="pr-2">Trả qua Momo</span>
                <img
                  className="img-icon"
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                />
              </div>
              <p>140.000đ</p>
            </div>
          </Card>
        </Card>
      </Box>

      <Box className="bg-white mb-2 pr-2 pl-2 pb-14">
        <Card inset>
          <div className="p-3 ">
            <Text.Header className="text-[18px] pb-1">
              Mã đơn hàng: 1234456777
            </Text.Header>
            <Text>12/01/2024 | 17:03</Text>
          </div>
          <hr />
          <div className="flex p-3">
            <p className="pr-3">
              <Icon icon="zi-user-window-solid" />
            </p>
            <div>
              <p className="text-[16px] font-semibold">
                Lorem ipsum dolor - 343 Nguyễn Xiển
              </p>
              <p>
                Lorem ipsum dolor sit amet dolor sit. Lorem ipsum dolor sit amet
                dolor sit.
              </p>
            </div>
          </div>
        </Card>
        <button className="font-bold bg-zinc-200 p-3 text-[18px] rounded-md hover:bg-zinc-400 w-full">
          Bạn cần hỗ trợ?
        </button>
      </Box>
      <button className=" fixed bottom-14 right-0 font-bold bg-sky-200 p-2 w-screen text-[20px] rounded-md text-cyan-800 hover:text-sky-200 hover:bg-cyan-800">
        Đặt lại
      </button>
    </Page>
  );
};

export default OrderDetailsPage;
