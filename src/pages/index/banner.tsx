import React, { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { listBlogState } from "state";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  const blogList = useRecoilValueLoadable(listBlogState);

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      clickable: true,
    },
  };

  return (
    <Box className="bg-white" pb={4}>
      {blogList.state === "hasValue" && (
        <Swiper {...swiperParams}>
          {blogList.contents.map((blog, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-70 rounded-lg aspect-[18/9] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${blog.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};
