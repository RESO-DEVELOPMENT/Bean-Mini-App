import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRecoilState, useRecoilValueLoadable, useRecoilValue } from "recoil";
import { Membership, RecentlySearchMember } from "types/user";
import { Box, Header, List, Page, Tabs, Text } from "zmp-ui";
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

export const GiftsPage: FC = () => (
  <Page>
    <Header title="Tặng quà" />
    <GiftsPageContent />
  </Page>
);

const GiftsPageContent: FC = () => {
  const [phone, setPhone] = useRecoilState(rawPhoneNumberState);
  const [searchMembers, setSearchMembers] = useState<Membership[]>([]);
  const recentlySearchRef = useRef<Membership[]>([]);
  const membersSearchByPhoneLoadable = useRecoilValueLoadable(
    memberByRawPhoneInputState
  );
  const key = useRecoilValue(recentSearchMembersKeyState);
  const loadRecentlySearch = useCallback(() => {
    getStorage({
      keys: [key],
      success: (data) => {
        const { recentSearchMembers } = data;
        recentlySearchRef.current = recentSearchMembers || [];
      },
      fail: (error) => console.log(error),
    });
  }, []);

  useEffect(() => {
    loadRecentlySearch();
    setPhone("");
  }, []);

  useEffect(() => {
    if (
      membersSearchByPhoneLoadable.state === "hasValue" &&
      membersSearchByPhoneLoadable.contents !== null &&
      phone.length > 0
    ) {
      const memberSearchTemp = membersSearchByPhoneLoadable.contents.items[0];
      setSearchMembers(membersSearchByPhoneLoadable.contents.items || []);

      getStorage({
        keys: [key],
        success: (data) => {
          const { recentSearchMembers } = data;
          const currentSearchMembers = recentSearchMembers || [];
          if (
            !currentSearchMembers.some(
              (m: RecentlySearchMember) =>
                m.membershipId === memberSearchTemp.membershipId
            )
          ) {
            const newSearch: RecentlySearchMember = {
              membershipId: memberSearchTemp.membershipId,
              phoneNumber: memberSearchTemp.phoneNumber,
              fullname: memberSearchTemp.fullname,
            };
            const newDataStorage = [...currentSearchMembers, newSearch];
            recentlySearchRef.current = newDataStorage;
            setStorage({
              data: { [key]: newDataStorage },
              success: () => console.log("Set storage successful"),
              fail: (error) => console.log("Set storage error", error),
            });
          }
        },
        fail: (error) => console.log(error),
      });
    } else {
      setSearchMembers([]);
    }
  }, [membersSearchByPhoneLoadable.state, phone]);

  const searchMembersLength = useMemo(
    () => searchMembers.length,
    [searchMembers.length]
  );

  return (
    <Box className="">
      <CustomInquiry
        placeholder="Tìm kiếm bạn của bạn"
        state={phoneSearchState}
      />
      {phone.length !== 10 && phone.length > 0 && (
        <Text size={"small"} className="pl-3 italic ">
        Hãy nhập số điện thoại có 10 số
      </Text>
      )}
      <Divider />
      <Text className="pl-3">
        Tìm bạn qua số điện thoại {`(${searchMembersLength})`}
      </Text>
      <Divider />
      <Tabs scrollable className="category-tabs">
        <Tabs.Tab key={0} label="Tất cả">
          {(() => {
            if (membersSearchByPhoneLoadable.state === "loading")
              return <ContentFallback />;

            if (searchMembersLength === 0 && phone.length == 10)
              return (
                <List className="p-4">
                  <Text>Không có kết quả</Text>
                </List>
              );
            return <MembersList members={searchMembers} />;
          })()}
        </Tabs.Tab>

        <Tabs.Tab key={1} label="Tìm gần đây">
          <MembersList members={recentlySearchRef.current} />
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};
