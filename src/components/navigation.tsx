import { useVirtualKeyboardVisible } from "hooks";
import FloatingActionButton from "pages/FloatingActionButton";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import { OrderIcon } from "./order-icon";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/order": {
    label: "Đặt hàng",
    icon: <Icon icon="zi-more-grid" />,
  },
  "/qr": {
    label: "Mã QR",
    icon: <Icon icon="zi-qrline" />,
  },
  "/history": {
    label: "Lịch sử",
    icon: <Icon icon="zi-memory" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(
    () => NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname),
    [location]
  );

  const handleFabClick = () => {
    navigate("cart");
    // console.log("FAB Clicked");
    // Define the action for FAB click, e.g., navigate to a specific route
  };
  const shouldShowFAB = useMemo(() => {
    return location.pathname === "/order";
  }, [location.pathname]);

  if (noBottomNav) {
    return null;
  }

  return (
    <>
      <BottomNavigation
        id="footer"
        activeKey={activeTab}
        onChange={(key: TabKeys) => setActiveTab(key)}
        className="z-50"
      >
        {Object.entries(tabs).map(([path, { label, icon, activeIcon }]) => (
          <BottomNavigation.Item
            key={path}
            label={label}
            icon={icon}
            activeIcon={activeIcon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation>
      {shouldShowFAB && (
        <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
      )}
    </>
  );
};

export default Navigation;
