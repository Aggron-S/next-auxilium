import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase Imports
import { auth } from "../../firebase";
import { signOut, updateProfile, User } from "firebase/auth";

// User defined Imports
import { Button, Card } from "@/shared/Tools";
import { useStateService } from "@/shared/StateService";

const Header = () => {
  const router = useRouter();
  const sideMenuRef = useRef<HTMLDivElement | null>(null);
  const [isShowSideMenu, setShowSideMenu] = useState(false);
  const { state, setState } = useStateService();

  // update body bg color
  useEffect(() => {
    document.body.className = state.bg_color;
  }, [state.bg_color]);

  // handles window resize
  useEffect(() => {
    const handleResize = () => setState("windowWidth", window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handles SideMenu Display
  useEffect(() => {
    const sideMenu = () => {
      if (window.innerWidth >= 768 && isShowSideMenu) {
        setShowSideMenu(false);
      }
    }
    window.addEventListener("resize", sideMenu);

    return () => {
      window.removeEventListener("resize", sideMenu);
    }
  }, [isShowSideMenu]);

  // Handles Modal Outside Click (but place it in the Header's side menu, i just created logic here for reference)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sideMenuRef.current?.contains(e.target as Node) === false && isShowSideMenu) {
        setShowSideMenu(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isShowSideMenu]);


  const currentMode = () => {
    // Change Background Color
    const newBgColor = state.bg_color === 'bg-slate-200' ? 'bg-[#2f3038]' : 'bg-slate-200';
    setState("bg_color", newBgColor);

    // Change Mode Icon
    const newModeIcon = state.currentModeIcon === 'light' ? 'dark' : 'light';
    setState("currentModeIcon", newModeIcon);

    // Change Header Color
    const newHeaderColor = state.header_color === 'bg-slate-200' ? 'bg-[#202027]' : 'bg-slate-200';
    setState("header_color", newHeaderColor);  

    // Change Text Color
    const newTextColor = state.text_color === 'text-black' ? 'text-white' : 'text-black';
    setState("text_color", newTextColor);

    // Change Icon Color
    const newIconColor = state.icon_color === '#323232' ? '#e2e8f0' : '#323232';
    setState("icon_color", newIconColor);
    
  };

  const logOut = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signOut(auth);
      await updateProfile(auth.currentUser as User, {
        // Set displayName to empty string when user is logged out
        displayName: ''
      });
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  }

  return (
    <>
      {/* Side Menu (for small screen) */}
      {isShowSideMenu && (
        <>
          <div className="fixed inset-0 transition-opacity" ref={sideMenuRef}>
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>

          <Card outside={`sidemenu ${isShowSideMenu ? 'show' : ''}`} inside={`${state.bg_color} ${state.text_color} h-screen pt-4 pb-8 px-4 shadow-xl`}>
            <ul className="flex flex-col items-center space-y-4 py-4">

              {/* User */}
              <div className="flex flex-col items-center space-y-2 py-3">
                <svg width="90px" height="90px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke={`${state.icon_color}`} strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                <p>{auth?.currentUser?.displayName}</p>
              </div>

              <Link href="/components/nav/discover">Discover</Link>

              {/* User can create and manage projects once logged in */}
              {auth.currentUser !== null && (
                <>
                  <Link href="/components/nav/user-proj">Your Project</Link>
                  <Link href="/components/nav/create-proj">Create</Link>
                </>
              )}
              <Link href="/components/nav/about-us">About Us</Link>

              <button 
                onClick={currentMode}>
                  {state.currentModeIcon === "light" ? (
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#a)" stroke="#323232" strokeWidth="1.5" strokeMiterlimit="10"> <path d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05" strokeLinecap="round"></path> <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path> <path d="M12 19v4M12 1v4" strokeLinecap="round"></path> </g> <defs> <clipPath id="a"> <path fill="#ffffff" d="M0 0h24v24H0z"></path> </clipPath> </defs> </g></svg>
                  ) : (state.currentModeIcon === "dark" && (
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  ))}
              </button>
              
              {/* Logout */}
              <button className="app-button mx-1 bg-[#669999] hover:bg-[#78acac]" onClick={logOut}>Logout</button> 
            </ul>
          </Card>
        </>
      )}

      {/* Header */}
      <nav className={`flex items-center justify-between p-2 ${state.header_color}`}>
        <Link className="ml-3" href="/">
          <Image width={150} height={150} alt="auxilium-logo" src="/assets/auxilium-logo.png" />
        </Link>

        {state.windowWidth < 768 ? (
          // Small Screen
          <ul className="flex justify-center items-center mr-2">
            <button 
              className="mx-3"
              onClick={currentMode}>
                {state.currentModeIcon === "light" ? (
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#a)" stroke="#323232" strokeWidth="1.5" strokeMiterlimit="10"> <path d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05" strokeLinecap="round"></path> <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path> <path d="M12 19v4M12 1v4" strokeLinecap="round"></path> </g> <defs> <clipPath id="a"> <path fill="#ffffff" d="M0 0h24v24H0z"></path> </clipPath> </defs> </g></svg>
                ) : (state.currentModeIcon === "dark" && (
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                ))}
            </button>
            
            {/* Side Menu Icon */}
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => setShowSideMenu(!isShowSideMenu)}>
              <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Hamburger_MD"> <path id="Vector" d="M5 17H19M5 12H19M5 7H19" stroke={`${state.icon_color}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            </button>
          </ul>
        ) : (
          // Large Screen
          <ul className={`flex justify-center items-center mr-2 ${state.text_color}`}>
            <Link className="mx-3" href="/components/nav/discover">Discover</Link>

            {/* User can create and manage projects once logged in */}
            {auth.currentUser !== null && (
              <>
                <Link className="mx-3" href="/components/nav/user-proj">Your Project</Link>
                <Link className="mx-3" href="/components/nav/create-proj">Create</Link>
              </>
            )}
            <Link className="mx-3" href="/components/nav/about-us">About Us</Link>

            <button 
              className="mx-3"
              onClick={currentMode}>
                {state.currentModeIcon === "light" ? (
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#a)" stroke="#323232" strokeWidth="1.5" strokeMiterlimit="10"> <path d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05" strokeLinecap="round"></path> <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path> <path d="M12 19v4M12 1v4" strokeLinecap="round"></path> </g> <defs> <clipPath id="a"> <path fill="#ffffff" d="M0 0h24v24H0z"></path> </clipPath> </defs> </g></svg>
                ) : (state.currentModeIcon === "dark" && (
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                ))}
            </button>
            
            {/* User Icon Button */}
            <Button />
          </ul>
        )}
      </nav>
    </>
  )
};
export default Header;
