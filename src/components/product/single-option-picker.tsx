import React, { FC } from "react";
import { Product } from "types/store-menu";
import { Box, Radio, Text } from "zmp-ui";

export const SingleOptionPicker: FC<{
  variant: Product[];
  value: string;
  varianName: string;
  onChange: (value: string) => void;
}> = ({ variant, value, varianName, onChange }) => {
  return (
    <Box my={4} className="space-y-2">
      <Text.Title size="small">{varianName}</Text.Title>
      <Radio.Group
        className="flex-1 grid grid-cols-3  justify-between"
        name={varianName}
        options={variant.map((option) => ({
          value: option.menuProductId,
          label: option.size + " " + option.sellingPrice + " đ",
        }))}
        value={value}
        onChange={(selectedOption: string) => {
          onChange(selectedOption);
        }}
      />
    </Box>
  );
};
