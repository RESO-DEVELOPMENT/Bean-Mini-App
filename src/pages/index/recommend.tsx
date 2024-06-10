import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { Section } from "components/section";
import { ProductPicker } from "components/product/picker";
import { DisplayPrice } from "components/display/price";
import { ProductSlideSkeleton } from "components/skeletons";
import { recommendProductsState } from "states/product.state";

const ProductItem: FC<{ product: any }> = ({ product }) => (
  <ProductPicker product={product} isUpdate={false}>
    {({ open }) => (
      <div onClick={open} className="space-y-3 ml-3">
        <Box
          className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
          style={{ backgroundImage: `url(${product.picUrl})` }}
        >
          <Text
            size="small"
            className="absolute right-2 top-2 bg-primary text-white h-5 px-[8px] rounded-full"
          >
            <DisplayPrice>{product.sellingPrice}</DisplayPrice>
          </Text>
        </Box>
        <Box className="space-y-1">
          <Text size="normal">{product.name}</Text>
        </Box>
      </div>
    )}
  </ProductPicker>
);

const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);
  // console.log("vào recommend");
  return (
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16}>
        {recommendProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

const RecommendFallback: FC = () => (
  <Section title="Gợi ý cho bạn" padding="title-only">
    <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
      {[...Array(5)].map((_, i) => (
        <SwiperSlide key={i}>
          <ProductSlideSkeleton />
        </SwiperSlide>
      ))}
    </Swiper>
  </Section>
);

export const Recommend: FC = () => (
  <Suspense fallback={<RecommendFallback />}>
    <RecommendContent />
  </Suspense>
);
