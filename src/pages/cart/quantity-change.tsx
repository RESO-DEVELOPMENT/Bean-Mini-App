import React, { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Box, Text } from "zmp-ui";

export const QuantityChangeSection: FC<{
  id: string;
  quantity: number;
  handleClick: (
    productInMenuId: string,
    quantity: number,
  ) => any;
}> = ({ id, quantity, handleClick }) => {
  return (
    <Box className="flex items-center space-x-1">
      <Box
        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        onClick={() => handleClick(id, quantity - 1)}
      >
        <FaMinus className="text-gray-600" />
      </Box>
      <Box className="w-6 text-center">
        <Text size="small" className="text-gray-800">
          {quantity}
        </Text>
      </Box>
      <Box
        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        onClick={() => handleClick(id, quantity + 1)}
      >
        <FaPlus className="text-gray-600" />
      </Box>
    </Box>
  );
};
