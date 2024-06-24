/*
Navbar 프로필 버튼 클릭시 나타나는 Dropdown Menu
Dropdown menu 쓰는 곳이 우리 프로젝트에서 Nav bar 유일.
*/
import { useState } from "react";

interface DropdownMenuProps {
  buttonLabel: string; // 버튼 텍스트를 prop으로 받음
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleDropdown}>{buttonLabel}</button>{" "}
      {/* 버튼 텍스트 prop 사용 */}
      {isOpen && (
        <div className='w-51 absolute right-5 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 tablet:right-10 desktop:right-20'>
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
