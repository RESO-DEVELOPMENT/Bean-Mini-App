import React, { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { listBlogState } from "state";
// import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const Banner: FC = () => {
  const blogList = useRecoilValueLoadable(listBlogState);
  const navigate = useNavigate();
  const gotoPage = (id: string) => {
    navigate("/blog", { state: { id } });
  };
  return (
    <Box style={{ overflowX: "hidden" }} py={4}>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
