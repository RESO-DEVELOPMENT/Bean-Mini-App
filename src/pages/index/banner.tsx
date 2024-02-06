import React, { FC } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { listBlogState, memberState } from "state";
// import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box, Text } from "zmp-ui";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Barcode from "react-barcode";

export const Banner: FC = () => {
  // const blogList = useRecoilValueLoadable(listBlogState);

  const member = useRecoilValueLoadable(memberState);
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
        {member.state === "hasValue" &&
          member.contents?.level.membershipCard.map((card, i) => (
            <SwiperSlide
              key={i}
              className="px-4"
              // onClick={() => gotoPage(card.id)}
            >
              <Box
                className="w-full rounded-xl aspect-[16/9] bg-cover bg-center bg-skeleton"
                style={{
                  backgroundImage: `url(${card.membershipCardType.cardImg})`,
                }}
              >
                <Text size="xLarge" className="p-2 text-white font-bold">
                  {card.membershipCardCode}
                </Text>
                <Text size="xLarge" className="px-2 text-white font-bold">
                  {card.membershipCardType.name}
                </Text>
                {/* <Barcode
                  displayValue={false}
                  marginLeft={12}
                  textPosition="bottom"
                  marginBottom={12}
                  textAlign="center"
                  lineColor="#04bfad"
                  height={48}
                  margin={12}
                  width={2}
                  background="white"
                  value={card.membershipCardCode}
                /> */}
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
