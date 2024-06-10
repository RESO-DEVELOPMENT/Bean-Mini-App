import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useState } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { cartState } from "../../states/cart.state";
import { Cart, ProductList } from "types/cart";
import { prepareCart } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";
import { QuantityChangeSection } from "./quantity-change";

export const CartItems: FC = () => {
  const [editingItem, setEditingItem] = useState<ProductList | undefined>();
  const [cart, setCart] = useRecoilState(cartState);

  const changeCartItemNumber = (productInMenuId: string, quantity: number) => {
    if (quantity == 0) {
      let toDeleteItem = cart.productList.find(
        (item) => item.productInMenuId === productInMenuId
      );
      return clearCartItem(toDeleteItem!);
    }
    setCart((prevCart) => {
      let newProductList = prevCart.productList.map((item) => {
        if (item.productInMenuId === productInMenuId) {
          return {
            ...item,
            totalAmount: item.sellingPrice * quantity,
            finalAmount: item.sellingPrice * quantity - item.discount,
            quantity: quantity,
          };
        }
        return item;
      });
      let res = {
        ...prevCart,
        productList: newProductList,
      };
      return prepareCart(res);
    });
  };

  const clearCartItem = (item: ProductList) => {
    setCart((prevCart) => {
      let res = { ...prevCart };
      res = {
        ...prevCart,
        productList: prevCart.productList.filter((x) => x.code !== item.code),
      };
      return prepareCart(res);
    });
  };

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
              <Box className="flex-initial">
              <QuantityChangeSection 
                id={item.productInMenuId}
                handleClick={changeCartItemNumber}
                quantity={item.quantity}
              />
                </Box>
              <Box onClick={() => clearCartItem(item)} className="flex-none" >
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
