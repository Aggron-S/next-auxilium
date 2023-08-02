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
import { useStateService } from "@/shared/StateService";

interface ProjectData {
  id: string;
  title: string;
  introduction: string;
  progress: string;
  image: string;
}

const Discover = (): React.JSX.Element => {
  const [currentData, setData] = useState<ProjectData[]>([]);
  // Get current subscription states
  const { state } = useStateService();

  // Get Document/s and its Data
  const getProjects = async () => {
    // Optimize it in the future, instead of fetching all projects in one query, do the lazy loading as it might boost performance
    const usersQuerySnapshot = await getDocs(collection(db, 'users'));
    const allProjectsData: ProjectData[] = [];
    
    for (const userDoc of usersQuerySnapshot.docs) {
      const projectsQuerySnapshot = await getDocs(collection(userDoc.ref, 'projects'));
      
      console.log(`Projects for user ${userDoc.id}:`);
      const queryData = projectsQuerySnapshot.docs.map((doc): ProjectData => ({
        ...(doc.data() as ProjectData),
      }));
      
      allProjectsData.push(...queryData); // Add the projects data to the array
    }
    setData(allProjectsData);
    // console.log("THE CURRENT DATA PUTANGINA IS: ", currentData);
  }
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
            <Card key={proj.id}>
              <Link href={`/discover/${proj.id}`}>
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
                <h3 className="card-text-h1">{proj.title}</h3>
                <p>{proj.introduction}</p>

                {/*------------------ Raised Amount Details --------------------------*/}
                <ProgressBar progress={proj.progress} />
                <div className="flex items-center justify-between">
                  <p className="font-thin">Raised: ₱500,000</p>
                  {/* Some Amount */}
                  <p className="font-thin">Funded: ₱500,000</p>
                  {/* Some Amount */}
                  <p className="font-thin">Due Date: 01/02/23 </p>
                  {/* Due Date */}
                </div>
              </Link>
            </Card>
        ))) : (
          // Render a loading state or fallback content while fetching the data
          <p className={`${state.text_color}`}>Loading...</p>
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
