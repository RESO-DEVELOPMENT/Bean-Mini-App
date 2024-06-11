import React, { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { childrenProductState } from "states/product.state";
import { cartState } from "../../states/cart.state";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { prepareCart } from "utils/product";
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

  const childProductsInMenu = useRecoilValue(childrenProductState);

  let currentChildOfProduct = childProductsInMenu
    .filter(
      (p) =>
        product &&
        product.type === ProductTypeEnum.PARENT &&
        p.parentProductId === product.id
    )
    .sort((a, b) => a.sellingPrice - b.sellingPrice);
  //lưu lại các sản phẩm con
  const currentChildren = currentChildOfProduct
    ? [...currentChildOfProduct]
    : [product];
  const [productChosen, setProductChosen] = useState<Product>(
    currentChildren ? currentChildren![0] : ({} as Product)
  );
  const [visible, setVisible] = useState(false);
  //lưu lại productList nếu đã có
  const productInCart = cart!.productList.find(
    (p) => p.productInMenuId === productChosen.menuProductId
  );

  const changeCartItemNumber = (
    product: Product | ProductList,
    quantity: number
  ) => {
    setCart((prevCart) => {
      let anotherCart = { ...prevCart };
      if (productInCart != null) {
        let newProductList = anotherCart.productList.map((item) => {
          if (
            item.productInMenuId === (product as ProductList).productInMenuId
          ) {
            return {
              ...item,
              totalAmount: item.sellingPrice * quantity,
              finalAmount: item.sellingPrice * quantity - item.discount,
              quantity: quantity,
            };
          }
          return item;
        });
        // console.log(newProductList);
        let res = {
          ...anotherCart,
          productList: newProductList,
        };
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
      };
      let res = {
        ...anotherCart,
        productList: cart.productList.concat(cartItem),
      };
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
        product={product}
        productInCart={productInCart!}
        handleChange={changeCartItemNumber}
        isUpdate={productInCart != null}
        currentChild={currentChildren}
        productChosen={productChosen}
        setProductChosen={setProductChosen}
      ></QuantityChangeSection>
    </>
  );
};
