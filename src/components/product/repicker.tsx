import { ContentFallback } from "components/content-fallback";
import React, { FC, useState, useMemo, useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "states/cart.state";
import { currentStoreMenuState } from "states/menu.state";
import { getOrderDetailstate } from "states/order.state";
import { listStoreState, selectedStoreObjState } from "states/store.state";
import { Cart, ProductList } from "types/cart";
import { Product } from "types/store-menu";
import { prepareCart } from "utils/product";
import { Box, useNavigate } from "zmp-ui";




export interface ProductPickerProps {
    orderId: string;
    isUpdate: boolean;
  }
  
  type ProductQuantity = {
    product: Product;
    quantity: number;
  };
  
  export const ProductRePicker: FC<ProductPickerProps> = ({ orderId, isUpdate }) => {

    if (!orderId) {
      return <Box></Box>;
    }
    const navigate = useNavigate();

    const  setCart = useSetRecoilState(cartState);
    const [reOrderProducts, setReOrderProducts] = useState<ProductQuantity[] | null>(null);
    const [loading, setLoading] = useState(true);
  
    
    const stores = useRecoilValue(listStoreState);
    const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
    
    const store = useMemo(() => stores.find((store) => store.name === orderDetail.storeName), [stores, orderDetail.storeName]);
    
    const menuOfStore = useRecoilValue(currentStoreMenuState);
    const reOrderProductsInMenu = orderDetail.productList;
    
    const setCurrentStore = useSetRecoilState(selectedStoreObjState);
  
    useEffect(() => {
      if (reOrderProductsInMenu && menuOfStore.products) {
        const filteredReOProducts = reOrderProductsInMenu.flatMap((reO) => {
          return menuOfStore.products
            .filter((product) => product.menuProductId === reO.productInMenuId)
            .map((product) => ({ product, quantity: reO.quantity }));
        });
  
        setReOrderProducts(filteredReOProducts);
        setLoading(false); // Set loading to false after data is fetched
      }
    }, [reOrderProductsInMenu, menuOfStore.products]);
  
    const reAddToCart = useCallback(
      () => {
        setCurrentStore(store!);
        reOrderProducts?.forEach(({ product, quantity }) => {
          setCart((prevCart) => {
            let res: Cart = (prevCart.storeId === store!.id) ? { ...prevCart, storeId: store!.id } : { ...prevCart, storeId: store!.id, productList: [] };
  
            let isProductInCart = false;
            const updatedProductList = res.productList.map((addedProduct) => {
              if (addedProduct.productInMenuId === product?.menuProductId) {
                isProductInCart = true;
                const productListObjectToUpdate = { ...addedProduct };
                productListObjectToUpdate.quantity += quantity;
                productListObjectToUpdate.finalAmount += (quantity * product.sellingPrice) - addedProduct.discount;
                productListObjectToUpdate.totalAmount += (quantity * product.sellingPrice);
                return productListObjectToUpdate;
              }
              return addedProduct;
            });
  
            if (isProductInCart) {
              res = {
                ...prevCart,
                productList: updatedProductList,
              };
            } else {
              const cartItem: ProductList = {
                productInMenuId: product!.menuProductId,
                parentProductId: product!.parentProductId,
                name: product!.name,
                type: product!.type,
                quantity: quantity,
                sellingPrice: product!.sellingPrice,
                code: product!.code,
                categoryCode: product!.code,
                totalAmount: product!.sellingPrice * quantity,
                discount: product!.discountPrice,
                finalAmount: (product!.sellingPrice * quantity) - product!.discountPrice,
                picUrl: product!.picUrl,
              };
              res = {
                ...prevCart,
                productList: res.productList.concat(cartItem),
                storeId: store!.id,
              };
            }
  
            return prepareCart(res);
          });
        });
  
        navigate("/cart");
      },
      []
    );
  
    return (
      <>
        {loading ? (
          <ContentFallback />
        ) : (
          <button
            className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
            onClick={reAddToCart}
          >
            {isUpdate ? "Cập nhật" : "Đặt lại"}
          </button>
        )}
      </>
    );
  };