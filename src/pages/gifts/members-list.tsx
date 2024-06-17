import React from "react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { MemberLevel, Membership } from "types/user";
import { List, Avatar, Icon, Text, Box, Tabs, useNavigate } from "zmp-ui";

interface MemberListProps {
  members: Membership[];
}
export const MembersList: FC<MemberListProps> = ({ members }) => {
  const navigate = useNavigate();
  const handleClick = (memberId: string, fullname: string) => {
    navigate("/gifts-for-sale", {
      state: { id: memberId, isGift: true, fullName: fullname },

    });
  };
  const renderMembers: Membership[] = [];
  members.map((m) => {
    let obj: Membership = {
      membershipId: m.membershipId,
      fullname: m.fullname,
      phoneNumber: m.phoneNumber,
      email: undefined,
      gender: 0,
      memberLevel: {} as MemberLevel,
    };
    renderMembers.push(obj);
  });
  return (
    <List className="p-4">
      {renderMembers.map((m) => (
        <Box onClick={() => handleClick(m.membershipId , m.fullname)} key={m.membershipId} className="flex flex-row items-center mb-6">
          <Box className="w-auto h-full flex-none mr-2">
            <Avatar backgroundColor={"SKYBLUE-GREEN"}>
              <Icon icon="zi-user" />
            </Avatar>
          </Box>
          <Box className="flex-1">
            <Text size={"xLarge"} bold={true}>
              {m.fullname}
            </Text>
            <Text className="text-gray">
              Số điện thoại:{" "}
              <span className="text-primary">{m.phoneNumber.replace('+84', '0')}</span>
            </Text>
          </Box>
          {/* <Box>
            <Icon className="text-primary" icon="zi-call-solid" />
          </Box> */}
        </Box>
      ))}
    </List>
  );
};

interface MembersResultProps {
  searchMembers: Membership[];
  recentlySearchMembers: Membership[];
}
export const MembersResult: FC<MembersResultProps> = ({
  searchMembers,
  recentlySearchMembers,
}) => {
  return (
    <>
      <Tabs scrollable className="category-tabs">
        <Tabs.Tab key={0} label="Tất cả">
          <MembersList members={searchMembers} />
        </Tabs.Tab>
        <Tabs.Tab key={1} label="Tìm gần đây">
          <MembersList members={recentlySearchMembers} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
