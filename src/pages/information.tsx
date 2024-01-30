import { ListRenderer } from "components/list-renderer";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";
import { Box, Text } from "zmp-react";

const InformationPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValueLoadable(userState);

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="flex-1 scrollable-container">
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
                <input
                  type="text "
                  className="font-bold"
                  value={user.contents.name}
                />
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
                <input
                  type="text"
                  className="font-bold"
                  value={user.contents.phone}
                />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      ></ListRenderer>
    </div>
  );
};

export default InformationPage;
