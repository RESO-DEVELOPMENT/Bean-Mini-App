import React, { FC } from "react";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { listBlogState } from "state";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  const blogList = useRecoilValueLoadable(listBlogState);

  return (
    <Box className="bg-white" py={4}>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {blogList.state === "hasValue" &&
          blogList.contents.map((blog, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[16/9] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${blog.image})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
