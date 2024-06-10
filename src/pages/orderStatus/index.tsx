import React, { FC } from "react";
import { Header, Page } from "zmp-ui";
import { TabOrder } from "./tabs";

export const OrderStatus: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Trạng thái đơn hàng: abc..." showBackIcon={false} />
      <TabOrder />

      {/* {!keyboardVisible && <CartPreview />} */}
    </Page>
  );
};

export default OrderStatus;
