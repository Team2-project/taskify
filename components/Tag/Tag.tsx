import React from "react";

interface TagProps {
  tag: string;
  background: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ tag, background, color }) => {
  return (
    <span
      className={`mr-1 rounded ${background} px-1.5 py-1 text-[10px] font-normal ${color}`}
    >
      <span>{tag}</span>
    </span>
  );
};

export default Tag;
