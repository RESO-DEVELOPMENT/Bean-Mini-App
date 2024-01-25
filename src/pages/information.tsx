import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";

const InformationPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValueLoadable(userState);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex-1 scrollable-container">
      <div className="information-page">
        <div className="avatar-container">
          <img
            src={user.contents.avatar || logo}
            alt="User Avatar"
            className="avatar"
          />
        </div>
        <div className="user-details">
          <div className="user-detail-row">
            <div className="label text-l ">Tên</div>
            <input
              className="input-field font-bold"
              value={user.contents.name}
              readOnly
              disabled
            />
          </div>
          <div className="user-detail-row">
            <div className="label text-l ">Số điện thoại:</div>
            <input
              className="input-field font-bold"
              value={user.contents.phone || "Số điện thoại không có"}
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
