import { ReactNode } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
}

export default function DashboardLayout({
  children,
  title,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
}: DashboardLayoutProps) {
  return (
    <div>
      <NavMyDashboard
        title={title}
        showActionButton={showActionButton}
        showBadgeCounter={showBadgeCounter}
        showProfileDropdown={showProfileDropdown}
      />
      <SideMenu />
      {children}
    </div>
  );
}
