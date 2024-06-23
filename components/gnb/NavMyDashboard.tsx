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
          <Link href='mydashboard'>
            <div className='flex hidden desktop:ml-80 desktop:inline desktop:content-start desktop:text-xl desktop:font-bold'>
              내 대시보드
            </div>
          </Link>

          {/*Nav 우측: 관리 + 초대하기 + 프로필 + 이름*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-8 text-sm tablet:mr-10 tablet:text-base desktop:mr-20 desktop:text-base'>
            {/*관리 + 초대하기 */}
            <div className='flex space-x-8 whitespace-nowrap font-medium text-gray-50'>
              {/*관리 버튼*/}
              <Link href='/dashboard/{dashboardid}/edit'>
                <button
                  className='relative inline-flex items-center justify-center rounded-lg border border-gray-30 p-3 tablet:p-4 desktop:p-4'
                  style={{ height: "40px" }}
                >
                  <div className='hidden tablet:inline-block desktop:inline-block'>
                    <Image
                      src='icon/ic_setting.svg'
                      alt='setting'
                      width={20}
                      height={20}
                      className='mr-2'
                    />
                  </div>
                  관리
                </button>
              </Link>

              {/*초대하기 버튼 - 모달창 연결 */}
              <button
                className='relative inline-flex items-center justify-center rounded-lg border border-gray-30 p-3 tablet:p-4 desktop:p-4'
                style={{ height: "40px" }}
              >
                <div className='hidden tablet:inline-block desktop:inline-block'>
                  <Image
                    src='icon/ic_add.svg'
                    alt='setting'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                </div>
                초대하기
              </button>
            </div>

            <span className='font-bold'>|</span>

            {/*프로필 + 이름 - 드롭다운 연결*/}
            <div className='flex items-center space-x-8'>
              <div className='relative inline-block'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green'>
                  <span className='font-bold text-white'>B</span>
                </div>
              </div>
              <div className='hidden font-medium tablet:inline desktop:inline'>
                배유철
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
