/*
    dashboardId에 해당하는 members의 정보를 갖고 와서 전역으로 관리하기 위해 만든 Atom
*/

import { atom } from "jotai";
import { MembersResponse } from "@/lib/api/types/members"; // 타입 임포트

// 초기 상태는 빈 배열로 설정
export const membersAtom = atom<MembersResponse["members"]>([]);
