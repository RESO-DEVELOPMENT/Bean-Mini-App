import React, { FC } from "react";
import { MemberLevel } from "types/user";

import { Box, Progress, Text } from "zmp-ui";

const SkeletonLoader: FC = () => {
  return (
    <Box
      p={4}
      height={150}
      className="bg-primary rounded-lg grid grid-cols-2 animate-pulse"
    >
      <div className="col-span-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="col-span-1 text-right space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2 ml-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 ml-auto"></div>
      </div>
      <div className="col-span-2 -mb-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </Box>
  );
};
interface RankInfoProps {
  memberLevel: MemberLevel;
}
const RankInfo: FC<RankInfoProps> = ({memberLevel}) => {
 
    return (
      <Box
      m={4}
        p={4}
        height={150}
        className="bg-primary rounded-lg grid grid-cols-2 border border-white"
      >
        <div className="col-span-1">
          <Text size="large">Hạng Thành Viên</Text>
          <Text size="xLarge" className="font-semibold">
            {memberLevel.name}
          </Text>
        </div>
        <div className="col-span-1 text-right">
          <Text size="large">Điểm Tích Lũy</Text>
          <Text size="xLarge" className="font-semibold">
            {memberLevel.point}
          </Text>
        </div>
        <div className="col-span-2 -mb-8">
          <Progress
            strokeWidth={10}
            strokeColor={"#ffd93d"}
            completed={memberLevel.point}
            maxCompleted={memberLevel.maxPoint}
          />
        </div>
        <Text size="large">{memberLevel.name}</Text>
        <Text size="large" className="col-span-1 text-right">
          {memberLevel.nextLevelName}
        </Text>

        
      </Box>
    );
};

export default RankInfo;
