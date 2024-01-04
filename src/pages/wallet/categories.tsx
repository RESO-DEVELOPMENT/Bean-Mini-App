import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { useNavigate } from "react-router";
import payment from "static/payment.png";
import qrpoint from "static/qrpoint.png";
import order from "static/order.png";
export const Features: FC = () => {
  const categories = useRecoilValue(categoriesState);

  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = () => {
    navigate("/category");
  };

  return (
    <Box className="bg-white grid grid-cols-3 gap-4 p-4">
      <div
        key={0}
        onClick={() => gotoCategory}
        className="flex flex-col space-y-1 items-center"
      >
        <img className="w-10 h-10" src={payment} />
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
    </Box>
  );
};
