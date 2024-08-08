import { ReactNode } from "react";
import Header from "./Header";
// SubNav
import SubNav from "./subnav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-10/10/80 h-screen">
      <div className="col-span-full">
        <Header />
      </div>
      <div className="col-span-full">
        <SubNav />
      </div>
      <main className="col-span-full overflow-auto pt-5">
        {children}
      </main>
    </div>
  );
};
export default Layout;
