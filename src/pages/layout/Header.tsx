import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase Imports
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

// User defined Imports
import Button from "../components/tools/Button";
import { useStateService } from "@/shared/StateService";

const Header = () => {
  const router = useRouter();
  const { state, setState } = useStateService();

  const currentMode = () => {
    // Change Background Color
    const newBgColor = state.bg_color === 'bg-slate-200' ? 'bg-[#2f3038]' : 'bg-slate-200';
    setState("bg_color", newBgColor);
    // Change Header Color
    const newHeaderColor = state.header_color === 'bg-slate-200' ? 'bg-[#202027]' : 'bg-slate-200';
    setState("header_color", newHeaderColor);
    
    // Change Text Color
    const newTextColor = state.text_color === 'text-black' ? 'text-white' : 'text-black';
    setState("text_color", newTextColor);

    // Change Card Color
    const newCardColor = state.card_color === 'bg-[#202027]' ? 'red' : 'bg-[#202027]';
    setState("card_color", newCardColor);
  };

  const logOut = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut(auth);
    router.push("/");
  }

  // update body bg color
  useEffect(() => {
    document.body.className = state.bg_color;
  }, [state.bg_color]);

  return (
    <nav className={`flex items-center justify-between p-2 ${state.header_color}`}>
      <Link className="ml-3" href="/">
        <Image width={150} height={150} alt="auxilium-logo" src="/assets/auxilium-logo.png" />
      </Link>
      <ul className={`mr-2 ${state.text_color}`}>
        <Link className="mx-4" href="/components/nav/discover">Discover</Link>

        {/* User can create and manage project once logged in */}
        {auth.currentUser !== null ? (
          <>
            <Link className="mx-4" href="/components/nav/user-proj">Your Project</Link>
            <Link className="mx-4" href="/components/nav/create-proj">Create</Link>
          </>
        ) : (
          <>
            <Link className="mx-4" href="/components/nav/join">Join</Link>
          </>
        )}
        <Link className="mx-4 mr-10" href="/components/nav/about-us">About Us</Link>
        {/* <Button />  FIX THIS, WHENEVER I CLICK ANY BUTTON IN HEADER IT RETURNS UNDEFINED IN CONSOLE */}
        <button className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={currentMode}>text</button>
        <button className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={logOut}>Logout</button>
      </ul>
    </nav>
  )
};

export default Header;
