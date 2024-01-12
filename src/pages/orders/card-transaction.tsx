// VoucherCard.tsx

import { DisplayDay } from "components/display/date";
import { DisplayPrice } from "components/display/price";
import React, { FC, useState } from "react";
import { OrderPreview } from "types/order";
import { Transaction } from "types/transaction";
import { displayDate } from "utils/date";
import { Box, Text } from "zmp-ui";

interface TransactionProps {
  trans: Transaction;
}

const TransactionCard: FC<TransactionProps> = ({ trans }) => {
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
          <Text value={0}>{displayDate(new Date(trans.createdDate))}</Text>
          <Text className="font-bold">{trans.type}</Text>
          <Text className="font-bold">
            <DisplayPrice>{trans.amount}</DisplayPrice>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionCard;
