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
        </div>
        <h2>Thông tin về bạn</h2>

        {isEditingAll ? (
          <div>
            <input
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
            />
          </div>
        ) : (
          <div>
            <p>
              <strong>Tên:</strong> {editableInfo.name}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {formatDate(editableInfo.birthDate)}
            </p>
            <p>
              <strong>Giới tính:</strong> {editableInfo.gender}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${editableInfo.email}`}>{editableInfo.email}</a>
            </p>
          </div>
        )}

        {isEditingAll ? (
          <button className="edit-button" onClick={handleSaveAllClick}>
            Lưu{" "}
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditAllClick}>
            Chỉnh Sửa{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default InformationPage;
