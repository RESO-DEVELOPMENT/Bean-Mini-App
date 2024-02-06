import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  cartState,
  childrenProductState,
  memberState,
  phoneState,
  selectedStoreState,
  userState,
} from "state";
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

// function getDefaultOptions(product?: Product) {
//   if (product && product.type === ProductTypeEnum.PARENT) {
//     const product;

//     childProducts.filter(a);
//     return product.variants.reduce(
//       (options, variant) =>
//         Object.assign(options, {
//           [variant.key]: variant.default,
//         }),
//       {}
//     );
//   }
//   return {};
// }

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
  let existed = cart.productList.find((item) =>
    product.type == ProductTypeEnum.SINGLE
      ? item.productInMenuId === product.menuProductId
      : item.productInMenuId ===
        currentChild.find((a) => a.menuProductId === menuProductId)
          ?.menuProductId
  );

  console.log("exist hay ko", existed);
  const [quantity, setQuantity] = useState(existed?.quantity ?? 1);
  useEffect(() => {
    setQuantity(existed?.quantity ?? 1);
  }, [existed]);

  const addToCart = async () => {
    if (product) {
      setCart((prevCart) => {
        let res = { ...prevCart };
        if (existed) {
          console.log("curent cart", res.productList);
          let listProductCart = prevCart.productList.filter(
            (e) => existed?.productInMenuId !== e.productInMenuId
          );
          listProductCart.push({
            ...existed,
            quantity: quantity,
            totalAmount: existed.totalAmount * quantity,
          });

          res = {
            ...prevCart,
            productList: listProductCart,
          };
          console.log("cart res", res);
        } else {
          const productToAdd =
            product.type == ProductTypeEnum.SINGLE
              ? product
              : currentChild.find((a) => a.menuProductId === menuProductId);

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
            discount: 0,
            finalAmount: productToAdd!.sellingPrice * quantity,
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
                {/* <div className="flex justify-center items-center">
                  {" "}
                  <img
                    src={product.picUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover"
                  />
                </div> */}
                <Box className="flex justify-between">
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description ?? "",
                      }}
                    ></div>
                  </Text>
                  {/* <Text className="ml-40 font-bold">
                    <DisplayPrice>{product.sellingPrice}</DisplayPrice>
                  </Text> */}
                </Box>
              </Box>
              <Box className="space-y-5">
                {
                  currentChild && (
                    <SingleOptionPicker
                      key={product.menuProductId}
                      variant={currentChild}
                      defaultValue={existed ? existed.productInMenuId : ""}
                      varianName={"Kích cỡ"}
                      value={menuProductId ?? ""}
                      onChange={(selectedOption) =>
                        setMenuProductId(selectedOption)
                      }
                    />
                  )
                  // childProducts.map((variant) =>
                  //   variant.type === ProductTypeEnum.CHILD ? (
                  //     <SingleOptionPicker
                  //       key={variant.m}
                  //       variant={variant}
                  //       value={options[variant.key] as string}
                  //       onChange={(selectedOption) =>
                  //         setOptions((prevOptions) => ({
                  //           ...prevOptions,
                  //           [variant.key]: selectedOption,
                  //         }))
                  //       }
                  //     />
                  //   ) : (
                  //     <MultipleOptionPicker
                  //       key={variant.key}
                  //       product={product}
                  //       variant={variant}
                  //       value={options[variant.key] as string[]}
                  //       onChange={(selectedOption) =>
                  //         setOptions((prevOptions) => ({
                  //           ...prevOptions,
                  //           [variant.key]: selectedOption,
                  //         }))
                  //       }
                  //     />
                  //   )
                  // )
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
                      ? existed
                        ? "Cập nhật giỏ hàng"
                        : "Thêm vào giỏ hàng"
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
