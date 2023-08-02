import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
// import axios from "axios";

// Firebase Imports
import { auth, db, storage } from "../../firebase";

import {
  // Firebase Query (collection & document)
  doc, collection, 
  // Add Data
  setDoc, addDoc,
  // Get Docs Data
  getDoc, getDocs,
  // Update Data
  updateDoc,
  // Delete Data
  deleteDoc,
  query,
  where,
} from "firebase/firestore"

// User Defined Imports
import Card from "../components/tools/Card";

interface ProjectData {
  id: string;
  title: string;
  introduction: string;
  progress: string;
  image: string;
}

const Project = ({ data }: { data: ProjectData}) => {
  const router = useRouter();
  const currentUrl = router.asPath;

  // Delete Project
  const deleteProject = async () => {
    const userProjDocRef = doc(db, "users", auth.currentUser?.uid ?? "", "projects", data.id);
    try {
      await deleteDoc(userProjDocRef);
      console.log("Project Deleted...");
      await router.push("/components/nav/user-proj");
    } catch (error) {
      console.log(error);
    }
  }
  // Fund Project
  const fundProject = async () => {
    // updateDoc()
  }
  // Update Project
  const updateProject = async () => {
    // updateDoc()

  }

  // The UI Rendering logic must infer from the current url request. if url startsWith user-proj, it must display delete button and user-proj related things, otherwise display discover related things
  return (
    <>
      {data ? (
        currentUrl.startsWith("/discover") ? (
          <>
            {/* Sidebar Left */}
            <div className="sidebar">
              <div className="sidebar-content">
                <Card>
                  {/* Proponents Info */}
                  <h1>Proponents Info</h1>
                </Card>

                <Card>
                  {/* Contact Info */}
                  <h1>Contact Info</h1>
                </Card>

                <Card>
                  {/* Auxiliator */}
                  <h1>Auxiliator</h1>
                </Card>
              </div>
            </div>
            {/* Content */}
            <div className="content">
              <div className="grid grid-cols-1 text-black">
                <div className="justify-self-end mr-4">
                    <h2>Robotics Project</h2>
                    <h3>CICS Department</h3>
                  <div> Description</div>
                </div>

                {/* project updates */}
                <div className="project-updates slider">
                  {/* Need map method inside */}
                  <div className="project-update-card">
                    <Card>
                      <h2 className="project-update-card-content">Hello</h2>
                    </Card>
                  </div>
                  <div className="project-update-card">
                    <Card>
                      <h2 className="project-update-card-content">Hello</h2>
                    </Card>
                  </div>
                  <div className="project-update-card">
                    <Card>
                      <h2 className="project-update-card-content">Hello</h2>
                    </Card>
                  </div>
                  <div className="project-update-card">
                    <Card>
                      <h2 className="project-update-card-content">Hello</h2>
                    </Card>
                  </div>
                </div>

                {/* background / methodology / other info */}
                <div className="mt-10">
                  <Card>
                    <h3 className="card-text-h2">Background</h3>
                    <h4>hello putanggina mo</h4>
                  </Card>

                </div>
                <div className="mt-10">
                  <Card>
                    <h3>Methodology</h3>
                  </Card>
                </div>
                <div className="mt-10">
                  <Card>
                    <h3>Other Info</h3>
                  </Card>
                </div>
              </div>
            </div>


            {/* <h6>WE ARE AT DISCOVER PUTANGINA MO</h6>
            <h6 className="text-white">Specific Project Id is: {data.id}</h6>
            <h6 className="text-white">Specific Project Name is: {data.title}</h6>
            <h6 className="text-white">Specific Project Description is: {data.introduction}</h6>
            <Image
              width={0}
              height={0}
              alt= "hello-image"
              src={data.image}
              layout="responsive"
            /> */}
          </>
        ) : (currentUrl.startsWith("/user-proj") && (
          <>
            {/* Sidebar Right */}
            <h1>WE ARE AT USER-PROJ PUTANGINA MO</h1>
            <button onClick={deleteProject}>Delete</button>
            <h1 className="text-white">Specific Project Id is: {data.id}</h1>
            <h1 className="text-white">Specific Project Name is: {data.title}</h1>
            <h1 className="text-white">Specific Project Description is: {data.introduction}</h1>
            <Image
              width={0}
              height={0}
              alt= "hello-image"
              src={data.image}
              layout="responsive"
            />
          </>
        ))
        
      ) : (
        <p>Project not found</p>
      )}    
    </>
  );
};

export default Project;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get Document/s and its Data
  const usersQuerySnapshot = await getDocs(collection(db, 'users'));
  const projectData: ProjectData[] = [];
  
  for (const userDoc of usersQuerySnapshot.docs) {
    // Optimize it in the future, instead of fetching all projects in one query use firebase filtering api to get specific project based on its id
    // const projectsQuerySnapshot = await getDocs(
    //   query(collection(userDoc.ref, "projects"), where("id", "==", YOUR_PROJECT_ID))
    // );
    const projectsQuerySnapshot = await getDocs(collection(userDoc.ref, 'projects'));

    const queryData = projectsQuerySnapshot.docs.map((doc): ProjectData => ({
      ...(doc.data() as ProjectData),
    }));
    
    projectData.push(...queryData); // Add the projects data to the array
  }

  // const allPaths = projectData.map(proj => {
  //   return {
  //     params: {
  //       proj: "discover",     // make this work, it should accept either 'discover' or 'user-proj' but don't use || it'll only evaluate first
  //       projId: proj.id
  //     },
  //   };
  // });
  const discoverPaths = projectData.map((proj) => ({
    params: {
      proj: "discover",
      projId: proj.id,
    },
  }));

  const userProjPaths = projectData.map((proj) => ({
    params: {
      proj: "user-proj",
      projId: proj.id,
    },
  }));

  const allPaths = [...discoverPaths, ...userProjPaths];
  console.log("ALL PATHS PROJ", allPaths)
  return {
    paths: allPaths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.projId;

  // Get Document/s and its Data
  const usersQuerySnapshot = await getDocs(collection(db, 'users'));
  const projectData: ProjectData[] = [];
  
  for (const userDoc of usersQuerySnapshot.docs) {
    // Optimize it in the future, instead of fetching all projects in one query use firebase filtering api to get specific project based on its id
    const projectsQuerySnapshot = await getDocs(collection(userDoc.ref, 'projects'));

    const queryData = projectsQuerySnapshot.docs.map((doc): ProjectData => ({
      ...(doc.data() as ProjectData),
    }));
    
    projectData.push(...queryData); // Add the projects data to the array
  }
  
  const data = projectData.find(proj => proj.id === id);
  // const data = projectData.filter(proj => proj.id === id);   //use this if you got any problems with find() but take note, it returns an array so you might catch problems with ui if you're fetching single data
  return {
    props: {
      data
    },
  };
}
