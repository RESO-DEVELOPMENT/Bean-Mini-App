import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
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

  const currentChildren =
    currentChildOfProduct.length > 0 ? [...currentChildOfProduct] : [product];

  const [productChosen, setProductChosen] = useState<Product>(
    currentChildren.length > 0 ? currentChildren[0] : product
  );

  const [visible, setVisible] = useState(false);

  const productInCart: ProductList | undefined = cart.productList.find(
    (p) => p.productInMenuId === productChosen.menuProductId
  );

  const [variantChosen, setVariantChosen] = useState<string>("");

  useEffect(() => {
    const initialVariantChosen = () => {
      if (!productInCart) {
        if (product.variants.length === 0 || !product.variants) return "";
        return `${product.variants[0].name}_${product.variants[0].value.split("_")[0]}`;
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

    setVariantChosen(initialVariantChosen);
  }, [productInCart, product]);

  function addNote(
    note: string,
    variantValue: string,
    productName: string,
    isAdd: boolean
  ) {
    if (isAdd && variantValue.length === 0) return note;
    if (isAdd && variantValue.length > 0)
      return note.concat(`${productName}_${variantValue},`);

    if (note.includes(productName)) {
      const noteParts = note.split(",");
      const newNote = noteParts.filter((np) => !np.includes(productName));
      return newNote.join(",").concat(`${productName}_${variantValue},`);
    }

    return note;
  }

  const changeCartItemNumber = useCallback(
    (
      product: Product | ProductList,
      quantity: number,
      addWhatEver: boolean,
      note?: string
    ) => {
      setCart((prevCart) => {
        let anotherCart = { ...prevCart };
        if (productInCart != null && !addWhatEver) {
          let newProductList = anotherCart.productList.map((item) => {
            if (
              item.productInMenuId === (product as ProductList).productInMenuId &&  item.note === (product as ProductList).note
            ) {
              return {
                ...item,
                totalAmount: item.sellingPrice * quantity,
                finalAmount: item.sellingPrice * quantity - item.discount,
                quantity: quantity,
                note: addNote(
                  item.note || "",
                  variantChosen,
                  item.name,
                  addWhatEver
                ),
              };
            }
            return item;
          });
          let res = {
            ...anotherCart,
            productList: newProductList,
          };
          return prepareCart(res);
        }

        const cartItem: ProductList = {
          productInMenuId: (product as Product).menuProductId,
          parentProductId: product.parentProductId,
          name: product.name,
          type: product.type,
          quantity,
          sellingPrice: product.sellingPrice,
          code: product.code,
          categoryCode: product.code,
          totalAmount: product.sellingPrice * quantity,
          discount: (product as Product).discountPrice,
          finalAmount:
            product.sellingPrice * quantity -
            (product as Product).discountPrice,
          picUrl: product.picUrl,
          note: addNote("", variantChosen, product.name, true),
        };

        let res = {
          ...anotherCart,
          productList: cart.productList.concat(cartItem),
        };
        return prepareCart(res);
      });
    },
    [setCart, cart.productList, productInCart, variantChosen]
  );

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
        variantChosen={variantChosen}
        setVariantChosen={setVariantChosen}
      />
    </>
  );
};
