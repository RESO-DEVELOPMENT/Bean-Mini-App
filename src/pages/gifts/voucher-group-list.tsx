import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Header, Page, Tabs, Text, useSnackbar } from "zmp-ui";
// import { cartState } from "states/cart.state";
import {
  RecoilValueReadOnly,
  useRecoilState,
  useRecoilValue,
  //   useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { memberState } from "states/member.state";
import { ContentFallback } from "components/content-fallback";
import { Subscription } from "pages/profile";
import VoucherCard from "pages/card-voucher";
import { Promotion } from "types/promotion";
import { displayDate } from "utils/date";
import { VoucherGroup } from "types/voucher-group";

import logo from "../../static/logo.png";
import { membershipApi } from "api/member";

interface VoucherGroupPageProps {
  state?: RecoilValueReadOnly<any>;
}
const VoucherGroupPage: FC<VoucherGroupPageProps> = ({ state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toMemberId = location.state?.id;
  const isGift = location.state?.isGift;

  console.log("gidft", isGift);
  const voucherGroupListData = useRecoilValueLoadable(state!);

  const memberLoadable = useRecoilValueLoadable(memberState);
  const snackbar = useSnackbar();
  if (memberLoadable.state == "loading" || memberLoadable.state == "hasError")
    return <ContentFallback />;

  if (memberLoadable.state == "hasValue" && memberLoadable.contents === null)
    return <Subscription />;

  const handleSendGift = async (voucherGroupId: string) => {
    await membershipApi.sendGift(toMemberId, voucherGroupId, memberLoadable.contents?.membershipId!, isGift).then((res) => {
      if (res.status == 200 && res.data.status == "SUCCESS") {
        console.log(res.data);
        snackbar.openSnackbar({
          duration: 3000,
          type: "success",
          text: res.data.description,
        });
      } else {
        console.log(" log eror", res);
        snackbar.openSnackbar({

          duration: 3000,
          type: "error",
          text: res.data.status,
        });
      }
    })
  };
  console.log("hiện");
  return (
    <Page className="flex flex-col" style={{ overflow: "hidden" }}>
      <Header title="Danh sách quà tặng" />
      {/* <SpecialOffers /> */}
      <Tabs scrollable defaultActiveKey={"0"} className="category-tabs">
        <Tabs.Tab key={0} label="Hiện có">
          {voucherGroupListData.state === "hasValue" &&
            voucherGroupListData.contents !== null ? (
            <div
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {voucherGroupListData.contents.map((voucher) => (
                <VoucherGroupCard
                  key={voucher.voucherGroupId}
                  voucherGroup={voucher}
                  onClick={() => {
                    handleSendGift(voucher.voucherGroupId)
                  }}
                  isGift={isGift}
                  onCancel={() => { }}
                />
              ))}
            </div>
          ) : (
            <ContentFallback />
          )}
        </Tabs.Tab>
        {/* <Tabs.Tab key={1} label="Của tôi">
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
                    .filter((e) => e.promotionType === 3)
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
        </Tabs.Tab> */}
      </Tabs>
    </Page>
  );
};

interface VoucherCardProps {
  voucherGroup: VoucherGroup;
  onClick: () => void;
  onCancel: () => void;
  isGift: boolean;
}

const VoucherGroupCard: FC<VoucherCardProps> = ({
  voucherGroup,
  onClick,
  onCancel,
  isGift,
}) => {
  return (
    <div className="relative bg-white p-2 rounded-lg shadow mb-1.5 mt-2.5 mx-2.5">
      <div className="relative p-1.5 h-35 rounded-md flex items-start">
        <img
          //   src={voucherGroup.imgUrl}
          src={logo}
          alt="Voucher Image"
          className="w-[100px] h-30 rounded-md mr-2.5"
        />
        <div>
          <p className="font-bold">{voucherGroup.voucherName}</p>
          <p className="text-primary">{isGift ? "Tặng quà với" : "Đổi quà với"} {voucherGroup.redeemPoint} Điểm</p>
          <button
            onClick={onClick}
            //   className={`absolute font-bold mr-1 p-1 pl-6 pr-6 bottom-1 right-1 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800 ${isUsed ? "bg-gray" : "bg-primary"}`}>
            className={"absolute font-bold mr-1 p-1 pl-6 pr-6 bottom-1 right-1 rounded-md text-white text-sm bg-primary"}>
            {isGift ? "Tặng quà" : "Đổi điểm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherGroupPage;
