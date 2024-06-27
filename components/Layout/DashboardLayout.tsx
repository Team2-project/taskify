import { ReactNode } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";

interface NavMyDashboardProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: NavMyDashboardProps) {
  return (
    <div>
      <NavMyDashboard />
      <SideMenu />
      {children}
    </div>
  );
}
