import { ListRenderer } from "components/list-renderer";
import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Icon, Page, Tabs, Text, useNavigate } from "zmp-ui";

const HistoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
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
          <ListRenderer
            onClick={(item) => {
              gotoPage(item.navigate);
            }}
            items={[
              {
                navigate: "/order-detail",
                left: <Icon icon="zi-user" />,
                right: (
                  <Box flex>
                    <Text.Header className="flex-1 items-center font-normal">
                      Bấm vô đây để vào chi tiết đơn hàng nào
                    </Text.Header>
                    <Icon icon="zi-chevron-right" />
                  </Box>
                ),
              },
            ]}
            renderLeft={(item) => item.left}
            renderRight={(item) => item.right}
          />
        </Suspense>
      </Tabs.Tab>
      <Tabs.Tab key={1} label="Thanh toán">
        {/* <Suspense>
          <CategoryProducts categoryId={category.id} />
        </Suspense> */}
      </Tabs.Tab>
      <Tabs.Tab key={1} label="Tích điểm">
        {/* <Suspense>
          <CategoryProducts categoryId={category.id} />
        </Suspense> */}
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
      <HistoryPicker />
    </Page>
  );
};

export default HistoryPage;
