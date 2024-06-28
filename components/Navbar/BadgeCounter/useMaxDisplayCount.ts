/* BadgeCounter에 사용되는 useMaxDisplayCount 커스텀 훅 */

import { useState, useEffect } from "react";

const useMaxDisplayCount = () => {
  const getMaxDisplayCount = () => {
    if (window.innerWidth >= 1280) return 4;
    else return 2;
  };

  const [maxDisplayCount, setMaxDisplayCount] = useState(getMaxDisplayCount());

  useEffect(() => {
    const handleResize = () => {
      setMaxDisplayCount(getMaxDisplayCount());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return maxDisplayCount;
};

export default useMaxDisplayCount;
