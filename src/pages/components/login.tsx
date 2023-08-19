
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../firebase";

import { signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

// User Defined Imports
import { Card } from "../components/tools";

const LoginPage = (): React.JSX.Element => {
  const router = useRouter();
  const authUser = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form  = e.target as HTMLFormElement;
    const email: string = form.email.value;
    const pass: string = form.pass.value;

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      // Get UserName
      getUserName();
      
      console.log("Login Successful...");
      // Once Logged In, Discover Page is the first to land on and user unlocks other app features like create project, fund etc.
      router.push('/components/nav/discover');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  const getUserName = async () => {
    const userDocRef = doc(db, "users", auth?.currentUser?.uid ?? "");
    try {
      const userData = await getDoc(userDocRef);
      // UserName based on Created Full Name when signed up, data will be fetched from database
      await updateProfile(auth.currentUser as User, {
        displayName: `${userData.data()?.first_name} ${userData.data()?.last_name}`
      })
      return auth.currentUser?.displayName;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center max-[1205px]:mt-12 max-h-[85vh] gap-[15%] mr-6">
      <Image
        className="w-[650px] h-[600px] max-[1205px]:hidden"
        width={0}
        height={0}
        alt="box-logo"
        src="/assets/box-logo.svg"
      />
      {/*--------------------- Form -----------------------------------*/}
      <Card outside="w-[350px] h-[450px] flex flex-col" inside="bg-gradient-to-br from-[#669999] from-35% to-[#FF6633] rounded-lg shadow-md px-8 pt-6 pb-8">
        <form onSubmit={authUser}>
          {/*---------------------------- Email Address -------------------------------------*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Email Address</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="email" placeholder="Email Address" name="email"/>
          </div>

          {/*---------------------------- Password -------------------------------------*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Password</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="Password" name="pass"/>
          </div>

          {/*---------------------------- Login -------------------------------------*/}
          <div className="flex justify-center mt-12 mb-24">
            <button type="submit" className="app-button bg-[#202027] hover:bg-[#3c3c46]">
              Login
            </button>
          </div>
          {/*---------------------------- Not Registered -------------------------------------*/}
          <div className="flex items-center justify-between bg-slate-300 rounded-xl p-4 w-full">
            <p className="text-black ">Not Registered Yet?</p>
            <Link className="app-button bg-[#669999] hover:bg-[#78acac]" href="/components/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
