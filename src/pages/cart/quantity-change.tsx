import { SingleOptionPicker } from "components/product/single-option-picker";
import { SingleVariantPicker } from "components/product/single-variant-picker";
import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Cart, ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { Box, Button, Icon, Sheet, Text } from "zmp-ui";

export const QuantityChangeSection: FC<{
  handleChange: (product: Product | ProductList, quantity: number) => any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  product: Product;
  productInCart: ProductList;
  isUpdate: boolean;
  currentChild?: Product[];
  menuProductId?: string;
  productChosen?: Product;
  setProductChosen?: any;
}> = ({
  currentChild,
  isUpdate,
  handleChange,
  visible,
  setVisible,
  product,
  productInCart,
  productChosen,
  setProductChosen,
}) => {
  const productInCartToUse = productInCart;

  const [quantity, setQuantity] = useState(
    productInCart ? productInCart.quantity : 1
  );

  const [variantChosen, setVariantChosen] = useState<string>(() => {
    if (!productInCart) {
      if (product.variants.length == 0 || !product.variants) return "";
      return `${product.variants[0].name}_${
        product.variants[0].value.split("_")[0]
      }`;
    }
    return `${productInCart.attributes![0].name}_${
      productInCart.attributes![0].value
    }`;
  });

  // variantChosen={varirantChosen}
  // setVariantChosen={setVariantChosen}
  useEffect(() => {
    setQuantity(productInCartToUse ? productInCartToUse.quantity : 1);
  }, [productChosen, productInCart]);

  return (
    <>
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-4 ml">
                <Text.Title>{product.name}</Text.Title>
              </Box>

              <Box className="flex justify-between">
                <Text>{product.description}</Text>
              </Box>
              <Box className="space-y-5">
                {currentChild != null && currentChild.length > 0 && (
                  <SingleOptionPicker
                    key={product.id}
                    variant={currentChild}
                    defaultValue={""}
                    varianName={"Kích cỡ"}
                    value={productChosen!.menuProductId || ""}
                    onChange={(selectedOption) =>
                      setProductChosen(() => {
                        return currentChild.find(
                          (option) => option.menuProductId === selectedOption
                        )!;
                      })
                    }
                  />
                )}
              </Box>
              {product.variants.length > 0 && (
                <Box>
                  <SingleVariantPicker
                    variantName="Sốt"
                    onChange={(selectedOption) =>
                      setVariantChosen(selectedOption)
                    }
                    variants={product.variants}
                    defaultValue={variantChosen}
                    value={variantChosen}
                  />
                </Box>
              )}
              <Box className="flex items-center space-x-1">
                <Button
                  onClick={() =>
                    setQuantity((preQuantity) => {
                      if (preQuantity === 1) return preQuantity;
                      return preQuantity - 1;
                    })
                  }
                  variant="secondary"
                  type="neutral"
                  icon={
                    <div className="py-3 px-1">
                      <div className="w-full h-[2px] bg-black" />
                    </div>
                  }
                />
                <Box
                  flex
                  justifyContent="center"
                  alignItems="center"
                  className="flex-1"
                >
                  <Text size="large" className="font-medium">
                    Số lượng: {quantity}
                  </Text>
                </Box>
                <Button
                  onClick={() => {
                    // console.log("click", quantity);
                    setQuantity((preQuantity) => preQuantity + 1);
                  }}
                  variant="secondary"
                  type="neutral"
                  icon={<Icon icon="zi-plus" />}
                />
              </Box>

              
              <Box className="space-y-5">
                <Button
                  variant="primary"
                  type="highlight"
                  fullWidth
                  onClick={() => {
                    setVisible(false);
                    console.log(productInCartToUse);
                    handleChange(
                      productInCartToUse ? productInCartToUse : productChosen!,
                      quantity
                    );
                  }}
                  disabled={
                    productChosen?.type == ProductTypeEnum.PARENT &&
                    currentChild![0].type == ProductTypeEnum.PARENT
                  }
                >
                  {isUpdate ? "Cập nhật" : "Thêm vào giỏ hàng"}
                </Button>
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
