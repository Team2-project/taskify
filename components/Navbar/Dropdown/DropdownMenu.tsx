/*
Navbar 프로필 버튼 클릭시 나타나는 Dropdown Menu
*/

import { useState, useEffect, useRef } from "react";

interface DropdownMenuProps {
  buttonLabel: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Dropdown 이외의 영역 클릭 시 Dropdown 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button onClick={toggleDropdown}>{buttonLabel}</button>{" "}
      {isOpen && (
        <div className='absolute right-0 mt-8 w-[160px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
          <div
            className='block px-4 py-1 py-2 text-base text-black-30 hover:bg-gray-10 hover:text-black-30'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <a href='/mypage' className='block px-4 py-2' role='menuitem'>
              내 정보
            </a>
            <a href='/mydashboard' className='block px-4 py-2' role='menuitem'>
              내 대시보드
            </a>
            <div className='m-2 border-t border-gray-30'></div> {/* 수평 선 */}
            {/* 로그아웃 기능 추가 필요 - 현재는 landing page로 연결만 해 둠 */}
            <a href='/' className='block px-4 py-2' role='menuitem'>
              로그아웃
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
