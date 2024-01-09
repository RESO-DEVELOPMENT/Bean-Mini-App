import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import { SpecialOffers } from "./search/inquiry";
import { Banner } from "./index/banner";
import TabBar from "components/display/tabbar";
import VoucherCard from "./card-voucher";

const VoucherPage = () => {
  const navigate = useNavigate();
  const tabs = ["Tất cả", "Mới nhất"];
  interface VoucherCardProps {
    title: string;
    description: string;
    discount: string;
    imageUrl: string;
  }
  const cardsData: VoucherCardProps[] = [
    {
      title: "Giảm Trà đá",
      description: "Cho đơn từ 1đ",
      discount: "Discount: 20%",
      imageUrl: "docs/dummy/product-square-1.jpg",
    },
    {
      title: "Giảm Trà đá",
      description: "Cho đơn từ 1đ",
      discount: "Discount: 20%",
      imageUrl: "docs/dummy/product-square-1.jpg",
    },
    {
      title: "Giảm Trà đá",
      description: "Cho đơn từ 1đ",
      discount: "Discount: 20%",
      imageUrl: "docs/dummy/product-square-1.jpg",
    },
    {
      title: "Giảm Trà đá",
      description: "Cho đơn từ 1đ",
      discount: "Discount: 20%",
      imageUrl: "docs/dummy/product-square-1.jpg",
    },
  ];

  return (
    <Page className="flex flex-col" style={{ overflow: "hidden" }}>
      <Header title="Tìm kiếm" />
      <SpecialOffers />
      <TabBar tabs={tabs} />
      <div
        style={{
          overflowY: "auto",
          flex: 1,
        }}
      >
        {cardsData.map((card, index) => (
          <VoucherCard
            onCardAdded={function (): void {
              throw new Error("Không tìm thấy.");
            }}
            key={index}
            {...card}
          />
        ))}
      </div>
    </Page>
  );
};

export default VoucherPage;
