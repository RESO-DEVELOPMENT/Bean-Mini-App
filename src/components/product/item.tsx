import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import React, { FC, useState } from "react";
import { Product } from "types/store-menu";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{
  product: Product;
  onQuantityChange: number;
}> = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  return (
    <ProductPicker product={product} isUpdate={false}>
      {({ open }) => (
        <div className="space-y-2 relative" onClick={open}>
          {quantity > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="w-9 absolute bottom-0 right-0"
            >
              <circle
                cx="15"
                cy="15"
                r="11"
                stroke="#04bfad"
                strokeWidth="1"
                fill="white"
              />
              <text
                x="50%"
                y="50%"
                fontSize="15"
                textAnchor="middle"
                dy=".3em"
                fill="#04bfad"
              >
                {quantity}
              </text>
            </svg>
          )}
          <Box className="w-full aspect-square relative">
            <img
              loading="lazy"
              src={product.picUrl}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </Box>
          <Text>{product.name}</Text>
          <Text size="xxSmall" className="text-gray pb-2">
            <DisplayPrice>{product.sellingPrice}</DisplayPrice>
          </Text>
        </div>
      )}
    </ProductPicker>
  );
};
