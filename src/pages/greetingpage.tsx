import React, { FC } from "react";
import { Page, Header, Box, Text } from "zmp-ui";

const GreetingPage: FC = () => {
  return (
    <Page>
      <Header title="Chào Bạn Mới" showBackIcon={true} />
      {/* Chỉnh sửa ở đây */}
      <Box className="flex flex-col justify-start items-center h-full">
        <Box className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-4 mt-4">
          <img
            src="docs/dummy/banner-1.jpg"
            alt="Mô tả hình ảnh"
            width="300px"
            height="200px"
          />
          <Text size="large" className="mt-5">
            Xin chào
          </Text>
          <Text className="mt-4" size="normal">
            Tặng bạn voucher 50% cho mọi mặt hàng
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default GreetingPage;
