import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, googleProvider, db } from "../../../firebase";
import { signOut } from "firebase/auth";

// User defined imports
import { useStateService } from "@/shared/StateService";
import { Card } from "./index";

const Button = () => {
  const router = useRouter();
  const [isShowMenu, setShowMenu] = useState(false);
  const { state } =  useStateService();
  // FIX THISSS
  // handles user menu popup
  // useEffect(() => {
  //   const handleOutsideClick = () => setShowMenu(true);
  //   window.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   }
  // }, []);

  const logOut = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut(auth);
    router.push("/");
  }

  return (
    <>
      {router.pathname !== "/components/login" && (
        <>
          {/* If User is Logged In */}
          {auth?.currentUser?.uid !== undefined ? (
            <>
              <button type="button" className="mx-3" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setShowMenu(!isShowMenu)}>
                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke={`${state.icon_color}`} strokeWidth="2" strokeLinecap="round"></path> </g></svg>
              </button>

              {/* Show menu when above button was clicked */}
              {isShowMenu && (
                <Card outside="fixed top-16 right-7 w-60 max-w-xs z-[9999]" inside={`flex flex-col justify-center items-center space-y-4 py-4 ${state.header_color} rounded-lg shadow-xl`}>
                  <svg width="90px" height="90px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke={`${state.icon_color}`} strokeWidth="2"></path> <path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke={`${state.icon_color}`} strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                  <p> {auth?.currentUser?.displayName} </p>   
                  <button className="app-button mx-1 bg-[#669999] hover:bg-[#78acac]" onClick={logOut}>Logout</button> 
                </Card>
              )}
            </>
          ) : (
            // If User Is not Logged In
            <Link
              className={`app-button bg-[#669999] hover:bg-[#78acac]`}
              href="/components/login">
              Login
            </Link>
          )}
        </>
      )}
    </>
  );
};
export default Button;
