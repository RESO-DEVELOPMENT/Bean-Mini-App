import React, { useState, useEffect } from "react";

interface TabBarProps {
  tabs: string[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Sử dụng useEffect để theo dõi sự thay đổi trong danh sách tab
  useEffect(() => {
    // Kiểm tra xem activeTab có tồn tại trong danh sách mới không
    if (!tabs.includes(activeTab)) {
      // Nếu không, chọn tab đầu tiên trong danh sách mới
      setActiveTab(tabs[0]);
    }
  }, [tabs]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          margin: "0",
          display: "flex",
        }}
      >
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => handleTabClick(tab)}
            style={{
              margin: "0 50px",
              cursor: "pointer",
              fontWeight: tab === activeTab ? "bold" : "normal",
              fontSize: "18px",
              position: "relative",
            }}
          >
            {tab}
            {tab === activeTab && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "150px",
                  height: "2px",
                  backgroundColor: "#3498db",
                  transition: "left 0.3s ease",
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
