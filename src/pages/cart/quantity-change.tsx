import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SingleOptionPicker } from "components/product/single-option-picker";
import { SingleVariantPicker } from "components/product/single-variant-picker";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { Box, Button, Icon, Sheet, Text } from "zmp-ui";

export const QuantityChangeSection: FC<{
  updateCart: (
    productInCart: ProductList,
    quantity: number,
    variantChosen: string
  ) => any;
  AddNewItem: (
    product: Product,
    quantity: number,
    variantChosen: string
  ) => any;

  visible: boolean;
  setVisible: (visible: boolean) => void;
  product: Product;
  productInCart: ProductList;
  productChildren?: Product[];
  productChosen?: Product;
  setProductChosen?: any;
  variantChosen: string;
  setVariantChosen: any;
  productInCartList?: ProductList[];
  setProductInCart?: any;
}> = ({
  AddNewItem,
  updateCart,
  visible,
  setVisible,
  product,
  productInCart,
  productChildren,
  productChosen,
  setProductChosen,
  variantChosen,
  setVariantChosen,
  productInCartList,
  setProductInCart,
}) => {
  const [productInCartToUse, setProductInCartToUse] = useState<ProductList>();
  const [updateState, setUpdateState] = useState(
    productInCartToUse !== undefined || Object.keys(product).length === 0
  );
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    setQuantity(productInCart ? productInCart.quantity : 1);
  }, []);
  console.log("hiện")
  const handleChangeProductList = (chosenToChange: ProductList) => {
    if (productInCartList && productInCartList.length > 0) {
      const targetProductList = productInCartList.find(
        (p) => p === chosenToChange
      );
      if (targetProductList) {
        setProductInCart(targetProductList);
        setProductInCartToUse(targetProductList);
        setQuantity(targetProductList.quantity);
        setUpdateState(true);
      }
    }
  };

  const incrementQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);

  const decrementQuantity = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  const handleAddOrUpdate = (update: boolean) => {
    if (update) {
      updateCart(productInCart!, quantity, variantChosen);
    } else if (productChosen) AddNewItem(productChosen!, quantity, variantChosen);

    if (product.variants?.length === 0 || !product.variants) {
      setVisible(false);
      setUpdateState(true);
    } else {
      setUpdateState(false);
      setQuantity(1);
    }
  };
  const clearUpdate = () => {
    setUpdateState(false);
    setProductInCartToUse(undefined);
  };
  return createPortal(
    <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
      {product && (
        <Box p={4}>
          <Box className="space-y-2 ml">
            <Text.Title>{product.name}</Text.Title>
            <div className="flex justify-between">
              <Text>{product.description}</Text>
              {product.variants?.length > 0 &&
                (updateState ? (
                  <Box className="text-primary" onClick={clearUpdate}>
                    <Icon icon="zi-edit-delete-solid" />
                  </Box>
                ) : (
                  <Icon icon="zi-edit-delete" />
                ))}
            </div>
          </Box>

          {productInCartList &&
            productInCartList.length > 0 &&
            product.variants?.length > 0 && (
              <Box className="border border-primary my-2">
                {productInCartList.map((p, index) => (
                  <Box
                    key={`${p}_${index}`}
                    onClick={() => handleChangeProductList(p)}
                    className={`p-2 pl--2 flex justify-between ${
                      productInCartToUse === p
                        ? "bg-primary text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Text>{`${p.note?.split("_")[1]}_${
                      p.note?.split("_")[2]
                    }`}</Text>
                    <div className="flex">
                      <Text className="mr-2 ">{`x${p.quantity}`}</Text>
                    </div>
                  </Box>
                ))}
              </Box>
            )}

          {productChildren && productChildren.length > 0 && (
            <SingleOptionPicker
              key={product.id}
              variant={productChildren}
              defaultValue=""
              varianName="Kích cỡ"
              value={productChosen?.menuProductId || ""}
              onChange={(selectedOption) =>
                setProductChosen(
                  productChildren.find(
                    (option) => option.menuProductId === selectedOption
                  )!
                )
              }
            />
          )}

          {product.variants?.length > 0 && (
            <SingleVariantPicker
              variantName="Sốt"
              onChange={setVariantChosen}
              variants={product.variants}
              defaultValue={variantChosen}
              value={variantChosen}
            />
          )}

          <Box className="flex items-center py-4">
            <Button
              onClick={decrementQuantity}
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
              onClick={incrementQuantity}
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
              onClick={() => handleAddOrUpdate(updateState)}
              //second condition to handle error of the number of products in the server
              //Example: 1 PARENT PRODUCT WITHOUT CHILD PRODUCT
              disabled={
                (productInCartToUse === undefined &&
                  updateState &&
                  product.variants?.length > 0) ||
                (productChosen?.type == ProductTypeEnum.PARENT &&
                  productChildren![0].type == ProductTypeEnum.PARENT)
              }
            >
              {updateState ? "Cập nhật" : "Thêm vào giỏ hàng"}
            </Button>
          </Box>
        </Box>
      )}
    </Sheet>,
    document.body
  );
};
