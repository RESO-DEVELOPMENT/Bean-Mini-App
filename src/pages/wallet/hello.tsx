import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import {
  useRecoilValueLoadable,
} from "recoil";

import logo from "static/logo.png";
import {userState} from 'states/user.state';
import { Membership } from "types/user";
export interface MemberBalanceProps {
  memberInfo?: Membership;
}
export const WelcomeUser: FC<MemberBalanceProps> = ({ memberInfo }) => {
  const user = useRecoilValueLoadable(userState);
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
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
