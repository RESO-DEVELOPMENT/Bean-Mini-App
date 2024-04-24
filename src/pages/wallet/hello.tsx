import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";

import logo from "static/logo.png";
import { UserInfo } from "types/user";
import { userState } from "state";
import wallet from "static/icon-bean.png";
import { DisplayValue } from "components/display/value";
export interface MemberBalanceProps {
  memberInfo?: UserInfo;
}
export const WelcomeUser: FC<MemberBalanceProps> = ({ memberInfo }) => {
  const user = useRecoilValueLoadable(userState);
  const monney = memberInfo?.level.memberWallet.find(
    (e) => e.walletType.name === "MONEY"
  );
  return (
    <Header
      className={`app-header no-border pl-4 flex-none pb-[6px] custom-header`}
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-8 h-8 rounded-lg border-inset"
              src={user.contents.avatar || logo}
            />

            <Box>
              <Text className=" flex">
                <Text className="mr-1.5 font-bold">Chào</Text>
                {user.state === "hasValue" ? (
                  <Text className="font-bold">{user.contents.name}</Text>
                ) : (
                  <Text className="font-bold">...</Text>
                )}
              </Text>
              <Box className="flex" alignItems="center">
                <Text size="normal" className="font-bold text-primary flex">
                  <DisplayValue value={monney?.balance ?? 0} />
                  <img className="w-5 h-5 ml-1.5" src={wallet} />
                </Text>
              </Box>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
