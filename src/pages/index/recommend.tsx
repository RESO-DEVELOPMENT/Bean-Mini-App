import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="">
        {recommendProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductPicker product={product} isUpdate={false}>
              {({ open }) => (
                <div onClick={open} className="space-y-3 ml-3">
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${product.picUrl})` }}
                  >
                    <Text
                      size="small"
                      className="absolute right-2 top-2  bg-primary text-white h-5 px-[8px] rounded-full"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(5)];

  return (
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
