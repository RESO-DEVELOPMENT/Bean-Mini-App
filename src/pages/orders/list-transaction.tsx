import React, { FC, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { listTransactionState } from "states/transaction.state";
import TransactionCard from "./card-transaction";
import { Box, Header, Page } from "zmp-ui";
import { ContentFallback } from "components/content-fallback";
import { Subscription } from "pages/profile";
import { requestOrderTransactionTriesState } from "states/order.state";

const ListTransaction: FC = () => {
    
  const retry = useSetRecoilState(requestOrderTransactionTriesState);
  useEffect(() => {
    retry((r) => r + 1);
  }, []);
  const transactionListData = useRecoilValueLoadable(listTransactionState);
  if (
    transactionListData.state === "loading" ||
    transactionListData.state === "hasError"
  )
    return <ContentFallback />;

  if (
    transactionListData.state === "hasValue" &&
    transactionListData.contents === null
  )
    return <Subscription />;
  if (
    transactionListData.state === "hasValue" &&
    transactionListData.contents !== null
  ) {
    console.log('nội dung')
    return (
      <Box
        style={{
          overflowY: "auto",
          flex: 1,
        }}
      >
        {transactionListData.contents.map((order) => (
          <TransactionCard key={order.id} trans={order} />
        ))}
      </Box>
    );
  }
  return <Box />;
};
const TransactionPage: FC = () => (
  <Page className="flex flex-col">
    <Header showBackIcon={true} title="Giao dịch" />
    <ListTransaction />
  </Page>
);

export default TransactionPage;
