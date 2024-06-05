import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { childrenProductState } from "states/product.state";
import { cartState } from "../../states/cart.state";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { prepareCart } from "utils/product";
import { Box, Button, Text } from "zmp-ui";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface ProductPickerProps {
  product: Product;
  isUpdate: false;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}
export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  isUpdate,
  product,
}) => {
  const [cart, setCart] = useRecoilState(cartState);
  const childProducts = useRecoilValue(childrenProductState);
  let currentChild = childProducts
    .filter(
      (p) =>
        product &&
        product.type === ProductTypeEnum.PARENT &&
        p.parentProductId === product.id
    )
    .sort((a, b) => a.sellingPrice - b.sellingPrice);

  const [visible, setVisible] = useState(false);

  const [menuProductId, setMenuProductId] = useState(
    childProducts ? null : product?.menuProductId
  );

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setMenuProductId(
      product.type == ProductTypeEnum.SINGLE
        ? product.menuProductId
        : currentChild != null && currentChild != undefined
        ? currentChild[0].menuProductId
        : null
    );
    setQuantity(1);
  }, []);

  const addToCart = async () => {
    if (product) {
      setCart((prevCart) => {
        let res = { ...prevCart };

        const productToAdd =
          product.type == ProductTypeEnum.SINGLE
            ? product
            : currentChild.find((a) => a.menuProductId === menuProductId);

        let isProductInCart = false;
        const updatedProductList = res.productList.map((addedProduct) => {
          if (addedProduct.productInMenuId === productToAdd?.menuProductId) {
            isProductInCart = true;

            const productListObjectToUpdate = { ...addedProduct };

            productListObjectToUpdate.quantity += quantity;
            productListObjectToUpdate.totalAmount +=
              quantity * productToAdd.sellingPrice;
            productListObjectToUpdate.finalAmount +=
              quantity * productToAdd.sellingPrice - addedProduct.discount;

            return productListObjectToUpdate;
          }

          return addedProduct;
        });

        if (isProductInCart) {
          res = {
            ...prevCart,
            productList: updatedProductList,
          };
        } else {
          const cartItem: ProductList = {
            productInMenuId: productToAdd!.menuProductId,
            parentProductId: productToAdd!.parentProductId,
            name: productToAdd!.name,
            type: productToAdd!.type,
            quantity: quantity,
            sellingPrice: productToAdd!.sellingPrice,
            code: productToAdd!.code,
            categoryCode: productToAdd!.code,
            totalAmount: productToAdd!.sellingPrice * quantity,
            discount: productToAdd!.discountPrice,
            finalAmount:
              productToAdd!.sellingPrice * quantity -
              productToAdd!.discountPrice,
            picUrl: productToAdd!.picUrl,
          };

          res = {
            ...prevCart,

            productList: prevCart.productList.concat(cartItem),
          };
        }

        return prepareCart(res);
      });
    }

    setVisible(false);
  };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-4 ml">
                <Text.Title>{product.name}</Text.Title>
              
                <Box className="flex justify-between">
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description ?? "",
                      }}
                    ></div>
                  </Text>
                 
                </Box>
              </Box>
              <Box className="space-y-5">
                {
                  currentChild != null && currentChild.length > 0 && (
                    <SingleOptionPicker
                      key={product.menuProductId}
                      variant={currentChild}
                      defaultValue={""}
                      varianName={"Kích cỡ"}
                      value={menuProductId ?? ""}
                      onChange={(selectedOption) =>
                        setMenuProductId(selectedOption)
                      }
                    />
                  )
                
                }
                <QuantityPicker value={quantity} onChange={setQuantity} />
                {!isUpdate ? (
                  <Button
                    disabled={!menuProductId}
                    variant={quantity > 0 ? "primary" : "secondary"}
                    type={quantity > 0 ? "highlight" : "neutral"}
                    fullWidth
                    onClick={addToCart}
                  >
                    {quantity > 0
                      ? //  existed
                        //   ? "Cập nhật giỏ hàng"
                        //   :
                        "Thêm vào giỏ hàng"
                      : "Xoá"}
                  </Button>
                ) : (
                  <Button
                    disabled={!quantity}
                    variant="primary"
                    type="highlight"
                    fullWidth
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
