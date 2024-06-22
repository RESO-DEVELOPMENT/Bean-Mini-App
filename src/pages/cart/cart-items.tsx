import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../states/cart.state";
import { ProductList } from "types/cart";
import { prepareCart } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";
import { QuantityChangeSection } from "./quantity-change";
import { Product } from "types/store-menu";
import { useProductContext } from "components/context/app-context";
export const CartItems: FC = () => {
  const [editingItem, setEditingItem] = useState<ProductList | undefined>();
  const [cart, setCart] = useRecoilState(cartState);
  const [visible, setVisible] = useState(false);
  const [productInCartChosen, setProductInCartChosen] = useState<ProductList>();

  const handleEditSheetShow = (productInCart: ProductList) => {
    setVisible(true);
    setProductInCartChosen(productInCart);
  };
  const { addNewItem, updateCart } = useProductContext();

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

  return (
    <Box className="py-3 px-4">
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
