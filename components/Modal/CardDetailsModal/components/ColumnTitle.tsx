import { FC } from "react";
import { ColumnResponse } from "@/lib/api/types/columns";
import fetcher from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";

interface ColumnTitleProps {
  columnId: number;
  dashboardId: number;
}

const tagColors: { background: string; color: string }[] = [
  { background: "bg-pink-bg", color: "text-pink" },
  { background: "bg-red-10", color: "text-red" },
  { background: "bg-green-bg", color: "text-green-text" },
  { background: "bg-blue-bg", color: "text-blue-text" },
  { background: "bg-orange", color: "text-orange-10" },
];

const ColumnTitle: FC<ColumnTitleProps> = ({ columnId, dashboardId }) => {
  const { data, error, isLoading } = useQuery<{
    result: string;
    data: ColumnResponse[];
  }>({
    queryKey: ["columns", dashboardId],
    queryFn: () =>
      fetcher<{ result: string; data: ColumnResponse[] }>({
        url: `columns`,
        method: "GET",
        params: { dashboardId },
      }),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    console.error("Failed to fetch column title", error);
    return <span>Error</span>;
  }

  const column = data?.data.find((col) => col.id === columnId);
  const columnTitle = column ? column.title : "Unknown Column";

  const { background, color } =
    tagColors[
      Array.from(columnTitle).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0,
      ) % tagColors.length
    ];

  return (
    <span
      className={`rounded-[11px] ${background} px-1.5 py-1 text-[10px] font-normal ${color}`}
    >
      <span>● {columnTitle}</span>
    </span>
  );
};

export default ColumnTitle;
