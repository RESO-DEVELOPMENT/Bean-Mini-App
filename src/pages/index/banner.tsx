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
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination]}
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
                className="w-full rounded-lg aspect-[4/3] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${blog.image})` }}
              />
            </SwiperSlide>
          ))}
        {/* {[1, 2, 3, 4, 5]
          .map((i) => getDummyImage(`banner-${i}.jpg`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))} */}
      </Swiper>
    </Box>
  );
};
