import React, { useCallback } from "react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { keywordState } from "state";
import { Box, Input } from "zmp-ui";
import { debounce } from "lodash";

const SearchInput: FC<{ placeholder: string }> = ({ placeholder }) => {
  const [keyword, setKeyword] = useRecoilState(keywordState);

  const handleChange = useCallback(
    debounce((newKeyword: string) => {
      setKeyword(newKeyword);
    }, 500),
    []
  );

  return (
    <Input.Search
      ref={(el) => {
        if (!el?.input?.value) {
          el?.focus();
        }
      }}
      defaultValue={keyword}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      clearable
      allowClear
    />
  );
};

export const Inquiry: FC = () => {
  return (
    <Box
      p={4}
      pt={6}
      className="bg-white transition-all ease-out flex-none"
      ref={
        ((el: HTMLDivElement) => {
          setTimeout(() => {
            if (el) {
              el.style.paddingTop = "8px";
            }
          });
        }) as any
      }
    >
      <SearchInput placeholder="Tìm nhanh đồ uống, món mới ..." />
    </Box>
  );
};

export const SpecialOffers: FC = () => {
  return (
    <Box
      p={4}
      pt={6}
      className="bg-white transition-all ease-out flex-none"
      ref={
        ((el: HTMLDivElement) => {
          setTimeout(() => {
            if (el) {
              el.style.paddingTop = "8px";
            }
          });
        }) as any
      }
    >
      <SearchInput placeholder="Tìm kiếm ưu đãi" />
    </Box>
  );
};
