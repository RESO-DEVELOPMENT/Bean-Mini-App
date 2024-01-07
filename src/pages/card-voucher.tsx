// VoucherCard.tsx

import React, { useState } from "react";

interface VoucherCardProps {
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  onCardAdded: () => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  title,
  description,
  discount,
  imageUrl,
  onCardAdded,
}) => {
  const [isUsed, setIsUsed] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    height: "100px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 1,
    right: 0,
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleButtonClick = () => {
    if (isButtonClicked) {
      setIsUsed(true);
    }
    setIsButtonClicked(true);
    onCardAdded();
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img src={imageUrl} alt="Voucher Image" style={imageStyle} />
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <span>{discount}</span>
        </div>
      </div>
      <button style={buttonStyle} onClick={handleButtonClick} disabled={isUsed}>
        {isButtonClicked ? "Dùng ngay" : "Thu thập"}
      </button>
    </div>
  );
};

export default VoucherCard;
