import { ContentFallback } from "components/content-fallback";
import { DisplayValue } from "components/display/value";
import { Subscription } from "pages/profile";
import React, { FC, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { MemberLevel, MemberWallet } from "types/user";

import { Box, Text } from "zmp-ui";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// const NextButton = () => {
//   const swiper = useSwiper();
//   return (
//     <button onClick={() => swiper.slideNext()}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="25"
//         height="25"
//         fill="#04bfad"
//         className="bi bi-arrow-right-circle-fill"
//         viewBox="0 0 16 16"
//       >
//         <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
//       </svg>
//     </button>
//   );
// };

const SkeletonLoader: FC = () => {
  return (
    <Box
      p={4}
      height={150}
      className="bg-primary rounded-lg grid grid-cols-2 animate-pulse"
    >
      <div className="col-span-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="col-span-1 text-right space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2 ml-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 ml-auto"></div>
      </div>
      <div className="col-span-2 -mb-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </Box>
  );
};
interface MembershipWalletsProps {}
export const MembershipWallets: FC<MembershipWalletsProps> = () => {
  const memberLoadable = useRecoilValueLoadable(memberState);

  if (
    memberLoadable.state === "loading" ||
    memberLoadable.state === "hasError"
  ) {
    return <ContentFallback />;
  }
  if (memberLoadable.state === "hasValue" && memberLoadable.contents === null) {
    return <Subscription />;
  }
  if (memberLoadable.state === "hasValue" && memberLoadable.contents !== null) {
    console.log(memberLoadable.contents.memberLevel.memberWallet);
    const memberWallets = memberLoadable.contents.memberLevel.memberWallet;
    return (
      // <Box px={4} className="border-divider">
      //   {/* <Text.Title className="p-4 pb-0">Ví</Text.Title> */}
      //   <Swiper spaceBetween={0} slidesPerView={2}>
      //     {/* <Box className="p-4 grid grid-cols-2 gap-4"> */}
      //     <Box className="p-4">
      //       {memberWallets.map((wallet, index) => (
      //         <SwiperSlide key={`slide${index + 1}`} className="p-1">
      //           <MembershipWallet key={wallet.id} memberWallet={wallet} />
      //         </SwiperSlide>
      //       ))}
      //     </Box>
      //   </Swiper>
      // </Box>
      <Box m={4}>
        <Swiper spaceBetween={0} slidesPerView={2}>
          {memberWallets.map((wallet, index) => (
            <SwiperSlide key={`slide${index + 1}`} className="p-1">
              <MembershipWallet memberWallet={wallet} />
            </SwiperSlide>
          ))}
          {/* <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 border">
            <NextButton />
          </div> */}
        </Swiper>
      </Box>
    );
  }
  return <SkeletonLoader />;
};
interface MembershipWalletProps {
  memberWallet: MemberWallet;
}

const MembershipWallet: FC<MembershipWalletProps> = ({ memberWallet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
      onClick={toggleExpand}
        p={2}
        className="rounded-lg text-center relative border border-primary"
      >
        <Text size="large" className="font-semibold mb-2 ">
          {memberWallet.walletType.currency}
        </Text>

        <Text className="absolute top-2.5 right-2.5">
          {isExpanded ? (
            <IoEye  />
          ) : (
            <IoEyeOff />
          )}
        </Text>

        <Text size="normal" className="font-bold  ">
          {isExpanded ? (
            <DisplayValue
              value={memberWallet?.balance ?? 0}
              unit={memberWallet?.walletType.currency}
            />
          ) : (
            "******"
          )}
        </Text>
      </Box>
    </>
  );
};
