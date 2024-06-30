/*
HomeLayout: LandingPage(/)에 적용하는 Layout
*/

import { ReactNode } from "react";
import NavMain from "@/components/Navbar/NavMain";
import Footer from "@/components/Footer";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className='bg-black pb-[90px] tablet:pb-[40px] desktop:pb-[40px]'>
      <NavMain />
      {children}
      <Footer />
    </div>
  );
}
