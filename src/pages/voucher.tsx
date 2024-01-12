import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, Icon, Page, Tabs, Text } from "zmp-ui";
import { SpecialOffers } from "./search/inquiry";
import { Banner } from "./index/banner";
import TabBar from "components/display/tabbar";
import VoucherCard from "./card-voucher";
import { cartState, listPromotionState } from "state";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import OrderCard from "./orders/card-order";
import TransactionCard from "./orders/card-transaction";

const VoucherPage = () => {
  const navigate = useNavigate();

  const promotionListData = useRecoilValueLoadable(listPromotionState);
  const [cart, setCart] = useRecoilState(cartState);

  return (
    <Page className="flex flex-col" style={{ overflow: "hidden" }}>
      <Header title="Mã giảm giá" />
      {/* <SpecialOffers /> */}
      <Tabs scrollable defaultActiveKey={"0"} className="category-tabs">
        <Tabs.Tab key={0} label="Hiện có">
          <Suspense>
            {promotionListData.state === "hasValue" &&
            promotionListData.contents !== null ? (
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {promotionListData.contents
                  .filter((e) => e.promotionType === 3)
                  .map((promotion) => (
                    <VoucherCard
                      promotion={promotion}
                      onClick={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: promotion.promotionCode,
                          };

                          console.log("res", res);
                          return res;
                        })
                      }
                      isUsed={cart.promotionCode === promotion.promotionCode}
                    />
                  ))}
              </div>
            ) : (
              <Box />
            )}
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab key={1} label="Của tôi">
          <Suspense>
            {promotionListData.state === "hasValue" &&
            promotionListData.contents !== null ? (
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {promotionListData.contents
                  .filter((e) => e.promotionType === 2)
                  .map((promotion) => (
                    <VoucherCard
                      promotion={promotion}
                      onClick={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: promotion.promotionCode,
                          };

                          return res;
                        })
                      }
                      isUsed={cart.promotionCode === promotion.promotionCode}
                    />
                  ))}
              </div>
            ) : (
              <Box />
            )}
          </Suspense>
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
};

export default VoucherPage;
