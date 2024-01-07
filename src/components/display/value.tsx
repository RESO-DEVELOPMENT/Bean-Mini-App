// DisplayValue.tsx
import React, { FC } from "react";

interface DisplayValueProps {
  value: number;
  unit?: string;
}

const cleanValue = (value: number): number => {
  const cleanedString = value.toString().replace(/[^\d]/g, "");
  return Number(cleanedString);
};

const DisplayValue: FC<DisplayValueProps> = ({ value, unit = "" }) => {
  const cleanedValue = cleanValue(value);

  return (
    <>
      {cleanedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {unit}
    </>
  );
};

export { DisplayValue };
