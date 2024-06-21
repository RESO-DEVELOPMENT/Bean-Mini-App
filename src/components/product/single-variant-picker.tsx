import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { ProductVariant } from "types/cart";
import { Box, Radio, Text } from "zmp-ui";

export const SingleVariantPicker: FC<{
  variants: ProductVariant[];
  variantName: string;
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
}> = ({ variants, value, defaultValue, onChange, variantName }) => {
  return (
    <Box my={4} className="space-y-2">
      <Text.Title size="small">{variantName}</Text.Title>
      <Radio.Group
        className="flex flex-col space-y-3"
        name={variantName}
        defaultValue={defaultValue}
        value={value}
        onChange={(selectedOption: string) => {
          onChange(selectedOption);
        }}
      >
        {variants.map((v, index) => {
          const values = v.value.split("_");
          return values.map((val, i) => (
            <Radio key={`${v.id}_${index}_${i}`} value={`${v.name}_${val}`}>
              <Box className="justify-between m-1 flex w-full">
                <Text
                  className={value === `${v.name}_${val}` ? "text-primary" : ""}
                >
                  {val}
                </Text>
              </Box>
            </Radio>
          ));
        })}
      </Radio.Group>
    </Box>
  );
};
