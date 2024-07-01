import { FC, useEffect, useState } from "react";
import { ColumnResponse } from "@/lib/api/types/columns";
import Image from "next/image";

interface ColumnTitleProps {
  columnId: number;
}

const mockColumns: ColumnResponse[] = [
  {
    id: 33066,
    title: "To Do",
    teamId: "6-2",
    createdAt: "2024-07-01T20:00:37.413Z",
    updatedAt: "2024-07-01T20:00:37.413Z",
  },
  {
    id: 33067,
    title: "In Progress",
    teamId: "6-2",
    createdAt: "2024-07-01T20:00:37.413Z",
    updatedAt: "2024-07-01T20:00:37.413Z",
  },
];

const tagColors: { background: string; color: string }[] = [
  { background: "bg-pink-bg", color: "text-pink" },
  { background: "bg-red-10", color: "text-red" },
  { background: "bg-green-bg", color: "text-green-text" },
  { background: "bg-blue-bg", color: "text-blue-text" },
  { background: "bg-orange", color: "text-orange-10" },
];

const ColumnTitle: FC<ColumnTitleProps> = ({ columnId }) => {
  const [columnTitle, setColumnTitle] = useState<string>("");

  useEffect(() => {
    const fetchColumnTitle = async () => {
      // Mock data를 사용하여 columnTitle을 가져오는 중. 추후 API 연결.
      const column = mockColumns.find((col) => col.id === columnId);
      if (column) {
        setColumnTitle(column.title);
      }
    };

    fetchColumnTitle();
  }, [columnId]);

  const { background, color } =
    tagColors[
      Array.from(columnTitle).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0,
      ) % tagColors.length
    ];

  return (
    <span
      className={`mr-1 rounded ${background} px-1.5 py-1 text-[10px] font-normal ${color}`}
    >
      <span>● {columnTitle}</span>
    </span>
  );
};

export default ColumnTitle;
