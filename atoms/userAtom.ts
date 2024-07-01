import { atom } from "jotai";
import { User } from "@/lib/api/types/users";

// User 데이터를 저장할 atom 생성
export const userAtom = atom<User | null>(null);
