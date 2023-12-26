import React, { FC, useMemo } from "react";
import { SelectedOptions } from "types/cart";
import { Product } from "types/store-menu";
import { calcFinalPrice } from "utils/product";
import { DisplayPrice } from "./price";

export const FinalPrice: FC<{
  children: Product;
  options?: SelectedOptions;
}> = ({ children, options }) => {
  const finalPrice = useMemo(
    () => calcFinalPrice(children),
    [children, options]
  );
  return <DisplayPrice>{finalPrice}</DisplayPrice>;
};
