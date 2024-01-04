import orderApi from "api/order";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  cartState,
  childrenProductState,
  phoneState,
  selectedStoreState,
  userState,
} from "state";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { countCartAmount } from "utils/product";
import { Box, Button, Text } from "zmp-ui";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface ProductPickerProps {
  product?: Product;
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
  const childProducts = useRecoilValue(childrenProductState);

  let currentChild = childProducts
    .filter(
      (p) =>
        product &&
        product.type === ProductTypeEnum.PARENT &&
        p.parentProductId === product.id
    )
    .sort((a, b) => b.displayOrder - a.displayOrder);
  const [visible, setVisible] = useState(false);
  // const [options, setOptions] = useState<SelectedOptions>(
  //   selected ? selected.options : getDefaultOptions(product)
  // );

  const [menuProductId, setMenuProductId] = useState(
    childProducts ? null : product?.menuProductId
  );

  const [quantity, setQuantity] = useState(1);
  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = async () => {
    if (product) {
      setCart((prevCart) => {
        let res = { ...prevCart };
        if (isUpdate) {
          // updating an existing cart item, including quantity and size, or remove it if new quantity is 0
          // const editing = cart.productList.find(
          //   (item) => item.productInMenuId === product.menuProductId
          // )!;
          // if (quantity === 0) {
          //   res.splice(cart.productList.indexOf(editing), 1);
          // } else {
          //   const existed = cart.productList.find(
          //     (item, i) =>
          //       i !== cart.productList.indexOf(editing) &&
          //       item.productInMenuId === product.menuProductId
          //   )!;
          //   res.splice(cart.productList.indexOf(editing), 1, {
          //     ...editing,
          //     quantity: existed ? existed.quantity + quantity : quantity,
          //   });
          //   if (existed) {
          //     res.splice(cart.productList.indexOf(existed), 1);
          //   }
          // }
        } else {
          // adding new item to cart, or merging if it already existed before
          // const existed = cart.productList.find(
          //   (item) => item.productInMenuId === product.menuProductId
          // );
          // if (existed) {
          //   res.splice(cart.productList.indexOf(existed), 1, {
          //     ...existed,
          //     quantity: existed.quantity + quantity,
          //   });
          // } else {
          //   res = res.productList.concat{
          //   }
          // }
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
            customerPhone: phone,
            customerName: user.name,
            productList: prevCart.productList.concat(cartItem),
          };
        }
        orderApi.prepareOrder(countCartAmount(res)).then((value) => {
          console.log("prepareCart", value.data);
          return value.data;
        });
        return res;
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
              <Box className="space-y-2">
                <Text.Title>{product.name}</Text.Title>
                <Text>
                  {/* <FinalPrice options={options}>{product}</FinalPrice> */}
                </Text>
                <Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? "",
                    }}
                  ></div>
                </Text>
              </Box>
              <Box className="space-y-5">
                {
                  currentChild && (
                    <SingleOptionPicker
                      key={product.menuProductId}
                      variant={currentChild}
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
                      ? isUpdate
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
