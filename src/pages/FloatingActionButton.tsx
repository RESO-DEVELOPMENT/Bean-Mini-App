// FloatingActionButton.tsx
import React, { FC, CSSProperties } from "react";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  style?: CSSProperties;
}

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  style,
}) => {
  const defaultStyle: CSSProperties = {
    position: "fixed",
    right: "20px",
    bottom: "100px",
    backgroundColor: "white",
    color: "black",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    ...style,
  };

  return (
    <button onClick={onClick} style={defaultStyle}>
      {icon}
    </button>
  );
};

export default FloatingActionButton;
