import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../states/cart.state";
import { Cart, ProductList } from "types/cart";
import { prepareCart } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";
import { QuantityChangeSection } from "./quantity-change";
import { Product } from "types/store-menu";
export const CartItems: FC = () => {
  const [editingItem, setEditingItem] = useState<ProductList | undefined>();
  const [cart, setCart] = useRecoilState(cartState);
  const [visible, setVisible] = useState(false);
  const [productInCartChosen, setProductInCartChosen] = useState<ProductList>();

  const handleEditSheetShow = (productInCart: ProductList) => {
    setVisible(true);
    setProductInCartChosen(productInCart);
  };
  // const changeCartItemNumber = (product: ProductList, quantity: number) => {
  //   setCart((prevCart) => {
  //     let newProductList = prevCart.productList.map((item) => {
  //       if (item === (product as ProductList)!) {
  //         return {
  //           ...item,
  //           totalAmount: item.sellingPrice * quantity,
  //           finalAmount: item.sellingPrice * quantity - item.discount,
  //           quantity: quantity,
  //           // note: addNote(
  //           //   item.note || "",
  //           //   variantChosen,
  //           //   item.name,
  //           //   addWhatEver
  //           // ),
  //         };
  //       }
  //       return item;
  //     });
  //     let res = {
  //       ...prevCart,
  //       productList: newProductList,
  //     };
  //     return prepareCart(res);
  //   });
  // };

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

  const addNewItem = (product: Product, quantity: number) => {
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
          // note: product.variants.length > 0 ? addNote("", variantChosen, product.name, true) : "",
          note:
            product.variants.length > 0
              ? addNote("", "", product.name, true)
              : "",
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

  const clearCartItem = (item: ProductList) => {
    setCart((prevCart) => {
      let res = { ...prevCart };
      res = {
        ...prevCart,
        productList: prevCart.productList.filter((x) => x !== item),
      };
      return prepareCart(res);
    });
  };
  console.log(cart);
  return (
    <Box className="py-3 px-4">
      {cart.productList.length > 0 ? (
        <ListRenderer
          items={cart.productList}
          limit={3}
          onClick={(item) => {
            setEditingItem(item);
            open();
          }}
          renderKey={(item) => JSON.stringify(item.code)}
          renderLeft={(item) => (
            <Text className="text-primary font-medium p-2" size="small">
              x{item.quantity}
            </Text>
          )}
          renderRight={(item) => (
            <Box flex className="space-x-1">
              <Box className="space-y-1 flex-1">
                <Text size="small">{item.name}</Text>
                <div className="flex">
                  <Text className="text-gray" size="xSmall">
                    <DisplayPrice>{item.finalAmount}</DisplayPrice>
                  </Text>
                </div>
              </Box>
              <Box
                className="flex-initial"
                onClick={() => handleEditSheetShow(item)}
              >
                <Icon icon="zi-edit" className="mt-1 text-primary" />
              </Box>
              {productInCartChosen && (
                <QuantityChangeSection
                  AddNewItem={addNewItem}
                  updateCart={updateCart}
                  visible={visible}
                  setVisible={setVisible}
                  product={{} as Product}
                  productInCart={productInCartChosen}
                  variantChosen=""
                  setVariantChosen={[]}
                />
              )}
              <Box onClick={() => clearCartItem(item)} className="flex-initial">
                <Icon icon="zi-delete" className="mt-1 text-red-500" />
              </Box>
            </Box>
          )}
        />
      ) : (
        <Text
          className="bg-background rounded-xl py-8 px-4 text-center text-gray"
          size="xxSmall"
        >
          Không có sản phẩm trong giỏ hàng
        </Text>
      )}
    </Box>
  );
};
