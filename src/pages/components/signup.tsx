import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';

import Card from "./tools/Card";

const SignUpPage = (): React.JSX.Element => {
  const router = useRouter();

  // Create User
  const createUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email: string = form.email.value;
    const pass: string = form.pass.value;
    const repass: string = form.repass.value;

    try {
      if(repass === pass) {
        await createUserWithEmailAndPassword(auth, email, pass);
        // Get other credentials and put in database
        setUserData(e);
        console.log(`User Created. Id : ${auth.currentUser?.uid}`);
        form.reset();

        // Redirect to Login Page
        console.log("Redirecting to Login Page...");
        await router.push('/components/login');
      } else {
        console.log("Re-entered Password doesn't match the password");
      }

    } catch (error) {
      console.log(error);
    }
  }

  // Add User Data to Firestore
  const setUserData = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const userDataDocRef = doc(db, "users", auth?.currentUser?.uid ?? "");
    const form = e.target as HTMLFormElement;
    const data = {
      first_name : form.fname.value as string,
      last_name : form.lname.value as string,
      department : form.department.value as string
    }
    try {
      await setDoc(userDataDocRef, data);   // set user's data to the database
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
          <form onSubmit={createUser}>
            {/*---------------------------- First Name -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">First Name</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="First Name" name="fname" />
            </div>

            {/*---------------------------- Last Name -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Last Name</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Last Name" name="lname" />
            </div>

            {/*---------------------------- Department -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Department</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Department" name="department" />
            </div>

            {/*---------------------------- Email Address -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Email Address</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Email Address" name="email" />
            </div>

            {/*---------------------------- Password -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Password</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="Password" name="pass" />
            </div>

            {/*---------------------------- Re-Enter Password -------------------------------------*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Re-Enter Password</label>
              <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="Re-enter Password" name="repass" />
            </div>

            {/*---------------------------- Login -------------------------------------*/}
            <div className="flex justify-end mt-12">
              <button type="submit" className="app-button bg-[#202027] hover:bg-[#3c3c46]">
                Sign Up
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage;