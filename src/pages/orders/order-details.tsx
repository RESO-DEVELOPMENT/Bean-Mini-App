import React, { FC } from "react";
import { Header, Page } from "zmp-ui";

const OrderDetailsPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết đơn hàng" showBackIcon={true} />
    </Page>
  );
};

export default OrderDetailsPage;
