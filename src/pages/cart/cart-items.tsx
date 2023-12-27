import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "state";
import { ProductList } from "types/cart";
import { Box, Text } from "zmp-ui";

export const CartItems: FC = () => {
  const cart = useRecoilValue(cartState);
  const [editingItem, setEditingItem] = useState<ProductList | undefined>();

  console.log(cart);

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
          renderKey={({ quantity }) => JSON.stringify({ quantity })}
          renderLeft={(item) => (
            <img className="w-10 h-10 rounded-lg" src={item.picUrl} />
          )}
          renderRight={(item) => (
            <Box flex className="space-x-1">
              <Box className="space-y-1 flex-1">
                <Text size="small">{item.name}</Text>
                <Text className="text-gray" size="xSmall">
                  {/* <FinalPrice options={item.options}>
                        {item.product}
                      </FinalPrice> */}
                  <DisplayPrice>{item.finalAmount}</DisplayPrice>
                </Text>
                {/* <Text className="text-gray" size="xxxSmall">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text> */}
              </Box>
              <Text className="text-primary font-medium" size="small">
                x{item.quantity}
              </Text>
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
