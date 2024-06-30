//대시보드 멤버 조회
export interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}

export const mockMembersData: MembersResponse = {
  members: [
    {
      id: 1,
      userId: 1,
      email: "user1@example.com",
      nickname: "곽철이",
      profileImageUrl: "https://example.com/profiles/user1.jpg",
      createdAt: "2024-06-23T16:22:05.725Z",
      updatedAt: "2024-06-23T16:22:05.725Z",
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      email: "user2@example.com",
      nickname: "춘식이",
      profileImageUrl: "https://example.com/profiles/user2.jpg",
      createdAt: "2024-06-23T16:23:05.725Z",
      updatedAt: "2024-06-23T16:23:05.725Z",
      isOwner: false,
    },
    {
      id: 3,
      userId: 3,
      email: "user3@example.com",
      nickname: "오둥이",
      profileImageUrl: "https://example.com/profiles/user3.jpg",
      createdAt: "2024-06-23T16:24:05.725Z",
      updatedAt: "2024-06-23T16:24:05.725Z",
      isOwner: false,
    },
    {
      id: 4,
      userId: 4,
      email: "user4@example.com",
      nickname: "고심이",
      profileImageUrl: "https://example.com/profiles/user4.jpg",
      createdAt: "2024-06-23T16:25:05.725Z",
      updatedAt: "2024-06-23T16:25:05.725Z",
      isOwner: false,
    },
    {
      id: 5,
      userId: 5,
      email: "user5@example.com",
      nickname: "케로케로케로피",
      profileImageUrl: "https://example.com/profiles/user5.jpg",
      createdAt: "2024-06-23T16:26:05.725Z",
      updatedAt: "2024-06-23T16:26:05.725Z",
      isOwner: false,
    },
    {
      id: 6,
      userId: 6,
      email: "user6@example.com",
      nickname: "라이언",
      profileImageUrl: "https://example.com/profiles/user6.jpg",
      createdAt: "2024-06-23T16:27:05.725Z",
      updatedAt: "2024-06-23T16:27:05.725Z",
      isOwner: false,
    },
    {
      id: 7,
      userId: 7,
      email: "user7@example.com",
      nickname: "하츄핑",
      profileImageUrl: "https://example.com/profiles/user7.jpg",
      createdAt: "2024-06-23T16:28:05.725Z",
      updatedAt: "2024-06-23T16:28:05.725Z",
      isOwner: false,
    },
  ],
  totalCount: 7,
};
