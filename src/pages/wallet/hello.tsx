import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";

import logo from "static/logo.png";
import { listMembershipCardState } from "states/member.state";
import {userState} from 'states/user.state';
import wallet from "static/icon-bean.png";
import { DisplayValue } from "components/display/value";
import { Membership } from "types/user";
export interface MemberBalanceProps {
  memberInfo?: Membership;
}
export const WelcomeUser: FC<MemberBalanceProps> = ({ memberInfo }) => {
  const user = useRecoilValueLoadable(userState);
  console.log(user);
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
              {/* <Box className="flex" alignItems="center">
                <Text size="normal" className="font-bold text-primary flex">
                  <DisplayValue value={monney?.balance ?? 0} />
                  <img className="w-5 h-5 ml-1.5" src={wallet} />
                </Text>
              </Box> */}
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
