import React, { useEffect } from "react";
import { useRouter } from "next/router";

// User defined imports
import { useStateService } from "@/shared/StateService";

const SubNav = () => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const appStaticPath = ["/", "/components/login", "/components/signup"];
  const { state, setState } = useStateService();

  useEffect(() => {
    // Set SubHeaderName
    if (currentUrl === "/components/nav/discover") {
      setState("subHeaderName", "Discover Projects");
    } else if (currentUrl === "/components/nav/user-proj") {
      setState("subHeaderName", "Your Projects");
    } else if (currentUrl === "/components/nav/create-proj") {
      setState("subHeaderName", "Start a Project");
    } else if (currentUrl === "/components/nav/about-us") {
      setState("subHeaderName", "About Us");
    }
    // Activate search functionality
    currentUrl === "/components/nav/discover" ? setState("shouldDisplaySearch", true) : setState("shouldDisplaySearch", false);
  }, [currentUrl]);

  const searchProject = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    // Make a logic here, wherein you will use the custom Alert component and do some conditioning (if user pressed search icon for small screen)
    
    if (e.type === 'click' || ((e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter')) {
      e.preventDefault();
      // Get User Input
      const searchInput = document.getElementById("search-input") as HTMLInputElement;
      setState("userQuery", searchInput.value);
    }
  };

  return (
    <>
      {!appStaticPath.includes(router.pathname) && (
        <nav className="flex items-center justify-between p-3 mb-5 bg-gradient-to-r from-[#FF6633] to-[#669799]">
          {/* Subnav text depends on your current page location */}
          <p className="text-white text-3xl sm:text-4xl md:text-5xl">{state.subHeaderName}</p>

          {state.shouldDisplaySearch && (
            state.isSmallScreen ? (
              // Small Screen (search button)
              <button /*onClick={searchProject}*/>    {/* Make a modal which is connected to a state that triggers the modal popup when this button is clicked */}
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </button>
            ) : (
              <section>
                <input
                  className="bg-white border-2 border-solid border-white mr-3 rounded-lg h-9 text-black indent-2 text-sm font-extralight outline-none shadow-sm"
                  type="text"
                  id="search-input"
                  placeholder="Search a project"
                  onKeyUp={searchProject}
                />
                {/*---------------------------- Search -------------------------------------*/}
                <button
                  className="app-button bg-[#202027] hover:bg-[#3c3c46]"
                  onClick={searchProject}>
                  Search
                </button>
              </section>
            )
          )}
        </nav>
      )}
    </>
  );
};
export default SubNav;
