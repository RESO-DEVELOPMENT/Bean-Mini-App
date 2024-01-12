// VoucherCard.tsx

import { DisplayPrice } from "components/display/price";
import React, { FC, useState } from "react";
import { OrderPreview } from "types/order";
import { Box, Text } from "zmp-ui";

interface OrderCartProps {
  order: OrderPreview;
}

const OrderCard: FC<OrderCartProps> = ({ order }) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "2px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "6px",
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    padding: "6px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    height: "80px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  return (
    <Box style={containerStyle}>
      <Box style={cardStyle}>
        <Box>
          <Text className="font-bold">{order.invoiceId}</Text>
          <Text className="font-bold">
            <DisplayPrice>{order.finalAmount}</DisplayPrice>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCard;
