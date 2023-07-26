import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// User defined Imports
import Button from "../components/tools/Button";
import React, { useState } from "react";

// Firebase Imports
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const router = useRouter();
  const logOut = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut(auth);
    router.push("/");
  }
  return (
    <nav className="flex items-center justify-between p-3 bg-[#202027]">
      <Link className="ml-3" href="/">
        <Image width={150} height={150} alt="auxilium-logo" src="/assets/auxilium-logo.png" />
      </Link>
      <ul className="mr-2">
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
        <Button />
        <button className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={logOut}>Logout</button>
      </ul>
    </nav>
  )
};

export default Header;
