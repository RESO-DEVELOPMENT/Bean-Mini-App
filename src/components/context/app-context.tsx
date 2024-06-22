import cart from "pages/cart";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from "react";
import { useRecoilState } from "recoil";
import { cartState } from "states/cart.state";
import { ProductList } from "types/cart";
import { Product } from "types/store-menu";
import { prepareCart } from "utils/product";

export interface ProductContextType {
  addNewItem: (
    product: Product,
    quantity: number,
    variantChosen: string
  ) => any;
  updateCart: (
    productInCart: ProductList,
    quantity: number,
    variantChosen: string
  ) => any;
}

const defaultContextValue: ProductContextType = {
    addNewItem: () => {},
    updateCart: () => {},
  };
const ProductContext = createContext<ProductContextType >(defaultContextValue);

export const useProductContext = (): ProductContextType => {
    return useContext(ProductContext);
  };

export const ProductContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    console.log("context")
  const [cart, setCart] = useRecoilState(cartState);

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

  const addNewItem = (
    product: Product,
    quantity: number,
    variantChosen: string
  ) => {
    console.log("thêm sản phẩm")

    setCart((prevCart) => {
      let anotherCart = { ...prevCart };
      if (product != null) {
        const cartItem: ProductList = {
          productInMenuId: product.menuProductId,
          parentProductId: product.parentProductId,
          name: product.name,
          type: product.type,
          quantity,
          sellingPrice: product.sellingPrice,
          code: product.code,
          categoryCode: product.code,
          totalAmount: product.sellingPrice * quantity,
          discount: product.discountPrice,
          finalAmount: product.sellingPrice * quantity - product.discountPrice,
          picUrl: product.picUrl,
          note: addNote("", variantChosen, product.name, true),
        };

        let res = {
          ...anotherCart,
          productList: cart.productList.concat(cartItem),
        };
        return prepareCart(res);
      }
      return prepareCart(anotherCart);
    });
  };

  const updateCart = (
    productInCart: ProductList,
    quantity: number,
    variantChosen: string
  ) => {
    setCart((prevCart) => {
      let anotherCart = { ...prevCart };
      if (productInCart) {
        if (variantChosen.length === 0) {
          const menuInProductIdToCheck = productInCart.productInMenuId;
          let newProductList = anotherCart.productList.map((item) => {
            if (item.productInMenuId === menuInProductIdToCheck) {
              return {
                ...item,
                totalAmount: item.sellingPrice * quantity,
                finalAmount: item.sellingPrice * quantity - item.discount,
                quantity: quantity,
                note: addNote(item.note || "", variantChosen, item.name, false),
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
        let newProductList = anotherCart.productList.map((item) => {
          console.log(item === productInCart);
          console.log(prevCart.productList.find((p) => p === productInCart));

          if (item === productInCart) {
            return {
              ...item,
              totalAmount: item.sellingPrice * quantity,
              finalAmount: item.sellingPrice * quantity - item.discount,
              quantity: quantity,
              note: addNote(item.note || "", variantChosen, item.name, false),
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
      return prepareCart(anotherCart);
    });
  };

  return (
    <ProductContext.Provider value={{ addNewItem, updateCart }}>
      {children}
    </ProductContext.Provider>
  );
};
