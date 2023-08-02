import React from "react";
import { useRouter } from "next/router";

const SubNav = () => {
  const router = useRouter();
  const appStaticPath = ["/", "/components/login", "/components/signup"];

  const searchProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Some Button Click Logic
    e.preventDefault();
    console.log("Search Button Clicked");
    //check how it works on your angular project, maybe you also need some subscription instead of getting data all the time from firebase, just use the subscription's ProjectData object to filter those which are retrieved in the past.
  };

  return (
    <>
      {!appStaticPath.includes(router.pathname) && (
        <nav className="flex items-center justify-between p-3 mb-5 bg-gradient-to-r from-[#FF6633] to-[#669799]">
          {/* Subnav text depends on your current page location */}
          <h2>Discover Projects</h2>{" "}
          <section>
            <input
              className="rounded bg-slate-300 text-slate-900 border-2 border-slate-800 border-opacity-80 mr-8"
              type="text"
              id="first"
              name="first"
            />
            {/*---------------------------- Search -------------------------------------*/}
            <button
              className="app-button bg-[#202027] hover:bg-[#3c3c46]"
              onClick={searchProject}>
              Search
            </button>
          </section>
        </nav>
      )}
    </>
  );
};
export default SubNav;
