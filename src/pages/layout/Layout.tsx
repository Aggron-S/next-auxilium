import { ReactNode } from "react";
import Header from "./Header";
// SubNav
import SubNav from "./subnav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <SubNav />
      {children}
    </>
  );
};
export default Layout;
