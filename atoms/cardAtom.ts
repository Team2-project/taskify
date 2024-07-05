import { atom } from "jotai";
import { SetStateAction } from "jotai/experimental";

export const cardAtom = atom<SetStateAction<number>>(0);

