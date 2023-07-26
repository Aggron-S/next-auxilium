import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../../firebase";

import { addDoc, collection, doc } from "firebase/firestore";

import Card from "../tools/Card";

const CreateProj = (): React.JSX.Element => {
  const router = useRouter();
  // const [colName, setColName] = useState('');
  // const [proponentsList, addProponents] = useState([]);
  // const addProponent = (e) => {
  //   e.preventDefault;
  // }

  // Add User Data to Firestore
  const createUserProj = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDataParentColRef = collection(db, "users", auth?.currentUser?.uid ?? "", "projects");
    // Generate document ID
    const projId = doc(collection(db, "dummy")).id;
    console.log("THE ID IS :", projId);
    
    const form = e.target as HTMLFormElement;
    const data = [
      {
        // Proponents Info
        name: form.proponent_name.value as string,
        address: form.address.value as string,
        contact_no: form.contact_no.value as string
      },

      {
        // Project Info
        title: form.project_title.value as string,
        funds_needed: form.funds_needed.value as string,
        duration: form.duration.value as string,
        department: form.department.value as string,
        adviser: form.adviser.value as string,
        adviser_no: form.adviser_no.value as string
      },

      {
        // Project Detail
        introduction : form.introduction.value as string,
        background : form.background.value as string,
        methodology : form.methodology.value as string
      }
    ];

    try {
      await Promise.all(data.map(async (info, index) => {
        // Add project data to the database's collection
        if (index === 0) {
          await addDoc(collection(userDataParentColRef, projId, "proponents info"), info);
        } else if (index === 1) {
          await addDoc(collection(userDataParentColRef, projId, "project info"), info);
        } else if (index === 2) {
          await addDoc(collection(userDataParentColRef, projId, "project detail"), info);
        }
      }));
      console.log("New Project Created...");
      // Go to User's Project Page
      // router.push("/components/nav/user-proj");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 justify-items-center">
        <div className="flex flex-col">
          <Card inside="bg-gradient-to-r from-[#669799] to-[#FF6633] rounded-md pt-4 pb-8 px-4 shadow-lg">
           <form onSubmit={createUserProj}>
              <div className="flex flex-col">
                <h3 className="self-center">Proponents Info</h3>
                {/*---------------------------- Name -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Name:</label>
                  <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Name" name="proponent_name" />
                </div>
                {/*---------------------------- Address -------------------------------------*/}
                <div className="mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Address:</label>
                  <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Address" name="address" />
                </div>
                {/*---------------------------- Contact No. -------------------------------------*/}
                <div className="mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Contact No:</label>
                  <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Contact No." name="contact_no" />
                </div>
              </div>


              {/* Project Info */}
              <h3 className="self-center">Project Info</h3>
              {/*---------------------------- Title -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Title:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Title" name="project_title" />
              </div>

              <div className="flex items-center">
                {/*---------------------------- Funds Needed -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Funds Needed:</label>
                  <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Amount" name="funds_needed" />
                </div>
                {/*---------------------------- Duration -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Duration:</label>
                  <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Project Duration" name="duration" />
                </div>
              </div>

              {/*---------------------------- Department -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Department:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Department Name" name="department" />
              </div>
              {/*---------------------------- Adviser -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Adviser:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Adviser Name" name="adviser" />
              </div>
              {/*---------------------------- Adviser Contact No -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Adviser Contact No:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Adviser Contact No" name="adviser_no" />
              </div>

              <div className="flex flex-col items-center">
                <p className="text-xs self-center">Accepted Mode of Payment</p>
                <div className="bg-slate-300 rounded-xl px-4 py-4 w-full">
                  <input className="block" type="checkbox" />
                  <input type="checkbox" />
                </div>
              </div>


              {/* Project Detail */}
              <h3 className="self-center">Project Detail</h3>
              {/*---------------------------- Introduction -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Introduction:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Introduction" name="introduction"/>
              </div>
              {/*---------------------------- Background -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Background:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Background" name="background"/>
              </div>
              {/*---------------------------- Methodology -------------------------------------*/}
              <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Methodology:</label>
                <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Methodology" name="methodology"/>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs mx-auto">Add Header Image</p>
                  <div className="bg-slate-300 rounded-xl px-4 py-4 w-full">
                    <section className="w-[50%] h-auto mx-auto" >
                      <Image
                        className=""
                        width={0}
                        height={0}
                        alt="box-logo"
                        src="/assets/add-sign-small.png"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </section>
                  </div>
                </div>

                <div>
                  <p className="text-xs mx-auto">Scope of Crowd Funding</p>
                  <div className="bg-slate-300 rounded-xl px-4 py-4 w-full">
                    <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                    <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                    <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                  </div>
                </div>

                <div>
                  <p className="text-xs mx-auto">Add Social Media Links</p>
                  <div className="bg-slate-300 rounded-xl px-4 py-4 w-full">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        {/* Discord */}
                        <section className="w-[17%] h-auto mx-auto" >
                          <Image
                            className=""
                            width={0}
                            height={0}
                            alt="box-logo"
                            src="/assets/discord-icon.png"
                            layout="responsive"
                            objectFit="contain"
                          />
                        </section>
                        <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                      </div>

                      <div className="flex items-center">
                        {/* Facebook */}
                        <section className="w-[17%] h-auto mx-auto" >
                          <Image
                            className=""
                            width={0}
                            height={0}
                            alt="box-logo"
                            src="/assets/facebook-icon.png"
                            layout="responsive"
                            objectFit="contain"
                          />
                        </section>
                        <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                      </div>

                      <div className="flex items-center">
                        {/* Twitter */}
                        <section className="w-[17%] h-auto mx-auto" >
                          <Image
                            className=""
                            width={0}
                            height={0}
                            alt="box-logo"
                            src="/assets/twitter-icon.png"
                            layout="responsive"
                            objectFit="contain"
                          />
                        </section>
                        <input className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="password" placeholder="" />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button must create new id per user, output in firebase and fetch it before displaying contents. the logic must be placed inside the [proj] directory */}
              <button type="submit" className="app-button bg-[#669999] hover:bg-[#78acac]">putangina</button>
           </form>
          </Card>

          <button type="button" className="app-button bg-gradient-to-r from-[#669799] to-[#FF6633] rounded-2xl my-5" >
            {/* make a function wherein it puts proponent's name into array so that user can add another proponent when this button is clicked*/}
            <section className="w-[17%] h-auto mx-auto" >
              <Image
                className=""
                width={0}
                height={0}
                alt="box-logo"
                src="/assets/add-sign-small.png"
                layout="responsive"
                objectFit="contain"
              />
            </section>
            <p className="text-sm">Add Another Component</p>
          </button>
        </div>



        {/* Use textarea, if possible, also its grid size must be larger than two former */}
      </div>
    </>
  )
}
export default CreateProj;

