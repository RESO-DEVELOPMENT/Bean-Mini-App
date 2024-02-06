import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, productsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);
  const cart = useRecoilValue(cartState);

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onQuantityChange={0}
          />
        ))}
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
