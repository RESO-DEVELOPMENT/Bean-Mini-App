import { ListRenderer } from "components/list-renderer";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { memberState, userState } from "state";
import logo from "static/logo.png";
import { Box, Text } from "zmp-react";

const InformationPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValueLoadable(userState);
  const member = useRecoilValueLoadable(memberState);

  const handleBackClick = () => {
    navigate(-1);
  };
  return member.state === "hasValue" && member.contents !== null ? (
    <div className="flex-1  p-3">
      <div className="mt-40 ml-24 mb-8">
        <img
          src={user.contents.avatar || logo}
          alt="User Avatar"
          className="w-50 h-40 object-cover"
        />
      </div>
      <ListRenderer
        items={[
          {
            left: (
              <Box>
                <Text size="small">Tên</Text>
              </Box>
            ),
            right: (
              <Box flex className="ml-36">
                {member.contents.fullName}
              </Box>
            ),
          },
          {
            left: (
              <Box>
                <Text size="small">Số điện thoại</Text>
              </Box>
            ),
            right: (
              <Box flex className="ml-20">
                {member.contents.phoneNumber}
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      ></ListRenderer>
    </div>
  ) : (
    <Box />
  );
};

export default InformationPage;
