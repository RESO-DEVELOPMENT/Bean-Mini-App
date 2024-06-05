import React, { FC, useEffect, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Product } from "types/store-menu";
import { ContentFallback } from "components/content-fallback";
import { TStore } from "types/store";
import { getOrderDetailstate } from "states/order.state";
import { storeMenuByInputIdState, listStoreState } from "states/store.state";
import { Box } from "zmp-ui";

export interface ProductPickerProps {
  orderId: string;
  isUpdate: boolean;
  reAddToCart: (store: TStore, products: ProductQuantity[] | null) => void;
}

type ProductQuantity = {
  product: Product;
  quantity: number;
};

const ProductRePicker: FC<ProductPickerProps> = ({
  orderId,
  isUpdate,
  reAddToCart,
}) => {
  if (!orderId) {
    return <Box></Box>;
  }

  const [reOrderProducts, setReOrderProducts] = useState<
    ProductQuantity[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const stores = useRecoilValue(listStoreState);
  const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  const store = useMemo(
    () => stores.find((store) => store.name === orderDetail.storeName),
    [stores, orderDetail.storeName]
  );

  if (store === undefined || store == null) {
    return (
      <button className="font-bold bg-gray mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800">
        {isUpdate ? "Cập nhật" : "Đặt lại"}
      </button>
    );
  }

  const menuOfStore = useRecoilValue(storeMenuByInputIdState(store?.id ?? ""));
  const reOrderProductsInMenu = orderDetail.productList;

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

  return (
    <>
      {loading ? (
        <ContentFallback />
      ) : (
        <button
          className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
          onClick={() => reAddToCart(store, reOrderProducts)}
        >
          {isUpdate ? "Cập nhật" : "Đặt lại"}
        </button>
      )}
    </>
  );
};

export default ProductRePicker;
