import React, { FC, HTMLProps, PropsWithChildren } from "react";
import { Box, Text } from "zmp-ui";
import { BodyTextProps } from "zmp-ui/text";

export const TextSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({
  className,
  ...props
}) => {
  return (
    <Text
      {...props}
      className={`bg-skeleton text-transparent w-fit h-fit animate-pulse ${
        className ?? ""
      }`}
    />
  );
};

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`bg-skeleton animate-pulse ${className ?? ""}`}
    />
  );
};

export const ProductItemSkeleton: FC = () => {
  return (
    <div className="space-y-2">
      <ImageSkeleton className="w-full aspect-square rounded-lg animate-pulse" />
      <TextSkeleton>1234567890</TextSkeleton>
      <TextSkeleton size="xxSmall">20,000đ</TextSkeleton>
    </div>
  );
};

export const ProductSlideSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      <ImageSkeleton className="w-full aspect-video rounded-lg animate-pulse" />
      <Box className="space-y-1">
        <TextSkeleton size="small">1234567890</TextSkeleton>
        <TextSkeleton size="xxSmall">25,000đ</TextSkeleton>
        <TextSkeleton size="large">20,000đ</TextSkeleton>
      </Box>
    </div>
  );
};

export const ProductSearchResultSkeleton: FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <ImageSkeleton className="w-[88px] h-[88px] rounded-lg" />
      <Box className="space-y-2">
        <TextSkeleton>1234567890</TextSkeleton>
        <TextSkeleton size="xSmall">25,000đ</TextSkeleton>
      </Box>
    </div>
  );
};

export const CategoriesSkeleton: FC = () => {
  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-1 items-center animate-pulse">
          <div className="w-16 h-16 bg-skeleton" />
          <Text size="small" className="text-gray text-center">
            ....
          </Text>
        </div>
      ))}
    </Box>
  );
};