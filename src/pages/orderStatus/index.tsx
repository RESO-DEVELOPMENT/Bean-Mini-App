import React, { FC, useState } from "react";
import { Header, Page, useNavigate } from "zmp-ui";
import { useVirtualKeyboardVisible } from "hooks";
import { TabOrder } from "./tabs";
import { CartPreview } from "../cart/preview";

export const OrderStatus: FC = () => {
  // const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col">
      <Header title="Trạng thái đơn hàng: abc..." showBackIcon={false} />
      <TabOrder />

      {/* {!keyboardVisible && <CartPreview />} */}
    </Page>
  );
};

export default OrderStatus;
