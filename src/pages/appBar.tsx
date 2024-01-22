import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";

// Assuming zmp-ui components are already typed, if not, you might need to add type definitions
export const AppBar: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] bg-emerald-300"
      showBackIcon={false}
      title={
        <Box
          flex
          justifyContent="center"
          alignItems="center"
          className="w-full"
        >
          <Text className="font-bold text-center ml-32 mr-14 mb-5 mt-5 text-white text-3xl">
            Đổi Điểm
          </Text>
        </Box>
      }
    />
  );
};

export default AppBar;
