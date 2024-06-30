/*
useClickOutside 훅: 클릭 이벤트를 감지하여, 클릭이 특정 요소 외부에서 발생했을 때 '닫는 기능'수행
예) dropdown 메뉴를 열었을 때, dropdown 이외의 영역을 클릭하면 dropdown이 닫히는 효과
*/
import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;
