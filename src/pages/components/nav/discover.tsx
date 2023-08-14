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
import { Card, ProgressBar, Loader } from "../tools";
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
  const [filteredData, setFilteredData] = useState<ProjectData[]>([]);
  const [hasData, setHasData] = useState(true);
  
  // Get current subscription states
  const { state } = useStateService();

  // Get Document/s and its Data
  const getProjects = async () => {
    // Optimize it in the future, instead of fetching all projects in one query, do the lazy loading as it might boost performance
    try {
      const usersQuerySnapshot = await getDocs(collection(db, 'users'));
      const allProjectsData: ProjectData[] = [];
      
      for (const userDoc of usersQuerySnapshot.docs) {
        const projectsQuerySnapshot = await getDocs(collection(userDoc.ref, 'projects'));
        const queryData = projectsQuerySnapshot.docs.map((doc): ProjectData => ({
          ...(doc.data() as ProjectData),
        }));
        
        allProjectsData.push(...queryData); // Add the projects data to the array
      }

      setData(allProjectsData);
      setFilteredData(allProjectsData);
      setHasData(true);
    } catch (error) {
      console.log(error);
      setHasData(false);
    }
  }
  
  const filterData = () => {
    // Filter the data based on the project name (search)
    const filteredData = currentData.filter((item: ProjectData) =>
      item.title.toLowerCase().includes(state.userQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };
  
  // Handle Data Fetching's Side Effects
  useEffect(() => {
    getProjects();
  }, []);

  // Handle Project Filtering based on user query
  useEffect(() => {
    filterData();
  }, [state.userQuery]);

  return (
    <>
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {filteredData.map((proj: ProjectData) => (
            <div className="mx-4 mb-6" key={proj.id}>
              <Card>
                <Link href={`/discover/${proj.id}`}>
                  <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${proj.image}')`}}></div>

                  {/* Card Content */}
                  <div className="flex flex-col space-y-3">
                    <h3 className="mt-3 card-text-h1">{proj.title}</h3>
                    <p className="slider max-h-20 overflow-y-auto overflow-x-hidden">{proj.introduction}</p>

                    {/*------------------ Raised Amount Details --------------------------*/}
                    <ProgressBar progress={proj.progress} />
                    <div className="flex items-center space-x-3">
                      <p className="ml-2 font-thin">Raised: ₱500,000</p>
                      <p className="font-thin">Funded: ₱500,000</p>
                      <p className="font-thin">Due Date: 01/02/23 </p>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (hasData ? (
        // Show loading display
        <Loader/>
      ) : (
        // No Projects Available
        <div className="flex justify-center h-[55vh]">
          <h3 className={`self-center ${state.text_color}`}>No Projects Found</h3>
        </div>
      ))}
    </>
  );
};
export default Discover;