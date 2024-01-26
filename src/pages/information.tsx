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
      // Xử lý khi gọi api thất bại
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
            <div className="label text-l">Tên</div>
            <input
              className="input-field font-bold"
              value={user.contents.name}
              readOnly
              disabled
            />
          </div>
          <div className="user-detail-row">
            <div className="label text-l">Số điện thoại:</div>
            <input
              className="input-field font-bold"
              value={phoneNumber || "Số điện thoại không có"}
              readOnly
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
