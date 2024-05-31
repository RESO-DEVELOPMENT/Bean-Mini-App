import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
// import { listBlogState } from "states/blog.state";
// import { Pagination } from "swiper";
import { listMembershipCardState } from "states/member.state";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box, Text } from "zmp-ui";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

export const Banner: FC = () => {
  // const blogList = useRecoilValueLoadable(listBlogState);

  const membershipCards = useRecoilValueLoadable(listMembershipCardState);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const gotoPage = () => {
    navigate("/qr");
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
        {membershipCards.state === "hasValue" &&
          membershipCards.contents?.map((card, i) => (
            <SwiperSlide
              key={i}
              className="px-4"
              onClick={() => navigate("/qr")}
            >
              <Box
                className="w-full rounded-xl aspect-[16/9] bg-cover bg-center bg-skeleton"
                style={{
                  backgroundImage: `url(${card.membershipCardType.cardImg})`,
                }}
              >
                <Text size="xLarge" className="p-4 text-white font-bold">
                  {card.membershipCardType.name}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
