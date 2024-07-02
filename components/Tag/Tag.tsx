import React from "react";

interface TagProps {
  tag: string;
}

const tagColors: { background: string; color: string }[] = [
  { background: "bg-pink-bg", color: "text-pink" },
  { background: "bg-violet-10", color: "text-violet-20" },
  { background: "bg-green-bg", color: "text-green-text" },
  { background: "bg-blue-bg", color: "text-blue-text" },
];

const Tag: React.FC<TagProps> = ({ tag }) => {
  const { background, color } =
    tagColors[
      Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        tagColors.length
    ];

  return (
    <span
      className={`mr-1 rounded ${background} px-1.5 py-1 text-[10px] font-normal ${color}`}
    >
      <span>{tag}</span>
    </span>
  );
};

export default Tag;
