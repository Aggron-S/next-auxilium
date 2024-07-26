import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, googleProvider, db } from "../../firebase";

import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';

// User Defined Imports
import { Card, InputField } from "@/shared/Tools";

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
      if(pass === repass && repass === pass) {
        // Get other credentials and put in database
        await setUserData(e);    // remove this and place in user account settings, for initial output of user name, use the email address and let them change it later on
        await createUserWithEmailAndPassword(auth, email, pass);
        console.log(`User Created. Id : ${auth.currentUser?.uid}`);
        
        // Redirect to Login Page
        console.log("Redirecting to Login Page...");
        await router.push('/components/login');
        form.reset();
      } else {
        console.log("Password and Re-entered password should match.");
      }

    } catch (error: any) {
      if (error.code) {
        const { INVALID_EMAIL, INVALID_PASSWORD, WEAK_PASSWORD } = AuthErrorCodes;
        switch (error.code) {
          case INVALID_EMAIL:
            console.log('Invalid email address.');
            break;

          case INVALID_PASSWORD:
            console.log('Invalid password.');
            break;
          
          case WEAK_PASSWORD:
            console.log("Weak Password.");
            break; 
          
          // Other error codes not defined in AuthErrorCodes
          default:
            console.log('Authentication failed. Error code:', error.code);
        }
      } else {
        // Handle other non-AuthErrorCodes exceptions
        console.log('An error occurred:', error);
      }
    }


    // const userInfo = {
    //   email: form.email.value,
    //   pass: form.pass.value,
    //   repass: form.repass.value
    // }

    // switch (true) {
    //   case !Object.values(userInfo).every(Boolean):
    //     console.log("Please complete the form.");
    //     return;
      
    //   case userInfo.pass !== userInfo.repass || userInfo.repass !== userInfo.pass:
    //     console.log("Password and Re-entered password should match.");
    //     return;

    //   default:
    //     try {
    //       // Get other credentials and put in database
    //       await setUserData(e);
    //       await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass);
    //       console.log(`User Created. Id : ${auth.currentUser?.uid}`);
          
    //       // Redirect to Login Page
    //       console.log("Redirecting to Login Page...");
    //       await router.push('/components/login');
    //       form.reset();
          
    //     } catch (error) {
    //       if (error.code) {
    //         const { INVALID_EMAIL, INVALID_PASSWORD, WEAK_PASSWORD } = AuthErrorCodes;
    //         switch (error.code) {
    //           case INVALID_EMAIL:
    //             console.log('Invalid email address.');
    //             break;
    
    //           case INVALID_PASSWORD:
    //             console.log('Invalid password.');
    //             break;
              
    //           case WEAK_PASSWORD:
    //             console.log("Weak Password.");
    //             break; 
              
    //           // Other error codes not defined in AuthErrorCodes
    //           default:
    //             console.log('Authentication failed. Error code:', error.code);
    //         }
    //       } else {
    //         // Handle other non-AuthError exceptions
    //         console.log('An error occurred:', error);
    //       }
    //     }
    // }
  }

  // Add User Data to Firestore
  // It's not intended to be here, only email, pass and reenter pass
  // fields inside of this must be configured on user account settings once the user is logged in and has account
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
      if(!data.first_name) {
        throw new Error("Please put the first name.");
      }
      if(!data.last_name) {
        throw new Error("Please put the last name.");
      }
      if(!data.department) {
        throw new Error("Please put the department name.");
      }
      await setDoc(userDataDocRef, data);   // set user's data to the database
    } catch (error) {
      throw error;
    }
  }
  
  return (
    <div className="flex items-center justify-center max-[1205px]:mt-12 h-full gap-[15%] mr-6">
      <Image
        className="w-[650px] h-[600px] max-[1205px]:hidden"
        width={0}
        height={0}
        alt="box-logo"
        src="/assets/box-logo.svg"
      />
      {/*--------------------- Form -----------------------------------*/}
      <Card outside="w-[350px] h-[450px] flex flex-col min-[1206px]:-mt-24" inside="bg-gradient-to-br from-[#669999] from-35% to-[#FF6633] rounded-lg shadow-md px-8 pt-6 pb-8">
        <form onSubmit={createUser}>
          <InputField fieldName="first_name" />
          <InputField fieldName="last_name" />
          <InputField fieldName="department" />
          <InputField fieldName="email_address" inputType="email" />
          <InputField fieldName="password" inputType="password" />
          <InputField fieldName="re_enter_password" inputType="password" />
          {/*---------------------------- First Name -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="fname">First Name</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="First Name" id="fname" name="fname" />
          </div> */}

          {/*---------------------------- Last Name -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lname">Last Name</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Last Name" id="lname" name="lname" />
          </div> */}

          {/*---------------------------- Department -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="department">Department</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Department" id="department" name="department" />
          </div> */}

          {/*---------------------------- Email Address -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">Email Address</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Email Address" id="email" name="email" />
          </div> */}

          {/*---------------------------- Password -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="pass">Password</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="Password" id="pass" name="pass" />
          </div> */}

          {/*---------------------------- Re-Enter Password -------------------------------------*/}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="repass">Re-Enter Password</label>
            <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="Re-enter Password" id="repass" name="repass" />
          </div> */}

          {/*---------------------------- Login -------------------------------------*/}
          <div className="flex justify-end mt-12">
            <button type="submit" className="app-button bg-[#202027] hover:bg-[#3c3c46]">
              Sign Up
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SignUpPage;