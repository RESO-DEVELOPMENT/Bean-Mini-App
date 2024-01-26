<<<<<<< Updated upstream
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";

const InformationPage = () => {
  const navigate = useNavigate();
  const { avatarUrl, name, birthDate, gender, email } = useParams();
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editableInfo, setEditableInfo] = useState({
    name: "Tên của bạn",
    birthDate: "dd/mm/yyyy",
    gender: "Giới tính",
    email: "email@example.com",
  });

  const handleEditAllClick = () => {
    setIsEditingAll(true);
  };

  const handleSaveAllClick = () => {
    setIsEditingAll(false);
  };

  const handleChange = (field, value) => {
    setEditableInfo({ ...editableInfo, [field]: value });
  };
  const formatDate = (dateString) => {
    if (dateString === "dd/mm/yyyy" || !dateString.includes("-")) {
      return dateString;
    }
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleCameraClick = () => {};
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div
      className="flex-1 scrollable-container"
      style={{ background: "#14D9C5" }}
    >
      <button className="back-button" onClick={handleBackClick}>
        <Icon icon="zi-chevron-left-header" />
        Back
      </button>
      <div className="info-box">
        <div className="avatar-wrapper">
          <img className="avatar" src={avatarUrl} alt="Avatar" />
          <button className="camera-icon" onClick={handleCameraClick}>
            <Icon icon="zi-camera" />
          </button>
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";

const InformationPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValueLoadable(userState);

  return (
    <div className="flex-1 scrollable-container">
      <div className="information-page">
        <div className="avatar-container">
          <img
            src={user.contents.avatar || logo}
            alt="User Avatar"
            className="avatar"
          />
>>>>>>> Stashed changes
        </div>
        <div className="user-details">
          <div className="user-detail-row">
            <div className="label text-l ">Tên</div>
            <input
<<<<<<< Updated upstream
              type="text"
              value={editableInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              type="date"
              value={
                isEditingAll && editableInfo.birthDate !== "dd/mm/yyyy"
                  ? editableInfo.birthDate
                  : ""
              }
              placeholder="dd/mm/yyyy"
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />

            <select
              value={editableInfo.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            <input
              type="email"
              value={editableInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
=======
              className="input-field font-bold"
              value={user.contents.name}
              readOnly
              disabled
>>>>>>> Stashed changes
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
