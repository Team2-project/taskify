//대시보드 상세조회
export interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export const mockDashboardDetail: DashboardDetail = {
  id: 0,
  title: "Sample Dashboard",
  color: "#FFFFFF",
  createdAt: "2024-06-24T18:57:57.517Z",
  updatedAt: "2024-06-24T18:57:57.517Z",
  createdByMe: true,
  userId: 0,
};

//내 정보 조회
export type UserData = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const mockUserData: UserData = {
  id: 0,
  email: "test@example.com",
  nickname: "곽철이",
  profileImageUrl: "",
  createdAt: "2024-06-23T10:39:04.348Z",
  updatedAt: "2024-06-23T10:39:04.348Z",
};

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
