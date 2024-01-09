import { useToBeImplemented } from "hooks";
import React, { FC, Suspense } from "react";
import { Box, Icon, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { DisplayPrice } from "components/display/price";
import { CartIcon } from "components/cart-icon";
import { useNavigate } from "react-router";
import point from "static/point.png";
import wallet from "static/wallet.png";
import { MemberWallet } from "types/user";

export interface MemberBalanceProps {
  memberBalance?: MemberWallet[];
}
export const WalletBalance: FC<MemberBalanceProps> = ({ memberBalance }) => {
  const onClick = useToBeImplemented();
  const navigate = useNavigate();

  return (
    <Box className="bg-white flex  items-center flex-row  m-2 ">
      <Box className="bg-white  basis-1/3 items-center flex flex-row border-solid border border-gray text-gray  rounded-full p-2 mx-1">
        <img className="w-6 h-6 mr-1" src={point} />
        <Text className="font-bold">{30000}</Text>
      </Box>
      <Box className="bg-white  basis-1/3 items-center flex flex-row border-solid border border-gray text-gray  rounded-full p-2 mx-1">
        <img className="w-6 h-6 mr-1" src={wallet} />
        <Text className="font-bold">
          <DisplayPrice>{30000}</DisplayPrice>
        </Text>
      </Box>

      <Box
        onClick={() => navigate("/cart")}
        className="bg-white mx-1 border-solid border border-gray text-gray rounded-full p-2 ml-1"
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
  );
};
