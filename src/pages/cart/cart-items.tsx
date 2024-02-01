import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useState } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { cartState } from "state";
import { Cart, ProductList } from "types/cart";
import { prepareCart } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";

export const CartItems: FC = () => {
  const [editingItem, setEditingItem] = useState<ProductList | undefined>();
  const [cart, setCart] = useRecoilState(cartState);

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
        // <ProductPicker product={editingItem} isUpdate={false}>
        //   {({ open }) => (
        //     <ListRenderer
        //       items={cart.productList}
        //       limit={3}
        //       onClick={(item) => {
        //         setEditingItem(item);
        //         open();
        //       }}
        //       renderKey={({ quantity }) => JSON.stringify({ quantity })}
        //       renderLeft={(item) => (
        //         <img className="w-10 h-10 rounded-lg" src={item.picUrl} />
        //       )}
        //       renderRight={(item) => (
        //         <Box flex className="space-x-1">
        //           <Box className="space-y-1 flex-1">
        //             <Text size="small">{item.name}</Text>
        //             <Text className="text-gray" size="xSmall">
        //               {/* <FinalPrice options={item.options}>
        //                 {item.product}
        //               </FinalPrice> */}
        //               <DisplayPrice>{item.finalAmount}</DisplayPrice>
        //             </Text>
        //             {/* <Text className="text-gray" size="xxxSmall">
        //               <DisplaySelectedOptions options={item.options}>
        //                 {item.product}
        //               </DisplaySelectedOptions>
        //             </Text> */}
        //           </Box>
        //           <Text className="text-primary font-medium" size="small">
        //             x{item.quantity}
        //           </Text>
        //         </Box>
        //       )}
        //     />
        //   )}
        // </ProductPicker>
        <ListRenderer
          items={cart.productList}
          limit={3}
          onClick={(item) => {
            setEditingItem(item);
            open();
          }}
          renderKey={(item) => JSON.stringify(item.code)}
          renderLeft={(item) => (
            <img className="w-10 h-10 rounded-lg" src={item.picUrl} />
          )}
          renderRight={(item) => (
            <Box flex className="space-x-1">
              <Box className="space-y-1 flex-1">
                <Text size="small">{item.name}</Text>
                <div className="flex">
                  <Text className="text-primary font-medium pr-2" size="small">
                    x{item.quantity}
                  </Text>
                  <Text className="text-gray" size="xSmall">
                    <DisplayPrice>{item.finalAmount}</DisplayPrice>
                  </Text>
                </div>
              </Box>
              <Box onClick={() => clearCartItem(item)}>
                <Icon icon="zi-delete" className="mt-2 text-red-500" />
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
