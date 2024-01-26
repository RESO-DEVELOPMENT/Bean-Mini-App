import { CartIcon } from "components/cart-icon";
import React from "react";
import { FC } from "react";
import { Box, Input, useNavigate } from "zmp-ui";

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={2} className="bg-white items-center flex flex-row">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Tìm nhanh đồ uống, món mới ..."
      />
      {/* <Box
        onClick={() => navigate("/cart")}
        className="bg-white h-10 w-10 mx-2 border-solid border border-gray text-gray rounded-full p-2"
      >
        <CartIcon></CartIcon>
      </Box> */}
    </Box>
  );
};
