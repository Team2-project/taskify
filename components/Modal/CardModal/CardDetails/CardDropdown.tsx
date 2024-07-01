import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const CardDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <div className='relative inline-block' ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className='flex items-center justify-center'
      >
        <Image
          src={"icon/ic_kebab_menu.svg"}
          alt='수정/삭제하기'
          width={32}
          height={32}
        />
      </button>
      {isOpen && (
        <ul className='absolute right-0 mt-2 w-[120px] rounded border-[1px] border-gray-30 bg-white shadow-lg'>
          <div>
            <li className='p-[8px]'>
              <button className='focus:bg-purple-bg hover:bg-purple-10 w-full rounded-[4px] px-4 py-2 text-left text-center hover:text-purple focus:outline-none'>
                수정하기
              </button>
            </li>
          </div>
          <div>
            <li className='p-[8px]'>
              <button className='focus:bg-purple-bg hover:bg-purple-10 w-full rounded-[4px] px-4 py-2 text-left text-center hover:text-purple focus:outline-none'>
                삭제하기
              </button>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default CardDropdown;
