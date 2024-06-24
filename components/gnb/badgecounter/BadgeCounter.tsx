import { useQuery } from "@tanstack/react-query";

/*


const fetchMembersResponse = async (): Promise<MembersResponse> => {
  // 현재 코드는 실제 API 호출을 대신하여 mock 데이터를 반환 - 추후 Data fetch 예정
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMembersData);
    }, 1000);
  });
};

const MyDashboard: FC = () => {
  const { data, error, isLoading } = useQuery<MembersResponse>({
    queryKey: ["MembersResponse"],
    queryFn: fetchMembersResponse,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  */

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
          nickname={member.nickname.slice(0, 1)}
          bgColor={bgColorOptions[index % bgColorOptions.length]}
        />
      ))}
      {/* Display remaining count if more members exist */}
      {totalCount > maxDisplayCount && (
        <div className='text-xs'>
          <UserBadge
            key={members[maxDisplayCount].id}
            nickname={`+${totalCount - maxDisplayCount}`}
            bgColor={bgColorOptions[maxDisplayCount % bgColorOptions.length]}
          />
        </div>
      )}
    </div>
  );
};

export default BadgeCounter;
