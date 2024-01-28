// Import các thư viện cần thiết
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";
import { getAccessToken } from "zmp-sdk";
import { Header } from "zmp-ui";
import { getPhoneNumber } from "zmp-sdk/apis";
const InformationPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValueLoadable(userState);
  const [phoneNumber, setPhoneNumber] = useState("");
  getPhoneNumber({
    success: async (data) => {
      let { token } = data;
    },
    fail: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="flex-1 scrollable-container">
      <div className="information-page">
        <Header title="Thông tin cá nhân" showBackIcon={true} />
        <div className="avatar-container">
          <img
            src={user.contents.avatar || logo}
            alt="User Avatar"
            className="avatar"
          />
        </div>
        <div className="user-details">
          <div className="user-detail-row">
            <label htmlFor="name">Họ và tên</label>
            <input
              className="input-field font-bold"
              value={user.contents.name}
              readOnly
            />
          </div>
          <div className="user-detail-row">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              className="input-field font-bold"
              value={phoneNumber || "Số điện thoại không có"}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
