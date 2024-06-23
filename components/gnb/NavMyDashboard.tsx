/* MyDashboard 내비게이션 컴포넌트

- MyDashboard 페이지에서 사용하는 내비게이션
- 관리, 초대하기 버튼
- 프로필 클릭시 계정관리로 연결
 */
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";

const MyDashboard: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className='h-16 content-center border-b border-gray-30 p-4 tablet:h-20 desktop:h-20'>
        <div className='flex items-center justify-between'>
          {/*Nav 좌측*/}
          <div className='flex hidden desktop:ml-80 desktop:inline desktop:content-start desktop:text-xl desktop:font-bold'>
            내 대시보드
          </div>

          {/*Nav 우측: 관리 + 초대하기 + 프로필 + 이름*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-8 tablet:mr-10 desktop:mr-20'>
            {/*관리 + 초대하기 */}
            <div className='flex space-x-8'>
              {/*관리 버튼*/}
              <Link href='/'>
                <button
                  className='relative inline-flex items-center justify-center rounded-lg border border-gray-30'
                  style={{ width: "88px", height: "40px" }}
                >
                  <Image
                    src='icon/ic_setting.svg'
                    alt='setting'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  관리
                </button>
              </Link>

              {/*초대하기 버튼*/}
              <Link href='/'>
                <button
                  className='relative inline-flex items-center justify-center rounded-lg border border-gray-30'
                  style={{ width: "116px", height: "40px" }}
                >
                  <Image
                    src='icon/ic_add.svg'
                    alt='setting'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  초대하기
                </button>
              </Link>
            </div>

            <span className='font-bold'>|</span>

            {/*프로필 + 이름*/}
            <div className='flex items-center space-x-8'>
              <div className='relative inline-block'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green'>
                  <span className='text-gray-700 text-sm font-bold'>B</span>
                </div>
              </div>
              <div className='text-base font-medium'>배유철</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
