import { useToBeImplemented } from "hooks";
import React, { FC, Suspense } from "react";
import { Box, Icon, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { DisplayPrice } from "components/display/price";
import { CartIcon } from "components/cart-icon";
import { useNavigate } from "react-router";
import point from "static/point.png";
import wallet from "static/wallet.png";
import { MemberWallet, UserInfo } from "types/user";
import { DisplayValue } from "components/display/value";

export interface MemberBalanceProps {
  memberInfo?: UserInfo;
}
export const WalletBalance: FC<MemberBalanceProps> = ({ memberInfo }) => {
  const onClick = useToBeImplemented();
  const navigate = useNavigate();
  const pointWallet = memberInfo?.level.memberWallet.find(
    (e) => e.walletType.name === "POINT"
  );
  const monney = memberInfo?.level.memberWallet.find(
    (e) => e.walletType.name === "MONEY"
  );

  return (
    <Box className="bg-white flex  items-center flex-row  m-2 mt-4 ">
      <Box
        className="bg-white basis-1/2 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-2 ml-0.2"
        style={{ whiteSpace: "nowrap" }}
      >
        <img className="w-6 h-6 mr-0.1 " src={point} />
        <Text className="font-bold">
          <DisplayValue value={pointWallet?.balance ?? 0} unit=" Bean" />
        </Text>
      </Box>

      <Box className="bg-white basis-1/2 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-2 ml-2">
        <img className="w-6 h-6 mr-0.5" src={wallet} />
        <Text className="font-bold">
          <DisplayPrice>{monney?.balance ?? 0}</DisplayPrice>
        </Text>
      </Box>
      <Box
        onClick={() => navigate("/cart")}
        className="bg-white h-10 w-10 mx-2 border-solid border border-gray text-gray rounded-full p-2 ml-2"
      >
        <CartIcon></CartIcon>
      </Box>

      <Box
        onClick={() => navigate("/notification")}
        className="bg-white border-solid border border-gray text-gray rounded-full p-2 ml-1"
      >
        <Icon icon="zi-notif" />
      </Box>
    </Box>
    // <Box className="bg-white flex  items-center flex-row  m-2 ">
    //   <Box className="bg-white basis-1/3 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-1 mx-0.5">
    //     <img className="w-8 h-8" src={point} />
    //     <Text className="font-bold">
    //       <DisplayValue
    //         value={pointWallet?.balance ?? 0}
    //         unit={pointWallet?.walletType.currency}
    //       />
    //     </Text>
    //   </Box>

    //   <Box className=" basis-1/3 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-2 mx-1">
    //     <img className="w-6 h-6" src={wallet} />
    //     <Text className="font-bold">
    //       <DisplayPrice>{monney?.balance ?? 0}</DisplayPrice>
    //     </Text>
    //   </Box>
    //   {/* <Box
    //     onClick={() => navigate("/voucher")}
    //     className="bg-white border-solid border border-gray text-gray rounded-full p-2 ml-1"
    //   >
    //     <Icon icon="zi-inbox" />
    //   </Box> */}
    //   <Box
    //     onClick={() => navigate("/cart")}
    //     className="bg-white mx-1 border-solid border border-gray text-gray rounded-full p-2 ml-1"
    //   >
    //     <CartIcon></CartIcon>
    //   </Box>

    //   <Box
    //     onClick={() => navigate("/notification")}
    //     className="bg-white border-solid border border-gray text-gray rounded-full p-2 ml-1"
    //   >
    //     <Icon icon="zi-notif" />
    //   </Box>
    // </Box>
  );
};
