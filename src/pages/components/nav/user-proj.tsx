import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import axios from "axios";

// Firebase Imports
import { auth, db } from "../../../firebase";

import { collection, doc, onSnapshot } from "firebase/firestore";

// User Defined Imports
import { Card, ProgressBar, Loader } from "@/shared/Tools";
import ProjectData  from "@/shared/ProjectData";

const UserProj = () => {
  //-----------------Firebase Real-time Query Logic--------------------//
  const [currentData, setData] = useState<ProjectData[]>([]);
  const [hasData, setHasData] = useState(true);

  // Triggered every changes on the database, ex. client or server made
  useEffect(() => {
    const projColRef = collection(db, "users", auth?.currentUser?.uid ?? "", "projects");
    try {
      const unsubscribe = onSnapshot(projColRef, snapshot => {
        const updatedData = snapshot.docs.map((doc): ProjectData => ({
          ...(doc.data() as ProjectData)
        }));
        setData(updatedData);
        // If it has no data returned (since we dont have firebase function to add some status code to database to be fetched by onSnapShot we can't really test its effectivenenss in here)
        currentData.length === 0 && setHasData(true);
      });
      return () => {
        // Perform cleanups here e.g unsubscribe from current subscriptions, removing event listeners etc.
        unsubscribe();    // Unsubscribe to Events
        console.log("unsubscribed from Real time communication");
      } 
    } catch(error) {
      console.log(error);
      setHasData(false);
    }
  }, []);

  return (
    <>
      {/* If has projects, display it, otherwise show create new project card*/}
      {currentData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {currentData.map((userproj: ProjectData) => (
            <div className="mx-4 mb-6" key={userproj.id}>
              <Card>
                <Link href={`/user-proj/${userproj.id}`}>
                  <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${userproj.image}')`}}></div>

                  {/* Card Content */}
                  <div className="flex flex-col space-y-3">
                    <h3 className="mt-3 card-text-h1">{userproj.title}</h3>
                    <p className="slider max-h-20 overflow-y-auto overflow-x-hidden">{userproj.introduction}</p>

                    {/*------------------ Raised Amount Details --------------------------*/}
                    <ProgressBar progress={userproj.progress} />
                    <div className="flex items-center space-x-3">
                      <p className="ml-2 font-thin">Raised: ₱500,000</p>
                      {/* Some Amount */}
                      <p className="font-thin">Funded: ₱500,000</p>
                      {/* Some Amount */}
                      <p className="font-thin">Due Date: 01/02/23 </p>
                      {/* Due Date */}
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (hasData ? (
        // Show Loading Display
        <Loader/>
      ) : (
        // Create New Project
        <Card>
          <div className="flex flex-col">
            <div className="w-45 h-auto self-center">
              <Image
                width={0}
                height={0}
                src="/assets/create-proj-sign.png"
                alt="create-proj-sign"
                layout="responsive"
              />
            </div>
            <div className="mt-12 self-center">
              <Link
                className="app-button text-xl bg-gradient-to-r from-[#669799] from-30% to-[#FF6633]"
                href="/components/nav/create-proj">
                Create New Project
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};
export default UserProj;
