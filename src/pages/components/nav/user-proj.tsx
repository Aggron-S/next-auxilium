import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import axios from "axios";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../../firebase";

import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";

// User Defined Imports
import Card from "../tools/Card";
import ProgressBar from "../tools/ProgressBar";

interface UserProjectData {
  id: string;
  title: string;
  introduction: string;
  progress: string;
  image: string;
}

const UserProj = () => {
  // onAuthStateChanged(auth, user => {
  //   if(user) {
      
  //     console.log(`User ${user.uid} logged in`);
  //   }
  // })

  //-----------------Firebase Real-time Query Logic--------------------//
  const [currentData, setData] = useState<UserProjectData[]>([]);
  // Triggered every changes on the database, ex. client or server made
  useEffect(() => {
    const projColRef = collection(db, "users", auth?.currentUser?.uid ?? "", "projects");
    const unsubscribe = onSnapshot(projColRef, snapshot => {
      const updatedData = snapshot.docs.map((doc): UserProjectData => ({
        ...(doc.data() as UserProjectData)
      }));
      setData(updatedData);
    });
    return () => {
      unsubscribe();    // Unsubscribe to Events
      console.log("unsubscribed from Real time communication")
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 justify-items-center">
        {/* If has projects, display it, otherwise show create new project card*/}
        {currentData.length > 0 ? (
          <>
            {currentData.map((userproj: UserProjectData) => (
              <>
                <Card key={userproj.id}>
                  <Link href={`/user-proj/${userproj.id}`}>
                    <div className="w-full h-32 mx-auto bg-slate-600 p-1">
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <Image
                          width={0}
                          height={0}
                          alt={userproj.title}
                          src={userproj.image}
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <h3 className="card-text card-text-h1">{userproj.title}</h3>
                    <p className="card-text">{userproj.introduction}</p>
                    {/*------------------ Raised Amount Details --------------------------*/}
                    <ProgressBar progress={userproj.progress} />
                    <div className="flex items-center justify-between">
                      <p className="card-text font-thin">Raised: ₱500,000</p>
                      {/* Some Amount */}
                      <p className="card-text font-thin">Funded: ₱500,000</p>
                      {/* Some Amount */}
                      <p className="card-text font-thin">Due Date: 01/02/23 </p>
                      {/* Due Date */}
                    </div>
                  </Link>
                </Card>
              </>
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};
export default UserProj;
