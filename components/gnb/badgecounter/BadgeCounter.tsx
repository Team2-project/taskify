/*우선 MockData랑 연결*/

import { FC } from "react";
import UserBadge from "@/components/gnb/userbadge/UserBadge";

//MemberData type 정의
interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface MembersResponse {
  members: Member[];
  totalCount: number;
}

// Mock Members Data
const mockMembersData: MembersResponse = {
  members: [
    {
      id: 1,
      userId: 1,
      email: "user1@example.com",
      nickname: "김진윤",
      profileImageUrl: "https://example.com/profiles/user1.jpg",
      createdAt: "2024-06-23T16:22:05.725Z",
      updatedAt: "2024-06-23T16:22:05.725Z",
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      email: "user2@example.com",
      nickname: "박진경",
      profileImageUrl: "https://example.com/profiles/user2.jpg",
      createdAt: "2024-06-23T16:23:05.725Z",
      updatedAt: "2024-06-23T16:23:05.725Z",
      isOwner: false,
    },
    {
      id: 3,
      userId: 3,
      email: "user3@example.com",
      nickname: "오채연",
      profileImageUrl: "https://example.com/profiles/user3.jpg",
      createdAt: "2024-06-23T16:24:05.725Z",
      updatedAt: "2024-06-23T16:24:05.725Z",
      isOwner: false,
    },
    {
      id: 4,
      userId: 4,
      email: "user4@example.com",
      nickname: "은동혁",
      profileImageUrl: "https://example.com/profiles/user4.jpg",
      createdAt: "2024-06-23T16:25:05.725Z",
      updatedAt: "2024-06-23T16:25:05.725Z",
      isOwner: false,
    },
    {
      id: 5,
      userId: 5,
      email: "user5@example.com",
      nickname: "조예은",
      profileImageUrl: "https://example.com/profiles/user5.jpg",
      createdAt: "2024-06-23T16:26:05.725Z",
      updatedAt: "2024-06-23T16:26:05.725Z",
      isOwner: false,
    },
    {
      id: 6,
      userId: 6,
      email: "user6@example.com",
      nickname: "이선주",
      profileImageUrl: "https://example.com/profiles/user6.jpg",
      createdAt: "2024-06-23T16:27:05.725Z",
      updatedAt: "2024-06-23T16:27:05.725Z",
      isOwner: false,
    },
    {
      id: 7,
      userId: 7,
      email: "user7@example.com",
      nickname: "이재상",
      profileImageUrl: "https://example.com/profiles/user7.jpg",
      createdAt: "2024-06-23T16:28:05.725Z",
      updatedAt: "2024-06-23T16:28:05.725Z",
      isOwner: false,
    },
  ],
  totalCount: 7,
};

const BadgeCounter: FC = () => {
  const { members, totalCount } = mockMembersData;
  const maxDisplayCount = 4;

  // 뱃지의 배경색 배열
  const bgColorOptions = [
    "bg-orange-10",
    "bg-yellow",
    "bg-blue-10",
    "bg-sand",
    "bg-red-10",
  ];

  return (
    <div className='flex space-x-[-10px]'>
      {/* maxDisplayCount까지만 badge display */}
      {members.slice(0, maxDisplayCount).map((member, index) => (
        <UserBadge
          key={member.id}
          nickname={member.nickname}
          bgColor={bgColorOptions[index % bgColorOptions.length]}
          textColor='text-white'
        />
      ))}
      {/* 4명(MaxDisplayCount)이상일 경우 나머지 인원 +숫자로 표기 */}
      {totalCount > maxDisplayCount && (
        <UserBadge
          key={members[maxDisplayCount].id}
          customValue={`+${totalCount - maxDisplayCount}`}
          bgColor={bgColorOptions[maxDisplayCount % bgColorOptions.length]}
          textColor='text-red-20'
        />
      )}
    </div>
  );
};

export default BadgeCounter;
