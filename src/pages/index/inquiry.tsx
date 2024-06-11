import React from "react";
import { FC } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { phoneSearchState } from "states/member.state";
import { Box, Input, useNavigate } from "zmp-ui";

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={2} className="bg-white items-center flex flex-row">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Tìm nhanh đồ uống, món mới ..."
      />
    </Box>
  );
};


