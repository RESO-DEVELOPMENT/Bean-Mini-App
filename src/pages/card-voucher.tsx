// VoucherCard.tsx

import React, { FC, useState } from "react";
import { Promotion } from "types/promotion";
import { displayDate } from "utils/date";
import { Button } from "zmp-react";
import { Box, Text } from "zmp-ui";

interface VoucherCardProps {
  promotion: Promotion;
  onClick: () => void;
  onCancle: () => void;
  isUsed: boolean;
}

const VoucherCard: FC<VoucherCardProps> = ({
  promotion,
  onClick,
  onCancle,
  isUsed,
}) => {

  const containerStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "2px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "6px",
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    padding: "6px",
    height: "140px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "normal",
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    height: "120px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    alignItems: "center",
    textAlign: "center",
    bottom: 1,
    width: "80px",
    right: 1,
    margin: "6px",
    padding: "6px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <Box style={containerStyle}>
      <Box style={cardStyle}>
        <img src={promotion.imgUrl} alt="Voucher Image" style={imageStyle} />
        <Box>
          <Text className="font-bold">{promotion.promotionName}</Text>
          <p>{promotion.description}</p>
          <p>HSD {displayDate(new Date(promotion.endDate))}</p>
          <Button
            style={buttonStyle}
            className={
              isUsed
                ? "bg-gray text-white align-sub"
                : "bg-primary text-white align-sub"
            }
            onClick={isUsed ? onCancle : onClick}
          >
            {isUsed ? "Huỷ" : "Sử dụng"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VoucherCard;
