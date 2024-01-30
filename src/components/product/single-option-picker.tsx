import React, { FC } from "react";
import { Product } from "types/store-menu";
import { Box, Radio, Text } from "zmp-ui";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

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
        className="flex flex-col space-y-4"
        name={varianName}
        value={value}
        onChange={(selectedOption: string) => {
          onChange(selectedOption);
        }}
      >
        {variant.map((option) => (
          <Radio
            key={option.menuProductId}
            value={option.menuProductId}
            className={value === option.menuProductId ? "font-bold" : ""}
          >
            {option.size + " " + formatPrice(option.sellingPrice) + " đ"}
          </Radio>
        ))}
      </Radio.Group>
    </Box>
  );
};
