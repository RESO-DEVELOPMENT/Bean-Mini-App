import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { useNavigate } from "react-router";
import qrwallet from "static/qrwallet.png";
import qrpoint from "static/qrpoint.png";
import order from "static/order.png";
import voucher from "static/voucher.png";
import { MdPayments } from "react-icons/md";
export const Features: FC = () => {
  const categories = useRecoilValue(categoriesState);

  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = () => {
    navigate("/category");
  };
  const iconSize = "32px";
  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      <div
        key={0}
        onClick={() => gotoCategory}
        className="flex flex-col space-y-1 items-center"
      >
        <MdPayments className="icon-color" size={iconSize} />
        <Text size="small" className="text-gray  text-center">
          Thanh toán
        </Text>
      </div>
      <div
        key={1}
        onClick={() => gotoCategory}
        className="flex flex-col space-y-1 items-center"
      >
        <img className="w-10 h-10" src={qrpoint} />
        <Text size="small" className="text-gray  text-center">
          Tích điểm
        </Text>
      </div>
      <div
        key={1}
        onClick={() => navigate("/order")}
        className="flex flex-col space-y-1 items-center"
      >
        <img className="w-10 h-10" src={order} />
        <Text size="small" className="text-gray  text-center">
          Đặt hàng
        </Text>
      </div>
      <div
        key={1}
        onClick={() => navigate("/voucher")}
        className="flex flex-col space-y-1 items-center"
      >
        <img className="w-10 h-10" src={voucher} />
        <Text size="small" className="text-gray  text-center">
          Ưu đãi
        </Text>
      </div>
    </Box>
  );
};
