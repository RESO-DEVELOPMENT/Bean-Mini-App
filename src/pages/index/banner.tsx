import React, { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { listBlogState } from "state";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  const blogList = useRecoilValueLoadable(listBlogState);
  const navigate = useNavigate();
  const gotoPage = (id: string) => {
    navigate("/blog", { state: { id } });
  };
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
            <SwiperSlide
              key={i}
              className="px-4"
              onClick={() => gotoPage(blog.id)}
            >
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
