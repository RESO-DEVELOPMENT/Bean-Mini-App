import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  categoriesState,
  childCategoriesState,
  currentCateState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

const CategoryPicker: FC = () => {
  const categories = useRecoilValueLoadable(childCategoriesState);

  if (categories.contents.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm hoặc danh mục nào trong danh mục này
        </Text>
      </Box>
    );
  }
  return (
    <Tabs
      scrollable
      // defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      {categories.contents.map((category) => (
        <Tabs.Tab key={category.id} label={category.name}>
          <Suspense>
            <CategoryProducts categoryId={category.id} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId)
  );

  if (productsByCategory.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    );
  }
  return (
    <Box className="bg-background grid grid-cols-2 gap-4 p-4">
      {productsByCategory.map((product) => (
        <ProductItem key={product.id} product={product} onQuantityChange={0} />
      ))}
    </Box>
  );
};

const CategoryPage: FC = () => {
  const categories = useRecoilValueLoadable(childCategoriesState);
  const currentCate = useRecoilValueLoadable(currentCateState);
  return (
    <Page className="flex flex-col">
      <Header
        title={
          currentCate.state === "hasValue" && currentCate.contents !== null
            ? currentCate.contents.name
            : ""
        }
      />
      <Box>
        {categories.state === "hasValue" && categories.contents !== null ? (
          <CategoryPicker />
        ) : (
          <Box />
        )}
      </Box>
    </Page>
  );
};

export default CategoryPage;
