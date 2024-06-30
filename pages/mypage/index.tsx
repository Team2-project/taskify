/*
  MyPage(계정관리)
*/
import React, { FC } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProfileUpdate from "@/components/MyPage/ProfileUpdate";
import PasswordChange from "@/components/MyPage/PasswordChange";
import BackLink from "@/components/MyPage/BackLink";

const MyPage: FC = () => {
  return (
    <DashboardLayout
      title='계정관리'
      showActionButton={false}
      showBadgeCounter={false}
      showProfileDropdown={true}
      showCreatedByMeIcon={false}
    >
      {/* 돌아가기 링크 */}
      <BackLink href='/mydashboard' label='돌아가기' />

      {/* 프로필 폼 */}
      <ProfileUpdate />

      {/* 공백 */}
      <div className='mt-3' />

      {/* 비밀번호 변경 폼 */}
      <PasswordChange />
    </DashboardLayout>
  );
};

export default MyPage;
