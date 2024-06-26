import React, { FC, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, Page, Tabs } from "zmp-ui";
import VoucherCard from "./card-voucher";
import { listPromotionState } from "states/promotion.state";
import { cartState } from "states/cart.state";
import {
  RecoilState,
  RecoilValue,
  RecoilValueReadOnly,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE,
} from "recoil";
import { prepareCart } from "utils/product";
import { memberState } from "states/member.state";
import { Subscription } from "./profile";
import { ContentFallback } from "components/content-fallback";

interface VoucherPageProps {
  state?: RecoilValueReadOnly<any>;
}
const VoucherPage: FC<VoucherPageProps> = ({ state }) => {
  const navigate = useNavigate();
  const promotionListData = useRecoilValueLoadable(state! || listPromotionState);
  const [cart, setCart] = useRecoilState(cartState);
  const memberLoadable = useRecoilValueLoadable(memberState);

  if (memberLoadable.state == "loading" || memberLoadable.state == "hasError")
    return <ContentFallback />;

  if (memberLoadable.state == "hasValue" && memberLoadable.contents === null)
    return <Subscription />;

  return (
    <Page className="flex flex-col" style={{ overflow: "hidden" }}>
      <Header title="Mã giảm giá" />
      {/* <SpecialOffers /> */}
      <Tabs scrollable defaultActiveKey={"0"} className="category-tabs">
        <Tabs.Tab key={0} label="Hiện có">
          <Suspense fallback={<ContentFallback />}>
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
                      key={promotion.promotionId}
                      promotion={promotion}
                      onClick={() => {
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: promotion.promotionCode,
                          };
                          return prepareCart(res);
                        }),
                          navigate("/cart");
                      }}
                      isUsed={cart.promotionCode === promotion.promotionCode}
                      onCancle={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: null,
                          };
                          return prepareCart(res);
                        })
                      }
                    />
                  ))}
              </div>
            ) : (
              <Box />
            )}
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab key={1} label="Của tôi">
          <Suspense fallback={<ContentFallback />}>
            {promotionListData.state === "hasValue" &&
              promotionListData.contents !== null ? (
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {promotionListData.contents.filter((e) => e.promotionType === 2)
                  .length > 0 ? (
                  promotionListData.contents
                    .filter((e) => e.promotionType === 3 && (e.listVoucher != null && e.listVoucher?.length > 0))
                    .map((promotion) => (
                      <VoucherCard
                        key={promotion.promotionId}
                        promotion={promotion}
                        onClick={() =>
                          setCart((prevCart) => {
                            let res = { ...prevCart };
                            res = {
                              ...prevCart,
                              promotionCode: promotion.promotionCode,
                              voucherCode: promotion.listVoucher[0].voucherCode,
                            };
                            return prepareCart(res);
                          })
                        }
                        isUsed={cart.promotionCode === promotion.promotionCode}
                        onCancle={() =>
                          setCart((prevCart) => {
                            let res = { ...prevCart };
                            res = {
                              ...prevCart,
                              promotionCode: null,
                              voucherCode: null,
                            };
                            return prepareCart(res);
                          })
                        }
                      />
                    ))
                ) : (
                  <div className="mt-28 ml-20 text-gray ">
                    Bạn chưa có mã voucher nào cả
                  </div>
                )}
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
