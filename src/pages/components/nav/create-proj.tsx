import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, db } from "../../../firebase";

import { collection, doc, setDoc } from "firebase/firestore";

// User Defined Imports
import { Card } from "@/shared/Tools";
import ProjectData  from "@/shared/ProjectData";

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
    const form = e.target as HTMLFormElement;

    // Generate document ID
    const projId = doc(collection(db, "dummy")).id;
    console.log("THE ID IS :", projId);
    const userDataParentDocRef = doc(db, "users", auth?.currentUser?.uid ?? "", "projects", projId);
    const userDataProjectUpdatesColRef = collection(db, "users", auth?.currentUser?.uid ?? "", "projects", projId, "project_updates");

    const projectDataTemplate: ProjectData = {
      id: projId,
      image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      progress: (Math.floor(Math.random() * 100) + 1).toString(),
      
      // Proponents Info
      name: form.proponent_name.value as string,
      address: form.address.value as string,
      contact_no: form.contact_no.value as string,
      // Project Info
      title: form.project_title.value as string,
      funds_needed: form.funds_needed.value as string,
      duration: form.duration.value as string,
      department: form.department.value as string,
      adviser: form.adviser.value as string,
      
      // Project Detail
      introduction : form.introduction.value as string,
      background : form.background.value as string,
      methodology : form.methodology.value as string
    };

    const data = [
      {
        ...projectDataTemplate
      },
      // Project Updates
      [
        {
          project_update_title: "Initial Setup",
          project_update_image: "https://images.unsplash.com/photo-1597007519573-0575fd4cc96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "Jun 05, 2023",
          update_description: "Created Initial Setup"
        },
        {
          project_update_title: "Documentation",
          project_update_image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "Jun 07, 2023",
          update_description: "Created Documentation"
        },
        {
          project_update_title: "Documentation",
          project_update_image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "Jun 07, 2023",
          update_description: "Created Documentation"
        },
        {
          project_update_title: "Documentation",
          project_update_image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          date: "Jun 07, 2023",
          update_description: "Created Documentation"
        }
      ]
    ];

    try {
      await setDoc(userDataParentDocRef, data[0]);
      // const projectUpdates= data[1] as Array<{}>;
      // // Project Updates (just static updates for now, change it to real updates in the future)
      // projectUpdates.map(async (projectUpdate) => {
      //   console.log("DATA 1 = ", projectUpdate) 
      //   await addDoc(userDataProjectUpdatesColRef, projectUpdate)
      // });

      console.log("New Project Created...");
      // Go to User's Project Page
      // await router.push("/components/nav/user-proj");
      // form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={createUserProj}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Proponents Info */}
          <div className="justify-self-center mb-4">
            <Card inside="bg-gradient-to-r from-[#669799] to-[#FF6633] rounded-md pt-4 pb-8 px-4 shadow-lg">
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
            </Card>

            {/* Add another Proponent */}
            <div className="flex flex-col">
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
                <p className="text-sm">Add another Proponent</p>
              </button>
            </div>
          </div>
          
          {/* Project Info */}
          <Card outside="w-full max-w-xs justify-self-center mb-6" inside="bg-gradient-to-r from-[#669799] to-[#FF6633] rounded-md pt-4 pb-8 px-4 shadow-lg">
            <div className="flex flex-col">
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

              <div className="flex flex-col items-center">
                <p className="text-xs self-center">Accepted Mode of Payment</p>
                <div className="bg-slate-300 rounded-xl px-4 py-4 w-full">
                  <div className="flex space-x-2">
                    <input type="checkbox"/>
                    <p>GCash</p>
                  </div>
                  <div className="flex space-x-2">
                    <input type="checkbox"/>
                    <p>PayMaya</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Project Detail */}
          <div className="justify-self-center mb-6">
            <Card inside="bg-gradient-to-r from-[#669799] to-[#FF6633] rounded-md pt-4 pb-8 px-4 shadow-lg">
              <div className="flex flex-col">
                <h3 className="self-center">Project Detail</h3>
                {/*---------------------------- Introduction -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Introduction:</label>
                  <textarea className="resize-none shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" placeholder="Introduction" name="introduction"></textarea>
                </div>
                {/*---------------------------- Background -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Background:</label>
                  <textarea className="resize-none shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" placeholder="Background" name="background"></textarea>
                </div>
                {/*---------------------------- Methodology -------------------------------------*/}
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="">Methodology:</label>
                  <textarea className="resize-none shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" placeholder="Methodology" name="methodology"></textarea>
                </div>
              </div>
            </Card>

            <button type="submit" className="app-button bg-[#669999] hover:bg-[#78acac] float-right mt-4">Submit</button>
          </div>
        </div>
      </form>

    </>
  )
}
export default CreateProj;

