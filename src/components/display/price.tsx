import React, { FC } from "react";
import { getConfig } from "utils/config";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  const symbol = getConfig((config) => config.template.currencySymbol);
  const shouldPrefixCurrencySymbol = getConfig(
    (config) => config.template.prefixCurrencySymbol
  );

  const formattedAmount = new Intl.NumberFormat("en-US").format(children);

  return (
    <>
      {shouldPrefixCurrencySymbol ? (
        <>
          {symbol}
          {formattedAmount}
        </>
      ) : (
        <>
          {formattedAmount}
          {symbol}
        </>
      )}
    </>
  );
};
