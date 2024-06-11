import React, { FC, useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { MemberLevel, Membership, RecentlySearchMember } from "types/user";
import { Box, Header, Tabs, Text } from "zmp-ui";
import { MembersList } from "./members-list";
import { Divider } from "components/divider";
import {
  memberByRawPhoneInputState,
  phoneSearchState,
  rawPhoneNumberState,
  recentSearchMembersKeyState,
} from "states/member.state";
import { CustomInquiry } from "pages/search/inquiry";
import { ContentFallback } from "components/content-fallback";
import { getStorage, setStorage } from "zmp-sdk";

export const GiftsPage: FC = () => {
  return (
    <>
      <Header title="Quà tặng" />
      <GiftsPageContent />
    </>
  );
};

const GiftsPageContent: FC = () => {
  const [phone, setPhone] = useRecoilState(rawPhoneNumberState);
  const [searchMembers, setSearchMembers] = useState<Membership[]>([]);
  const [recentlySearch, setRecentlySearch] = useState<Membership[]>([]);
  const membersSearchByPhoneLoadable = useRecoilValueLoadable(
    memberByRawPhoneInputState
  );
  const key = useRecoilValue(recentSearchMembersKeyState);

  useEffect(() => {
    getStorage({
      keys: [key],
      success: (data) => {
        const { recentSearchMembers } = data;
        setRecentlySearch(recentSearchMembers || []);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    if (
      membersSearchByPhoneLoadable.state === "hasValue" &&
      membersSearchByPhoneLoadable.contents !== null
    ) {
      setSearchMembers(membersSearchByPhoneLoadable.contents?.items || []);
      getStorage({
        keys: [key],
        success: (data) => {
          const { recentSearchMembers } = data;
          setRecentlySearch(recentSearchMembers || []);
          let memberSearchTemp =
            membersSearchByPhoneLoadable.contents?.items[0];
          var newDataStorage: RecentlySearchMember[] = [];
          let newSearch: RecentlySearchMember = {
            membershipId: memberSearchTemp.membershipId,
            phoneNumber: memberSearchTemp.phoneNumber,
            fullname: memberSearchTemp.fullname,
          };
          if (recentSearchMembers != null) {
            if (
              recentSearchMembers.some(
                (m) => m.membershipId === memberSearchTemp.membershipId
              )
            )
              return;
            newDataStorage = [...recentSearchMembers, newSearch];
          } else newDataStorage = [...newDataStorage, newSearch];

          data[key] = newDataStorage;
          setStorage({
            data,
            success: (data) => {
              // xử lý khi gọi api thành công
              console.log("set ok", data);
            },
            fail: (error) => {
              // xử lý khi gọi api thất bại
              console.log("set error", error);
            },
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });
    } else setSearchMembers([]);
  }, [phone, membersSearchByPhoneLoadable.state]);

  return (
    <Box className="">
      <CustomInquiry
        placeholder="Tìm kiếm bạn của bạn"
        state={phoneSearchState}
      />
      <Divider />
      <Text className="pl-4">
        Tìm bạn qua số điện thoại {`(${searchMembers.length})`}
      </Text>
      <Divider />
      <Tabs scrollable className="category-tabs">
        <Tabs.Tab key={0} label="Tất cả">
          {membersSearchByPhoneLoadable.state === "loading" ? (
            <Box>
              <ContentFallback />
            </Box>
          ) : (
            <MembersList members={searchMembers} />
          )}
        </Tabs.Tab>
        <Tabs.Tab key={1} label="Tìm gần đây">
          <MembersList members={recentlySearch} />
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};

const demo: Membership[] = [
  {
    membershipId: "123",
    phoneNumber: "1234567890",
    email: "",
    fullname: "user 1",
    gender: 1,
    memberLevel: {} as MemberLevel,
  },
  {
    membershipId: "234",
    phoneNumber: "1234567890",
    email: "",
    fullname: "user 2",
    gender: 1,
    memberLevel: {} as MemberLevel,
  },
  {
    membershipId: "345",
    phoneNumber: "1234567890",
    email: "",
    fullname: "user 3",
    gender: 1,
    memberLevel: {} as MemberLevel,
  },
];

export default GiftsPage;
