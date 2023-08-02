
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../firebase";

import { signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

import Card from "./tools/Card";

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
    // const usersCollectionRef = collection(db, "users");
    // const queryUserData = query(usersCollectionRef, where("first_name", "==", "Kevin"));
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
  const setData = async () => {
    const setCol = collection(db, "users", auth?.currentUser?.uid ?? "", "projects");

    const data = {
      hello: "hello kupal itlog "
    }
    try {
      await addDoc(setCol, data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <div className="grid grid-flow-col mx-auto">
        <section className="w-[68%] h-auto place-self-center" >
          <Image
            className=""
            width={0}
            height={0}
            alt="box-logo"
            src="/assets/box-logo.png"
            layout="responsive"
            objectFit="contain"
          />
        </section>

        {/*--------------------- Form -----------------------------------*/}
        <Card outside="w-full max-w-sm place-self-center mr-10" inside="bg-gradient-to-br from-[#669999] from-35% to-[#FF6633] rounded-lg shadow-md px-8 pt-6 pb-8">
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
            <div className="flex items-center justify-between bg-slate-300 rounded-xl px-4 py-4 w-full">
              <p className="text-black ">Not Registered Yet?</p>
              <div className="">
                <Link className="app-button bg-[#669999] hover:bg-[#78acac]" href="/components/signup">
                  Sign Up
                </Link>
              </div>
              <button type="button" className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={setData}>hello</button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
