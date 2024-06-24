import { ContentFallback } from "components/content-fallback";
import { DisplayValue } from "components/display/value";
import { Subscription } from "pages/profile";
import React, { FC, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { MemberLevel, MemberWallet } from "types/user";

import { Box, Button, Icon, Progress, Text } from "zmp-ui";

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
      <Box px={4} className="border-divider">
        {/* <Text.Title className="p-4 pb-0">Ví</Text.Title> */}
        <Box className="p-4 grid grid-cols-2 gap-4">
          {memberWallets.map((wallet) => (
            <MembershipWallet key={wallet.id} memberWallet={wallet} />
          ))}
        </Box>
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
    <Box p={2}
      className="bg-primary rounded-lg text-center relative shadow-lg text-white"
    >
      <Text size="large" className="font-semibold mb-2 ">
        {memberWallet.walletType.currency}
      </Text>
      {/* <Button
        variant="secondary"
        size="small"
        className="absolute top-2 right-0 text-white "
        onClick={toggleExpand}
    
      > */}
        <Text className="absolute top-2.5 right-2.5">{isExpanded ? <IoEye onClick={toggleExpand} /> :<IoEyeOff onClick={toggleExpand}/>  }</Text>
        {/* <Icon className="bg-none" icon={isExpanded ? "zi-chevron-up" : "zi-chevron-down"} /> */}
      {/* </Button> */}
      
        <Text size="normal" className="font-bold ">
          {isExpanded ? <DisplayValue
            value={memberWallet?.balance ?? 0}
            unit={memberWallet?.walletType.currency}
          />: "******"}
        </Text>
      
    </Box>
  );
};
