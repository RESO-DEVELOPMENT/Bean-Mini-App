<<<<<<< Updated upstream
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "zmp-ui";

const InformationPage = () => {
  const { avatarUrl, name, birthDate, gender, email } = useParams();
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editableInfo, setEditableInfo] = useState({
    name: "Tên của bạn",
    birthDate: "Ngày sinh",
    gender: "Giới tính",
    email: "email@example.com",
  });

  const handleEditAllClick = () => {
    setIsEditingAll(true);
  };

  const handleSaveAllClick = () => {
    setIsEditingAll(false);
    // Xử lý lưu  thông tin đã chỉnh sửa
    // Đây là nơi bạn sẽ gọi API để cập nhật thông tin
  };

  const handleChange = (field, value) => {
    setEditableInfo({ ...editableInfo, [field]: value });
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleCameraClick = () => {
    // Hành động khi nhấn nút, ví dụ: mở hộp thoại tải lên hình ảnh
  };

  return (
    <div className="flex-1" style={{ background: "#14D9C5" }}>
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
              value={editableInfo.birthDate}
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
