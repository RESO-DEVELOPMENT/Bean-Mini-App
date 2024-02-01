import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";
import { useNavigate } from "react-router-dom";
import { openSupportChat } from "utils/config";

export const Subscription: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4" onClick={onClick}>
      <Box
        className="bg-primary text-white rounded-xl p-4 space-y-2"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
        <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
      </Box>
    </Box>
  );
};

const Personal: FC = () => {
  const navigate = useNavigate();
  const gotoPage = (page: string) => {
    navigate(page);
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        onClick={(item) => {
          gotoPage(item.navigate);
        }}
        items={[
          {
            navigate: "/info",
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Thông tin tài khoản
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            navigate: "/history",
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box
                onClick={() => openSupportChat(`Tôi muốn góp ý về ứng dụng `)}
                flex
              >
                <Text.Header className="flex-1 items-center font-normal">
                  Đánh giá ứng dụng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            // navigate: "/feedback",
            left: <Icon icon="zi-call" />,
            right: (
              <Box onClick={() => openSupportChat(`Tôi muốn góp ý `)} flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header showBackIcon={false} title="Tài khoản" />
      {/* <Subscription /> */}
      <Personal />
      <Other />
    </Page>
  );
};

export default ProfilePage;
