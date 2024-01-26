import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";

export const WelcomeUser: FC = () => {
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
              <Text size="xSmall">Welcome</Text>
              {user.state === "hasValue" ? (
                <Text.Title className="text-primary">
                  {user.contents.name}!
                </Text.Title>
              ) : (
                <Text>...</Text>
              )}
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
