import { useState, useRef } from "react";
import Cookies from "js-cookie"; // js-cookie 라이브러리 추가
import useClickOutside from "@/hooks/useClickOutside";

interface DropdownMenuProps {
  buttonLabel: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // accessToken 삭제 함수
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 커스텀훅 호출: Dropdown 이외의 영역 클릭 시 Dropdown 닫기
  useClickOutside(dropdownRef, () => setIsOpen(false));

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
            <a
              href='/'
              className='block px-4 py-2'
              role='menuitem'
              onClick={handleLogout}
            >
              로그아웃
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
