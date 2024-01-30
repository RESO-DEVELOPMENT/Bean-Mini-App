import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom"; // nếu bạn sử dụng react-router
import { notificationsState } from "state";
import { Box, Text } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/greeting"); // Chuyển đến trang Chào Hỏi
  };

  return (
    <Box className="bg-background ">
      <Box className="px-32 py-6 bg-primary">
        <Text.Header className="text-white mt-12 bold-and-large">
          Thông Báo
        </Text.Header>
      </Box>
      <ListRenderer
        noDivider
        items={notifications}
        renderLeft={(item) => (
          <img
            className="w-10 h-10 rounded-full"
            src={item.image}
            onClick={handleNotificationClick}
          />
        )}
        renderRight={(item) => (
          <Box key={item.id} onClick={handleNotificationClick}>
            <Text.Header>{item.title}</Text.Header>
            <Text
              size="small"
              className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {item.content}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

export default NotificationList;
