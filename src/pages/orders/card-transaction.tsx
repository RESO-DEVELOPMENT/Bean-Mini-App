// VoucherCard.tsx

import { DisplayDay } from "components/display/date";
import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useState } from "react";
import { OrderPreview } from "types/order";
import { Transaction } from "types/transaction";
import { displayDate, displayTime } from "utils/date";
import { showTransactionStatus, showTransactionType } from "utils/product";
import { Box, Text } from "zmp-ui";

interface TransactionProps {
  trans: Transaction;
}

const TransactionCard: FC<TransactionProps> = ({ trans }) => {
  return (
    <Box className="space-y-2 px-2 mt-2">
      <ListRenderer
        noDivider
        items={[
          {
            left: (
              <Box flex className="space-x-1">
                <Text.Title size="small">
                  {showTransactionType(trans.type)}
                </Text.Title>
              </Box>
            ),
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[2px]"></Box>
                <Text.Title size="small">
                  {trans.isIncrease ? "+" : "-"} {trans.amount} {trans.currency}
                </Text.Title>
              </Box>
            ),
          },
          {
            left: <Box className="flex-1 space-y-[1px]">Thời gian</Box>,
            right: (
              <Box flex className="space-x-1">
                <Box className="flex-1 space-y-[2px]"></Box>
                <Text size="xxSmall">
                  {displayTime(new Date(trans.createdDate)) +
                    " " +
                    displayDate(new Date(trans.createdDate))}
                </Text>
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
                <Text size="small">{showTransactionStatus(trans.status)} </Text>
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

export default TransactionCard;
