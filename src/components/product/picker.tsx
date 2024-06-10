import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { childrenProductState } from "states/product.state";
import { cartState } from "../../states/cart.state";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { prepareCart } from "utils/product";
import { Box, Button, Text } from "zmp-ui";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";
import { memberState } from "states/member.state";
import { QuantityChangeSection } from "pages/cart/quantity-change";

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

  // const member = useRecoilValueLoadable(memberState);
  const [cart, setCart] = useRecoilState(cartState);
  const childProducts = useRecoilValue(childrenProductState);
  let productInCart = cart.productList.find(
    (p) => p.productInMenuId === product?.menuProductId
  );
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

  // const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    let menuProductIdToSet =
      product.type == ProductTypeEnum.SINGLE
        ? product.menuProductId
        : currentChild != null && currentChild != undefined
        ? currentChild[0].menuProductId
        : null;
       
    setMenuProductId(menuProductIdToSet);
    // setQuantity(1);
  }, []);

  // const addToCart = async (product: Product, quantity?: number) => {
  //   if (product) {
  //     setCart((prevCart) => {
  //       let res = { ...prevCart };

  //       const productToAdd =
  //         product.type == ProductTypeEnum.SINGLE
  //           ? product
  //           : currentChild.find((a) => a.menuProductId === menuProductId);

  //       let isProductInCart = false;
  //       const updatedProductList = res.productList.map((addedProduct) => {
  //         if (addedProduct.productInMenuId === productToAdd?.menuProductId) {
  //           isProductInCart = true;

  //           const productListObjectToUpdate = { ...addedProduct };

  //           productListObjectToUpdate.quantity += quantity!;
  //           productListObjectToUpdate.totalAmount +=
  //             quantity! * productToAdd.sellingPrice;
  //           productListObjectToUpdate.finalAmount +=
  //             quantity! * productToAdd.sellingPrice - addedProduct.discount;

  //           return productListObjectToUpdate;
  //         }

  //         return addedProduct;
  //       });

  //       if (isProductInCart) {
  //         res = {
  //           ...prevCart,
  //           productList: updatedProductList,
  //           // customerId: member?.contents?.membershipId || null,
  //         };
  //       } else {
  //         const cartItem: ProductList = {
  //           productInMenuId: productToAdd!.menuProductId,
  //           parentProductId: productToAdd!.parentProductId,
  //           name: productToAdd!.name,
  //           type: productToAdd!.type,
  //           quantity: quantity!,
  //           sellingPrice: productToAdd!.sellingPrice,
  //           code: productToAdd!.code,
  //           categoryCode: productToAdd!.code,
  //           totalAmount: productToAdd!.sellingPrice * quantity!,
  //           discount: productToAdd!.discountPrice,
  //           finalAmount:
  //             productToAdd!.sellingPrice * quantity! -
  //             productToAdd!.discountPrice,
  //           picUrl: productToAdd!.picUrl,
  //         };

  //         res = {
  //           ...prevCart,
  //           // customerId: member?.contents?.membershipId || null,
  //           productList: prevCart.productList.concat(cartItem),
  //         };
  //       }

  //       return prepareCart(res);
  //     });
  //   }

  //   setVisible(false);
  // };

  const changeCartItemNumber = (product: Product | ProductList, quantity: number) => {
    console.log(product);
    console.log(productInCart);

    setCart((prevCart) => {
      let anotherCart = {...prevCart}
      if(productInCart != null) {
        console.log("CÓ");
        let newProductList = anotherCart.productList.map((item) => {
          if (item.productInMenuId === (product as ProductList).productInMenuId) {
            console.log("CÓ");
            return {
              ...item,
              totalAmount: item.sellingPrice * quantity,
              finalAmount: item.sellingPrice * quantity - item.discount,
              quantity: quantity,
            };
          }
          return item;
          });
        console.log(newProductList);
        let res = {
          ...anotherCart,
          productList: newProductList,
          
        };
        console.log("đổi số lượng")
        return prepareCart(res);
      }
      const cartItem: ProductList = {
        productInMenuId: (product as Product)!.menuProductId,
        parentProductId: product!.parentProductId,
        name: product!.name,
        type: product!.type,
        quantity: quantity!,
        sellingPrice: product!.sellingPrice,
        code: product!.code,
        categoryCode: product!.code,
        totalAmount: product!.sellingPrice * quantity!,
        discount: (product as Product).discountPrice,
        finalAmount:
        product!.sellingPrice * quantity! -
        (product as Product)!.discountPrice,
        picUrl: product!.picUrl,
      }
      let res = {
        ...anotherCart,
        productList: cart.productList.concat(cartItem),
      };
      console.log("thêm sản phẩm", cartItem)
      return prepareCart(res);
    });
  };

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}

      <QuantityChangeSection
        visible={visible}
        setVisible={setVisible}
        product={productInCart || product}
        handleChange={changeCartItemNumber}
        isUpdate={productInCart != null}
        currentChild={currentChild}
        setMenuProductId={setMenuProductId}
        menuProductId={menuProductId!}
      ></QuantityChangeSection>
    </>
  );
};
