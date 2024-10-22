import HomeLayout from "@/components/Layout/HomeLayout";
import Image from "next/image";
import LinkButton from "@/components/Button/LinkButton/LinkButton";

export default function Home() {
  return (
    <HomeLayout>
      <div className='pb-[90px] tablet:pb-[40px]'>
        <div className='mx-auto mb-[84px] mt-[42px] w-[287px] tablet:mb-[200px] tablet:mt-[74px] tablet:w-[768px] desktop:mb-[200px] desktop:mt-[74px] desktop:w-[1000px]'>
          <Image
            className='mx-auto mb-[21px] tablet:mb-[30px] tablet:w-[537px] desktop:mb-[30px] desktop:w-[722px]'
            src='/img_landing/illustration.png'
            alt='illustration'
            width={287}
            height={168}
            sizes='(max-width: 768px) 287px, (max-width: 1200px) 537px, 722px'
          />
          <div className='text-center'>
            <span className='text-[36px] font-bold text-white tablet:text-[56px] desktop:text-[76px]'>
              새로운 일정 관리
              <span className='block text-[38px] font-bold text-violet-20 tablet:inline tablet:text-[70px] desktop:text-[90px]'>
                &nbsp;Taskify
              </span>
            </span>
            <h4 className='mb-[63px] mt-[21px] text-center text-[12px] text-white tablet:text-[16px] desktop:text-[18px]'>
              스마트하게 나의 일정을 관리해보자!
            </h4>
            <div className='text-center'>
              <LinkButton
                to='/login'
                children='로그인하기'
                className='h-[42px] w-[235.2px] text-[14px] font-medium text-white tablet:h-[50px] tablet:w-[280px] tablet:text-[16px] desktop:text-[18px]'
              />
            </div>
          </div>
        </div>

        <div className='relative mx-auto mb-[64px] h-[686px] w-[343px] rounded-lg bg-black-30 pt-[99px] tablet:h-[972px] tablet:w-[664px] desktop:h-[600px] desktop:w-[1200px]'>
          <div className='text-center tablet:ml-[60px] tablet:text-left'>
            <h3 className='mb-[66px] text-[18px] font-medium text-gray-40 tablet:mb-[108px] tablet:text-[22px] tablet:font-medium desktop:mb-[108px]'>
              Point1
            </h3>
            <h1 className='text-[36px] font-bold text-white tablet:text-[48px]'>
              일의 우선순위를
              <br />
              관리하세요
            </h1>
          </div>
          <Image
            className='absolute bottom-0 right-0 tablet:w-[519px] desktop:w-[594px]'
            src='/img_landing/img_point2.svg'
            alt='point1 image'
            width={296}
            height={248}
          />
        </div>

        <div className='relative mx-auto h-[686px] w-[343px] rounded-lg bg-black-30 pt-[99px] tablet:h-[972px] tablet:w-[664px] desktop:flex desktop:h-[600px] desktop:w-[1200px] desktop:flex-row-reverse'>
          <div className='text-center tablet:ml-[60px] tablet:text-left desktop:absolute desktop:left-1/2'>
            <h3 className='mb-[66px] text-[18px] font-medium text-gray-40 tablet:mb-[108px] tablet:text-[22px] tablet:font-medium desktop:mb-[108px]'>
              Point2
            </h3>
            <h1 className='text-[36px] font-bold text-white tablet:text-[48px]'>
              해야 할 일을
              <br />
              등록하세요
            </h1>
          </div>
          <Image
            className='absolute bottom-0 left-1/2 -ml-[108.5px] tablet:-ml-[180px] tablet:w-[360px] desktop:-ml-[500px] desktop:w-[436px]'
            src='/img_landing/img_point3.svg'
            alt='point1 image'
            width={216}
            height={250}
          />
        </div>

        <div className='mx-auto mt-[90px] desktop:w-[1200px] desktop:flex-col'>
          <h2 className='mb-[32px] text-center text-[22px] font-bold text-white tablet:text-[28px] desktop:text-left'>
            생산성을 높이는 다양한 설정 ⚡
          </h2>
          <div className='mx-auto my-0 desktop:flex desktop:w-[1200px] desktop:justify-between'>
            <div className='mb-[40px]'>
              <div className='mx-auto my-0 flex h-[235.93px] w-[343px] justify-center rounded-t-lg bg-black-10 tablet:h-[260px] tablet:w-[378px]'>
                <Image
                  className='mx-auto my-0 tablet:w-[300px]'
                  src='/img_landing/img_bottom1.svg'
                  alt='bottom image 1'
                  width={260}
                  height={107.35}
                />
              </div>
              <div className='mx-auto my-0 flex h-[112.52px] w-[343px] flex-col justify-between rounded-b-lg bg-black-30 p-7 text-white tablet:h-[124px] tablet:w-[378px]'>
                <h3 className='text-[18px] font-bold'>대시보드 설정</h3>
                <h4 className='text-[14px] font-medium'>
                  대시보드 사진과 이름을 변경할 수 있어요.
                </h4>
              </div>
            </div>

            <div className='mb-[40px]'>
              <div className='mx-auto my-0 flex h-[235.93px] w-[343px] justify-center rounded-t-lg bg-black-10 tablet:h-[260px] tablet:w-[378px]'>
                <Image
                  className='mx-auto my-0 tablet:w-[300px]'
                  src='/img_landing/img_bottom2.svg'
                  alt='bottom image 1'
                  width={260}
                  height={107.35}
                />
              </div>
              <div className='mx-auto my-0 flex h-[112.52px] w-[343px] flex-col justify-between rounded-b-lg bg-black-30 p-7 text-white tablet:h-[124px] tablet:w-[378px]'>
                <h3 className='text-[18px] font-bold'>초대</h3>
                <h4 className='text-[14px] font-medium'>
                  새로운 팀원을 초대할 수 있어요.
                </h4>
              </div>
            </div>

            <div className='mb-[120px]'>
              <div className='mx-auto my-0 flex h-[235.93px] w-[343px] justify-center rounded-t-lg bg-black-10 tablet:h-[260px] tablet:w-[378px]'>
                <Image
                  className='mx-auto my-0 tablet:w-[300px]'
                  src='/img_landing/img_bottom3.svg'
                  alt='bottom image 1'
                  width={260}
                  height={107.35}
                />
              </div>
              <div className='mx-auto my-0 flex h-[112.52px] w-[343px] flex-col justify-between rounded-b-lg bg-black-30 p-7 text-white tablet:h-[124px] tablet:w-[378px]'>
                <h3 className='text-[18px] font-bold'>구성원</h3>
                <h4 className='text-[14px] font-medium'>
                  구성원을 초대하고 내보낼 수 있어요.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
