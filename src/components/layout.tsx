import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/index";
import CategoryPage from "pages/category";
import CartPage from "pages/cart";
import NotificationPage from "pages/notification";
import ProfilePage from "pages/profile";
import SearchPage from "pages/search";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import HistoryPage from "pages/orders/list-order";
import OrderDetailsPage from "pages/orders/order-details";
import WalletScreen from "pages/wallet/wallet";
import VoucherPage from "pages/voucher";
import QRCodePage from "pages/qr-code";
import InformationPage from "pages/information";
import FeedbackForm from "pages/feedback";
import BlogDetail from "pages/wallet/blog-detail";
import { GiftsPage } from "pages/gifts";
import { listPromotionState } from "states/promotion.state";
import { listVoucherForSaleState } from "states/voucher.state";
import VoucherGroupPage from "pages/gifts/voucher-group-list";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    // (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
    window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/order" element={<HomePage />}/>
          <Route path="/" element={<WalletScreen />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/category" element={<CategoryPage />}/>
          <Route path="/notification" element={<NotificationPage />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/history" element={<HistoryPage />}/>
          <Route path="/history-transaction" element={<HistoryPage />}/>
          <Route path="/order-detail" element={<OrderDetailsPage />}/>
          <Route path="/voucher" element={<VoucherPage  state={listPromotionState}/>}/>
          <Route path="/gifts-for-sale" element={<VoucherGroupPage state={listVoucherForSaleState} />}/>
          <Route path="/qr" element={<QRCodePage />} />
          <Route path="/info" element={<InformationPage />} />,
          <Route path="/feedback" element={<FeedbackForm />} />,
          <Route path="/blog" element={<BlogDetail />}/>
          <Route path="/gifts" element={<GiftsPage />}/>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
