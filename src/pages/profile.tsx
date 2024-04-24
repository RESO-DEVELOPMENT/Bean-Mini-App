import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";
import { useNavigate } from "react-router-dom";
import { openSupportChat } from "utils/config";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { memberState, requestPhoneTriesState } from "state";

export const Subscription: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  const onClick = () => retry((r) => r + 1);
  return (
    <Box className="m-4" onClick={onClick}>
      <Box
        className="bg-primary text-white rounded-xl p-4 space-y-2 h-35"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Text.Title size="xLarge" className="font-bold">
          Đăng nhập thành viên
        </Text.Title>
        <Text size="small">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
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
  const member = useRecoilValueLoadable(memberState);
  return (
    <Page>
      <Header showBackIcon={false} title="Tài khoản" />
      {member.state === "hasValue" && member.contents !== null ? (
        <>
          {" "}
          <Personal />
          <Other />
        </>
      ) : (
        <>
          <Subscription /> <Other />
        </>
      )}
    </Page>
  );
};
export default ProfilePage;
