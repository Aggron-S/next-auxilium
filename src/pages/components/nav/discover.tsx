import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import axios from "axios";

// Firebase Imports
import { auth, googleProvider, db, storage } from "../../../firebase";

import {
  // Firebase Query (collection & document)
  doc, collection, 
  // Add Data
  setDoc, addDoc,
  // Get Docs Data
  getDoc, getDocs,
  // Get Docs Data (realtime)
  onSnapshot,
  // Update Data
  updateDoc,
  // Delete Data
  deleteDoc,} from "firebase/firestore"

// User Defined Imports
import Card from "../tools/Card";
import ProgressBar from "../tools/ProgressBar";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  progress: string;
  image: string;
}

const Discover = (): React.JSX.Element => {
  const [currentData, setData] = useState<ProjectData[]>([]);

  // Get Document/s and its Data
  const getProjects = async (): Promise<void> => {
    const projColRef = collection(db, 'events_categories');
    const query = await getDocs(projColRef);

    const queryData = query.docs.map((doc): ProjectData => ({
      ...(doc.data() as ProjectData),
    }));
    setData(queryData);
  }
  console.log("THE CURRENT DATA PUTANGINA IS: ", currentData)
  // Handle Data Fetching's Side Effects
  useEffect(() => {
    getProjects();
    return () => {
      // Perform cleanup if necessary (e.g., cancel subscriptions)
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 justify-items-center">
        {currentData.length > 0 ? (
          currentData.map((proj: ProjectData) => (
            <Card>
              <Link key={proj.id} href={`/${proj.id}`}>
                <div className="w-full h-32 mx-auto bg-slate-600 p-1">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <Image
                      width={0}
                      height={0}
                      alt={proj.title}
                      src={proj.image}
                      layout="responsive"
                    />
                  </div>
                </div>
                <h3 className="card-text card-text-h1">{proj.title}</h3>
                <p className="card-text">{proj.description}</p>

                {/*------------------ Raised Amount Details --------------------------*/}
                <ProgressBar progress={proj.progress} />
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
        ))) : (
          // Render a loading state or fallback content while fetching the data
          <p>Loading...</p>
        )}
      </div>

      {/* <button type="button" onClick={getJSON}>
        Click to get data from hello api!
      </button> */}
    </>
  );
};
export default Discover;

// export async function getStaticProps() {
//   // const response = await axios.get(
//   //   "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=10"
//   // );
//   // const data = response.data;
//   const {events_categories} = await import("../../data/data")
//   return {
//     props: {
//       data: events_categories,
//     },
//   };
// }
