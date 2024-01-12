import { ListRenderer } from "components/list-renderer";
import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  categoriesState,
  listOrderState,
  listTransactionState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Icon, Page, Tabs, Text, useNavigate } from "zmp-ui";
import OrderCard from "./card-order";
import TransactionCard from "./card-transaction";

const HistoryPicker: FC = () => {
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  const orderListData = useRecoilValueLoadable(listOrderState);
  const transactionListData = useRecoilValueLoadable(listTransactionState);
  const navigate = useNavigate();
  const gotoPage = (page: string) => {
    navigate(page);
  };
  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      <Tabs.Tab key={0} label="Đơn hàng">
        <Suspense>
          {orderListData.state === "hasValue" &&
          orderListData.contents !== null ? (
            <div
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {orderListData.contents.map((order) => (
                <OrderCard order={order} />
              ))}
            </div>
          ) : (
            <Box />
          )}
        </Suspense>
      </Tabs.Tab>
      <Tabs.Tab key={1} label="Giao dịch">
        <Suspense>
          {transactionListData.state === "hasValue" &&
          transactionListData.contents !== null ? (
            <div
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {transactionListData.contents.map((order) => (
                <TransactionCard trans={order} />
              ))}
            </div>
          ) : (
            <Box />
          )}
        </Suspense>
      </Tabs.Tab>
    </Tabs>
  );
};

// const ListOrder: FC<{ categoryId: string }> = ({ categoryId }) => {
//   const productsByCategory = useRecoilValue(
//     productsByCategoryState(categoryId)
//   );

//   if (productsByCategory.length === 0) {
//     return (
//       <Box className="flex-1 bg-background p-4 flex justify-center items-center">
//         <Text size="xSmall" className="text-gray">
//           Không có sản phẩm trong danh mục
//         </Text>
//       </Box>
//     );
//   }
//   return (
//     <Box className="bg-background grid grid-cols-2 gap-4 p-4">
//       {productsByCategory.map((product) => (
//         <ProductItem key={product.id} product={product} onQuantityChange={0} />
//       ))}
//     </Box>
//   );
// };

const HistoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header showBackIcon={false} title="Hoạt động" />
      <HistoryPicker key={1} />
    </Page>
  );
};

export default HistoryPage;
