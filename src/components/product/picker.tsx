import React, { FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { childrenProductState } from "states/product.state";
import { cartState } from "../../states/cart.state";
import { ProductList } from "types/cart";
import { Product, ProductTypeEnum } from "types/store-menu";
import { QuantityChangeSection } from "pages/cart/quantity-change";
import { useProductContext } from "components/context/app-context";


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
  const childProductsInMenu = useRecoilValue(childrenProductState);
  const {addNewItem, updateCart} = useProductContext();

  const currentChildOfProduct = childProductsInMenu
    .filter(
      (p) =>
        product &&
        product.type === ProductTypeEnum.PARENT &&
        p.parentProductId === product.id
    )
    .sort((a, b) => a.sellingPrice - b.sellingPrice);

  const productChildren =
    currentChildOfProduct.length > 0 ? [...currentChildOfProduct] : [product];

  const [productChosen, setProductChosen] = useState<Product>(
    productChildren.length > 0 ? productChildren[0] : product
  );

  const [visible, setVisible] = useState(false);
  const [productInCart, setProductInCart] = useState<ProductList | undefined>(
    cart.productList.find(
      (p) => p.productInMenuId === productChosen.menuProductId
    )
  );
  const [productInCartList, setProductInCartList] = useState<ProductList[]>(
    cart.productList.filter(
      (p) => p.productInMenuId === productChosen.menuProductId
    )
  );
  const [variantChosen, setVariantChosen] = useState<string>("");

  useEffect(() => {
    setProductInCartList(
      cart.productList.filter(
        (p) => p.productInMenuId === productChosen.menuProductId
      )
    );
    setProductInCart(
      cart.productList.find(
        (p) => p.productInMenuId === productChosen.menuProductId
      )
    );
  }, [cart, productChosen]);

  useEffect(() => {
    const initialVariantChosen = () => {
      if (!productInCart) {
        if (product.variants.length === 0 || !product.variants) return "";
        return `${product.variants[0].name}_${
          product.variants[0].value.split("_")[0]
        }`;
      }

      if (
        productInCart.note?.includes(product.name) &&
        product.variants.length > 0
      ) {
        const noteParts = productInCart.note.split(",");
        const targetNote = noteParts.find((np) => np.includes(product.name));
        return `${targetNote?.split("_")[1]}_${targetNote?.split("_")[2]}`;
      }
      return "";
    };

    setVariantChosen(initialVariantChosen());
  }, [productInCart, product]);

  

  

  
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
        productChildren={productChildren}
        
        productChosen={productChosen}
        setProductChosen={setProductChosen}

        productInCart={productInCart!}

        AddNewItem={addNewItem}
        updateCart={updateCart}

        variantChosen={variantChosen}
        setVariantChosen={setVariantChosen}

        setProductInCart={setProductInCart}
        productInCartList={productInCartList}
      />
    </>
  );
};

