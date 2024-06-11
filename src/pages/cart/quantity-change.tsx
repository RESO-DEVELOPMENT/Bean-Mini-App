import { SingleOptionPicker } from "components/product/single-option-picker";
import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProductList } from "types/cart";
import { Product } from "types/store-menu";
import { Box, Button, Icon, Sheet, Text } from "zmp-ui";

export const QuantityChangeSection: FC<{
  handleChange: (product: Product | ProductList, quantity: number) => any;
  visible: boolean;
  setVisible: (visible: boolean) => void;

  product?: Product;
  currentChild?: Product[];
  menuProductId?: string;
  productChosen?: Product;
  setProductChosen?: any;
  productInCart: ProductList;
  isUpdate: boolean;
}> = ({
  handleChange,
  visible,
  setVisible,
  
  product,
  currentChild,
  productChosen,
  setProductChosen,
  productInCart,
  isUpdate,
}) => {
  const [quantity, setQuantity] = useState(
    productInCart ? productInCart.quantity : 1
  );
  useEffect(() => {
    setQuantity(productInCart ? productInCart.quantity : 1);
  }, [productChosen, productInCart]);
  return (
    <>
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight unmountOnClose={true}>
          {product && (
            <Box className="space-y-6 mt-2 " p={4}>
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
                    // console.log(productInCart);
                    handleChange(
                      productInCart ? productInCart : productChosen!,
                      quantity
                    );
                  }}
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
