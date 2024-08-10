
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Firebase Imports
import { auth, googleProvider, db } from "../../firebase";

import { AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup, updateProfile, User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

// User Defined Imports
import { Form, InputField } from "@/shared/Tools";

const LoginPage = (): React.JSX.Element => {
  const router = useRouter();
  const authUser = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form  = e.target as HTMLFormElement;
    const email: string = form.email.value;
    const pass: string = form.pass.value;

    try {
      if(!email && !pass) {
        console.log("Please complete the form.");
        return;
      } else {
        if(!email) {
          console.log("Missing email address.");
          return;
        }
        if(!pass) {
          console.log("Missing password.");
          return;
        }
      }
  
      await signInWithEmailAndPassword(auth, email, pass);
      // Get UserName
      getUserName();
      
      console.log("Login Successful...");
      // Once Logged In, Discover Page is the first to land on and user unlocks other app features like create project, fund etc.
      router.push('/components/nav/discover');
      form.reset();
    } catch (error: any) {
        if (error.code) {
          const { INVALID_EMAIL, INVALID_PASSWORD, USER_DELETED } = AuthErrorCodes;
          switch (error.code) {
            case INVALID_EMAIL:
              console.log('Invalid email address.');
              break;

            case INVALID_PASSWORD:
              console.log('Invalid password.');
              break;

            case USER_DELETED:
              console.log("User not found.");
              break;

            // Other error codes not defined in AuthErrorCodes
            default:
              console.log('Authentication failed. Error code:', error.code);
          }
        } else {
          // Handle other non-AuthError exceptions
          console.log('An error occurred:', error);
        }
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
    <div className="flex items-center justify-center md:justify-evenly h-full gap-x-10">
      <Image
        className="w-[500px] h-[500px] max-[1205px]:hidden"
        width={0}
        height={0}
        alt="box-logo"
        src="/assets/box-logo.svg"
      />
      {/*--------------------- Form -----------------------------------*/}
      <Form 
        outside="flex flex-col mx-5" 
        inside="bg-gradient-to-br from-[#669999] from-35% to-[#FF6633] rounded-lg shadow-md px-8 pt-6 pb-8"
        onSubmit={authUser}
      >
        <InputField fieldName="email_address" inputType="email" />
        <InputField fieldName="password" inputType="password" />

        {/*---------------------------- Login -------------------------------------*/}
        <div className="flex justify-center mt-12 mb-24">
          <button type="submit" className="app-button bg-[#202027] hover:bg-[#3c3c46]">
            Login
          </button>
        </div>
        {/*---------------------------- Not Registered -------------------------------------*/}
        <div className="flex items-center justify-between gap-x-5 bg-slate-300 rounded-xl p-4 w-full">
          <p className="text-black text-sm md:text-base">Not Registered Yet?</p>
          <Link 
            className="bg-[#669999] hover:bg-[#78acac] text-slate-200 rounded-md p-1 px-5 text-sm md:text-base" 
            href="/components/signup"
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
