import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
// import axios from "axios";

// Firebase Imports
import { db } from "../../firebase";

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
import { Card, ProgressBar, Modal } from "@/shared/Tools";
import ProjectData  from "@/shared/ProjectData";
import { ModalType } from "../components/tools/Modal";
import { useStateService } from "@/shared/StateService";
import { useModalStateService } from "@/shared/ModalStateService";

const Project = ({ data }: { data: ProjectData}) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const [displaySideBar, setDisplaySideBar] = useState(false);
  // Modal States
  const { modalState, setModalState } = useModalStateService();
  const [modalType, setModalType] = useState<ModalType>("");
  // Global State
  const { state } = useStateService();

  // Handles Sidebar Display
  useEffect(() => {
    const sideBar = () => {
      if (window.innerWidth >= 768 && displaySideBar) {
        setDisplaySideBar(false);
      }
    }
    window.addEventListener("resize", sideBar);

    return () => {
      window.removeEventListener("resize", sideBar);
    }
  }, [displaySideBar]);

  // Display Sidebar
  const toggleSidebar = () => {
    setDisplaySideBar(!displaySideBar);
  };

  const displayModal = (type: ModalType) => {
    setModalType(type);
    setModalState("isDisplayModal", true);
  }

  return (
    <>
      {data ? (
        <>
          {/* Fab Button */}
          {state.isSmallScreen && (
            <div className="fixed left-3 top-[550px] z-[999]">
              <button 
                className="text-slate-200 rounded-md px-7 py-2 bg-[#669999] hover:bg-[#78acac] text-lg font-extralight shadow-sm"
                onClick={toggleSidebar}
              >
                display
              </button>
            </div>
          )}

          {/* Modal */}
          {modalState.isDisplayModal && (
            <Modal type={modalType} data={data}/>
          )}

          {/* Sidebar Left */}
          <div className={`sidebar ${displaySideBar ? 'show' : ''}`}>
            <div className="slider sidebar-content space-y-10">
              {/* Proponents Info */}
              <Card inside={`pt-2 px-2 pb-8 shadow-md ${state.bg_color} ${state.text_color}`}>
                <div className="flex flex-col items-center space-y-3">
                  <h3 className="text-2xl font-bold">Project Proponent</h3>
                  {/* 1st Proponent */}
                  <div className="inline-flex items-center space-x-4">
                    <svg version="1.1" id="_x35_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" width="48px" height="48px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path style={{ fill:"#935C44" }} d="M450.321,512H0c0,0,0.262-2.822,0.591-7.546c1.444-16.47,4.724-55.839,6.562-75.13 c2.362-24.803,18.963-43.438,42.65-51.705c11.745-4.134,42.453-15.42,70.209-25.721l0.262-0.066 c9.974-3.674,19.553-7.218,27.69-10.302c1.509-0.525,2.887-1.05,4.265-1.575c1.706-0.591,3.346-1.247,4.856-1.772 c4.003-1.509,7.415-2.756,10.039-3.74c1.378-0.525,2.493-0.984,3.412-1.312h0.066c1.575-0.591,2.428-0.919,2.428-0.919 l45.406,1.312l6.758,0.197l52.164-1.509c0,0,0.853,0.328,2.428,0.919h0.066c0.919,0.328,2.034,0.787,3.412,1.312 c2.034,0.722,4.527,1.64,7.349,2.69c2.625,1.05,5.643,2.1,8.858,3.346c0.984,0.328,1.903,0.722,2.953,1.05 c11.089,4.134,24.737,9.186,38.451,14.239v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> <polygon style={{ fill:"#C8B9B0" }} points="223.619,365.086 223.619,511.081 152.163,511.081 152.163,450.452 90.615,462.329 112.465,355.113 120.011,351.897 120.274,351.832 147.767,340.218 150.129,339.234 152.229,339.955 167.123,345.205 218.435,363.249 220.338,363.905 222.109,364.561 "></polygon> <polygon style={{ fill:"#C8B9B0" }} points="303.024,339.247 340.747,355.126 362.585,462.341 301.038,450.423 301.038,511.098 229.566,511.098 229.566,365.058 "></polygon> <rect x="197.802" y="406.747" style={{ fill:"#D45C66" }} width="52.941" height="104.351"></rect> </g> <path style={{ fill:"#D5842E" }} d="M323.617,319.418c-4.462,2.625-8.858,5.118-13.254,7.48c-2.165,1.181-4.331,2.362-6.496,3.478 c-2.1,1.181-4.265,2.231-6.365,3.346c-2.362,1.181-4.659,2.362-6.89,3.412c-2.493,1.247-4.921,2.428-7.349,3.543 c-22.375,10.499-41.404,17.388-52.427,21.128c-2.231,0.722-4.068,1.312-5.643,1.772v1.509l-0.131-0.066 c-0.328-0.066-1.115-0.328-2.297-0.656c-0.262,0.066-0.459,0.131-0.656,0.197c-1.181,0.328-1.772,0.525-1.772,0.525v-1.509 c-0.59-0.197-1.247-0.394-1.903-0.591c-9.514-3.084-28.346-9.58-51.312-20.078c-3.281-1.444-6.627-3.018-10.039-4.724 c-2.165-1.05-4.396-2.1-6.627-3.215c-9.186-4.593-18.766-9.777-28.477-15.551c-53.608-31.824-75.458-73.49-43.7-186.611 C108.528,25.065,172.963,2.1,218.435,0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856c23.622,0,44.356,5.905,61.744,15.42 c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845c10.63,17.06,20.013,38.254,27.362,64.369 C399.075,245.928,377.225,287.594,323.617,319.418z"></path> <rect x="167.128" y="213.18" style={{ fill:"#F0DEB4" }} width="116.128" height="160.804"></rect> <path style={{ fill:"#F8E8BC" }} d="M264.821,126.137c-2.474,22.158,27.265,53.14,53.293,53.345c0,0,0,15.744,0,48.443 c0,32.692-34.422,80.866-92.925,80.866c-58.503,0-92.92-48.174-92.92-80.866c0-32.699,0-39.965,0-39.965 C207.811,187.96,205.331,126.137,264.821,126.137z"></path> <rect x="198.718" y="367.038" style={{ fill:"#D45C66" }} width="52.941" height="37.062"></rect> <rect x="198.718" y="400.128" style={{ fill:"#B44451" }} width="52.941" height="11.913"></rect> <g> <polygon style={{ fill:"#F1F2F1" }} points="225.193,365.086 223.619,366.595 223.159,367.055 218.435,371.648 215.942,374.01 198.75,390.676 162.99,425.256 147.964,341.53 147.767,340.218 147.111,336.609 150.457,334.969 162.99,328.669 167.123,331.097 170.535,333.131 170.601,333.131 218.435,361.149 225.062,365.021 "></polygon> <polygon style={{ fill:"#F1F2F1" }} points="225.189,365.058 287.402,328.662 303.281,336.595 287.402,425.272 "></polygon> </g> </g> <path style={{opacity:0.1, fill:"#3E3A39"}} d="M450.321,512H218.435V0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856 c23.622,0,44.356,5.905,61.744,15.42c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845 c10.63,17.06,20.013,38.254,27.362,64.369c31.758,113.122,9.908,154.788-43.7,186.611c-4.462,2.625-8.858,5.118-13.254,7.48 c-2.165,1.181-4.331,2.362-6.496,3.478c-2.1,1.181-4.265,2.231-6.365,3.346l5.774,2.887l-0.459,2.69l0.197-0.066l37.729,15.879 l0.131,0.656v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> </g> </g></svg>
                    <p>{data.name}</p>
                  </div>

                  {/* 2nd Proponent */}
                  <div className="inline-flex items-center space-x-4">
                    <svg version="1.1" id="_x35_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" width="48px" height="48px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path style={{ fill:"#935C44" }} d="M450.321,512H0c0,0,0.262-2.822,0.591-7.546c1.444-16.47,4.724-55.839,6.562-75.13 c2.362-24.803,18.963-43.438,42.65-51.705c11.745-4.134,42.453-15.42,70.209-25.721l0.262-0.066 c9.974-3.674,19.553-7.218,27.69-10.302c1.509-0.525,2.887-1.05,4.265-1.575c1.706-0.591,3.346-1.247,4.856-1.772 c4.003-1.509,7.415-2.756,10.039-3.74c1.378-0.525,2.493-0.984,3.412-1.312h0.066c1.575-0.591,2.428-0.919,2.428-0.919 l45.406,1.312l6.758,0.197l52.164-1.509c0,0,0.853,0.328,2.428,0.919h0.066c0.919,0.328,2.034,0.787,3.412,1.312 c2.034,0.722,4.527,1.64,7.349,2.69c2.625,1.05,5.643,2.1,8.858,3.346c0.984,0.328,1.903,0.722,2.953,1.05 c11.089,4.134,24.737,9.186,38.451,14.239v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> <polygon style={{ fill:"#C8B9B0" }} points="223.619,365.086 223.619,511.081 152.163,511.081 152.163,450.452 90.615,462.329 112.465,355.113 120.011,351.897 120.274,351.832 147.767,340.218 150.129,339.234 152.229,339.955 167.123,345.205 218.435,363.249 220.338,363.905 222.109,364.561 "></polygon> <polygon style={{ fill:"#C8B9B0" }} points="303.024,339.247 340.747,355.126 362.585,462.341 301.038,450.423 301.038,511.098 229.566,511.098 229.566,365.058 "></polygon> <rect x="197.802" y="406.747" style={{ fill:"#D45C66" }} width="52.941" height="104.351"></rect> </g> <path style={{ fill:"#D5842E" }} d="M323.617,319.418c-4.462,2.625-8.858,5.118-13.254,7.48c-2.165,1.181-4.331,2.362-6.496,3.478 c-2.1,1.181-4.265,2.231-6.365,3.346c-2.362,1.181-4.659,2.362-6.89,3.412c-2.493,1.247-4.921,2.428-7.349,3.543 c-22.375,10.499-41.404,17.388-52.427,21.128c-2.231,0.722-4.068,1.312-5.643,1.772v1.509l-0.131-0.066 c-0.328-0.066-1.115-0.328-2.297-0.656c-0.262,0.066-0.459,0.131-0.656,0.197c-1.181,0.328-1.772,0.525-1.772,0.525v-1.509 c-0.59-0.197-1.247-0.394-1.903-0.591c-9.514-3.084-28.346-9.58-51.312-20.078c-3.281-1.444-6.627-3.018-10.039-4.724 c-2.165-1.05-4.396-2.1-6.627-3.215c-9.186-4.593-18.766-9.777-28.477-15.551c-53.608-31.824-75.458-73.49-43.7-186.611 C108.528,25.065,172.963,2.1,218.435,0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856c23.622,0,44.356,5.905,61.744,15.42 c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845c10.63,17.06,20.013,38.254,27.362,64.369 C399.075,245.928,377.225,287.594,323.617,319.418z"></path> <rect x="167.128" y="213.18" style={{ fill:"#F0DEB4" }} width="116.128" height="160.804"></rect> <path style={{ fill:"#F8E8BC" }} d="M264.821,126.137c-2.474,22.158,27.265,53.14,53.293,53.345c0,0,0,15.744,0,48.443 c0,32.692-34.422,80.866-92.925,80.866c-58.503,0-92.92-48.174-92.92-80.866c0-32.699,0-39.965,0-39.965 C207.811,187.96,205.331,126.137,264.821,126.137z"></path> <rect x="198.718" y="367.038" style={{ fill:"#D45C66" }} width="52.941" height="37.062"></rect> <rect x="198.718" y="400.128" style={{ fill:"#B44451" }} width="52.941" height="11.913"></rect> <g> <polygon style={{ fill:"#F1F2F1" }} points="225.193,365.086 223.619,366.595 223.159,367.055 218.435,371.648 215.942,374.01 198.75,390.676 162.99,425.256 147.964,341.53 147.767,340.218 147.111,336.609 150.457,334.969 162.99,328.669 167.123,331.097 170.535,333.131 170.601,333.131 218.435,361.149 225.062,365.021 "></polygon> <polygon style={{ fill:"#F1F2F1" }} points="225.189,365.058 287.402,328.662 303.281,336.595 287.402,425.272 "></polygon> </g> </g> <path style={{opacity:0.1, fill:"#3E3A39"}} d="M450.321,512H218.435V0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856 c23.622,0,44.356,5.905,61.744,15.42c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845 c10.63,17.06,20.013,38.254,27.362,64.369c31.758,113.122,9.908,154.788-43.7,186.611c-4.462,2.625-8.858,5.118-13.254,7.48 c-2.165,1.181-4.331,2.362-6.496,3.478c-2.1,1.181-4.265,2.231-6.365,3.346l5.774,2.887l-0.459,2.69l0.197-0.066l37.729,15.879 l0.131,0.656v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> </g> </g></svg>
                    <p>{data.name}</p>
                  </div>

                  {/* 3rd Proponent */}
                  <div className="inline-flex items-center space-x-4">
                    <svg version="1.1" id="_x35_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" width="48px" height="48px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path style={{ fill:"#935C44" }} d="M450.321,512H0c0,0,0.262-2.822,0.591-7.546c1.444-16.47,4.724-55.839,6.562-75.13 c2.362-24.803,18.963-43.438,42.65-51.705c11.745-4.134,42.453-15.42,70.209-25.721l0.262-0.066 c9.974-3.674,19.553-7.218,27.69-10.302c1.509-0.525,2.887-1.05,4.265-1.575c1.706-0.591,3.346-1.247,4.856-1.772 c4.003-1.509,7.415-2.756,10.039-3.74c1.378-0.525,2.493-0.984,3.412-1.312h0.066c1.575-0.591,2.428-0.919,2.428-0.919 l45.406,1.312l6.758,0.197l52.164-1.509c0,0,0.853,0.328,2.428,0.919h0.066c0.919,0.328,2.034,0.787,3.412,1.312 c2.034,0.722,4.527,1.64,7.349,2.69c2.625,1.05,5.643,2.1,8.858,3.346c0.984,0.328,1.903,0.722,2.953,1.05 c11.089,4.134,24.737,9.186,38.451,14.239v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> <polygon style={{ fill:"#C8B9B0" }} points="223.619,365.086 223.619,511.081 152.163,511.081 152.163,450.452 90.615,462.329 112.465,355.113 120.011,351.897 120.274,351.832 147.767,340.218 150.129,339.234 152.229,339.955 167.123,345.205 218.435,363.249 220.338,363.905 222.109,364.561 "></polygon> <polygon style={{ fill:"#C8B9B0" }} points="303.024,339.247 340.747,355.126 362.585,462.341 301.038,450.423 301.038,511.098 229.566,511.098 229.566,365.058 "></polygon> <rect x="197.802" y="406.747" style={{ fill:"#D45C66" }} width="52.941" height="104.351"></rect> </g> <path style={{ fill:"#D5842E" }} d="M323.617,319.418c-4.462,2.625-8.858,5.118-13.254,7.48c-2.165,1.181-4.331,2.362-6.496,3.478 c-2.1,1.181-4.265,2.231-6.365,3.346c-2.362,1.181-4.659,2.362-6.89,3.412c-2.493,1.247-4.921,2.428-7.349,3.543 c-22.375,10.499-41.404,17.388-52.427,21.128c-2.231,0.722-4.068,1.312-5.643,1.772v1.509l-0.131-0.066 c-0.328-0.066-1.115-0.328-2.297-0.656c-0.262,0.066-0.459,0.131-0.656,0.197c-1.181,0.328-1.772,0.525-1.772,0.525v-1.509 c-0.59-0.197-1.247-0.394-1.903-0.591c-9.514-3.084-28.346-9.58-51.312-20.078c-3.281-1.444-6.627-3.018-10.039-4.724 c-2.165-1.05-4.396-2.1-6.627-3.215c-9.186-4.593-18.766-9.777-28.477-15.551c-53.608-31.824-75.458-73.49-43.7-186.611 C108.528,25.065,172.963,2.1,218.435,0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856c23.622,0,44.356,5.905,61.744,15.42 c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845c10.63,17.06,20.013,38.254,27.362,64.369 C399.075,245.928,377.225,287.594,323.617,319.418z"></path> <rect x="167.128" y="213.18" style={{ fill:"#F0DEB4" }} width="116.128" height="160.804"></rect> <path style={{ fill:"#F8E8BC" }} d="M264.821,126.137c-2.474,22.158,27.265,53.14,53.293,53.345c0,0,0,15.744,0,48.443 c0,32.692-34.422,80.866-92.925,80.866c-58.503,0-92.92-48.174-92.92-80.866c0-32.699,0-39.965,0-39.965 C207.811,187.96,205.331,126.137,264.821,126.137z"></path> <rect x="198.718" y="367.038" style={{ fill:"#D45C66" }} width="52.941" height="37.062"></rect> <rect x="198.718" y="400.128" style={{ fill:"#B44451" }} width="52.941" height="11.913"></rect> <g> <polygon style={{ fill:"#F1F2F1" }} points="225.193,365.086 223.619,366.595 223.159,367.055 218.435,371.648 215.942,374.01 198.75,390.676 162.99,425.256 147.964,341.53 147.767,340.218 147.111,336.609 150.457,334.969 162.99,328.669 167.123,331.097 170.535,333.131 170.601,333.131 218.435,361.149 225.062,365.021 "></polygon> <polygon style={{ fill:"#F1F2F1" }} points="225.189,365.058 287.402,328.662 303.281,336.595 287.402,425.272 "></polygon> </g> </g> <path style={{opacity:0.1, fill:"#3E3A39"}} d="M450.321,512H218.435V0.131c0.656,0,1.312-0.066,1.903-0.066V0h4.856 c23.622,0,44.356,5.905,61.744,15.42c18.438,9.974,33.07,24.015,43.503,39.173c3.281,4.265,6.43,8.858,9.514,13.845 c10.63,17.06,20.013,38.254,27.362,64.369c31.758,113.122,9.908,154.788-43.7,186.611c-4.462,2.625-8.858,5.118-13.254,7.48 c-2.165,1.181-4.331,2.362-6.496,3.478c-2.1,1.181-4.265,2.231-6.365,3.346l5.774,2.887l-0.459,2.69l0.197-0.066l37.729,15.879 l0.131,0.656v0.066c3.412,1.247,6.89,2.559,10.302,3.806c2.69,0.984,5.38,1.969,8.005,2.953 c17.782,6.562,33.661,12.336,41.404,15.026c23.687,8.268,40.288,26.902,42.65,51.705C445.597,454.127,450.321,512,450.321,512z"></path> </g> </g></svg>
                    <p>{data.name}</p>
                  </div>
                  
                  {/*------------------ Raised Amount Details --------------------------*/}
                  <p className="self-end mr-2">Funded {data.progress}%</p>
                  <ProgressBar progress={data.progress} />
                  <p className="self-start font-thin ml-2">Raised: ₱500,000</p>
                  <p className="self-start font-thin ml-2">Funded: ₱500,000</p>
                  <p className="self-start font-thin ml-2">Due Date: 01/02/23 </p>
                  <button type="button" className="app-button bg-[#669999] hover:bg-[#78acac] self-end mr-2" onClick={() => displayModal("fund")}>
                    Fund
                  </button>
                  <div className="flex flex-col space-y-3">
                  </div>
                </div>
              </Card>

              {/* Contact Info */}
              <Card inside={`pt-2 px-2 pb-8 shadow-md ${state.bg_color} ${state.text_color}`}>
                <div className="flex flex-col space-y-4">
                  <h3 className="font-bold self-center">Contact Info</h3>

                  <div className="flex justify-evenly items-center">
                    {/* Facebook */}
                    <Link href="https://www.facebook.com">
                      <svg width="48px" height="48px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle> <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse"> <stop stopColor="#18ACFE"></stop> <stop offset="1" stopColor="#0163E0"></stop> </linearGradient> </defs> </g></svg>
                    </Link>

                    {/* Twitter */}
                    <Link href="https://twitter.com">
                      <svg width="48px" height="48px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7887 28C8.55374 28 5.53817 27.0591 3 25.4356C5.15499 25.5751 8.95807 25.2411 11.3236 22.9848C7.76508 22.8215 6.16026 20.0923 5.95094 18.926C6.25329 19.0426 7.6953 19.1826 8.50934 18.856C4.4159 17.8296 3.78793 14.2373 3.92748 13.141C4.695 13.6775 5.99745 13.8641 6.50913 13.8174C2.69479 11.0882 4.06703 6.98276 4.74151 6.09635C7.47882 9.88867 11.5812 12.0186 16.6564 12.137C16.5607 11.7174 16.5102 11.2804 16.5102 10.8316C16.5102 7.61092 19.1134 5 22.3247 5C24.0025 5 25.5144 5.71275 26.5757 6.85284C27.6969 6.59011 29.3843 5.97507 30.2092 5.4432C29.7934 6.93611 28.4989 8.18149 27.7159 8.64308C27.7224 8.65878 27.7095 8.62731 27.7159 8.64308C28.4037 8.53904 30.2648 8.18137 31 7.68256C30.6364 8.52125 29.264 9.91573 28.1377 10.6964C28.3473 19.9381 21.2765 28 11.7887 28Z" fill="#47ACDF"></path> </g></svg>
                    </Link>

                    {/* Discord */}
                    <Link href="https://discord.com">
                      <svg width="48px" height="48px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="512" cy="512" r="512" style={{ fill:"#5865f2" }}></circle> <path d="M689.43 349a422.21 422.21 0 0 0-104.22-32.32 1.58 1.58 0 0 0-1.68.79 294.11 294.11 0 0 0-13 26.66 389.78 389.78 0 0 0-117.05 0 269.75 269.75 0 0 0-13.18-26.66 1.64 1.64 0 0 0-1.68-.79A421 421 0 0 0 334.44 349a1.49 1.49 0 0 0-.69.59c-66.37 99.17-84.55 195.9-75.63 291.41a1.76 1.76 0 0 0 .67 1.2 424.58 424.58 0 0 0 127.85 64.63 1.66 1.66 0 0 0 1.8-.59 303.45 303.45 0 0 0 26.15-42.54 1.62 1.62 0 0 0-.89-2.25 279.6 279.6 0 0 1-39.94-19 1.64 1.64 0 0 1-.16-2.72c2.68-2 5.37-4.1 7.93-6.22a1.58 1.58 0 0 1 1.65-.22c83.79 38.26 174.51 38.26 257.31 0a1.58 1.58 0 0 1 1.68.2c2.56 2.11 5.25 4.23 8 6.24a1.64 1.64 0 0 1-.14 2.72 262.37 262.37 0 0 1-40 19 1.63 1.63 0 0 0-.87 2.28 340.72 340.72 0 0 0 26.13 42.52 1.62 1.62 0 0 0 1.8.61 423.17 423.17 0 0 0 128-64.63 1.64 1.64 0 0 0 .67-1.18c10.68-110.44-17.88-206.38-75.7-291.42a1.3 1.3 0 0 0-.63-.63zM427.09 582.85c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.02 28.44-20.37 51.6-46 51.6zm170.13 0c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.01 28.44-20.17 51.6-46 51.6z" style={{ fill:"#fff" }}></path> </g></svg>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Update Project */}
              <div className="flex justify-center items-center">
                <button type="button" className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={() => displayModal("update")}>
                  Update Project
                </button>
              </div>

              {/* Auxiliator */}
              <Card inside={`pt-2 px-2 pb-8 shadow-md ${state.bg_color} ${state.text_color}`}>
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="font-bold">Auxiliator</h3>
                  <p>${data.background}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Content */}
          <div className={`content ${currentUrl.startsWith("/user-proj") && `min-[1001px]:mr-[250px]`}`}>
            <div className={`grid grid-cols-1 space-y-9 ${state.text_color}`}>
              <div className="justify-self-end mr-4">
                <h3 className="font-bold">{data.title}</h3>
                <div className="inline-flex float-right space-x-2">
                  <h4>{data.department}</h4>
                  <Image
                    className="w-8 h-8 rounded-full"
                    width={0}
                    height={0}
                    alt="department-logo"
                    src={`${data.image}`}
                  />
                </div>
              </div>
              <div className="max-[767px]:mx-3"> {data.introduction}</div>

              {/* project updates */}
              <div className="slider project-updates">
                {/* Need map method inside */}
                <div className="project-update-card">
                  <Card>
                    <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${data.image}')`}}></div>
                    <div className="slider px-4 mt-7 space-y-5 project-update-card-content">
                      <h3 className="card-title">Initial Setup</h3>
                      <h4>June 05,2023</h4>
                      <p className="card-subtitle">Created Initial Setup</p>
                    </div>
                  </Card>
                </div>
                <div className="project-update-card">
                  <Card>
                    <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${data.image}')`}}></div>
                    <div className="slider px-4 mt-7 space-y-5 project-update-card-content">
                      <h3 className="card-title">Documentation</h3>
                      <h4>June 07,2023</h4>
                      <p className="card-subtitle">Created Documentation</p>
                    </div>
                  </Card>
                </div>
                <div className="project-update-card">
                  <Card>
                    <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${data.image}')`}}></div>
                    <div className="slider px-4 mt-7 space-y-5 project-update-card-content">
                      <h3 className="card-title">Documentation</h3>
                      <h4>June 07,2023</h4>
                      <p className="card-subtitle">Created Documentation</p>
                    </div>
                  </Card>
                </div>
                <div className="project-update-card">
                  <Card>
                    <div className="bg-cover min-h-[150px] rounded-sm" style={{backgroundImage: `url('${data.image}')`}}></div>
                    <div className="slider px-4 mt-7 space-y-5 project-update-card-content">
                      <h3 className="card-title">Documentation</h3>
                      <h4>June 07,2023</h4>
                      <p className="card-subtitle">Created Documentation</p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* background */}
              <Card outside="w-full">
                <h3 className="card-text-h2 mb-4">Background</h3>
                <h4 className="slider max-h-52 overflow-y-auto">{data.background}</h4>
              </Card>

              {/* methodology */}
              <Card outside="w-full">
                <h3 className="card-text-h2 mb-4">Methodology</h3>
                <h4 className="slider max-h-52 overflow-y-auto">{data.methodology}</h4>
              </Card>

              {/* other info */}
              <Card outside="w-full mb-4">
                <h3 className="card-text-h2 mb-4">Other Info</h3>
                <h4 className="slider max-h-52 overflow-y-auto">other info</h4>
              </Card>

            </div>
          </div>
            
          {/* Sidebar Right */}
          {currentUrl.startsWith("/user-proj") && (
            <div className="sidebar-right">
              <div className="slider sidebar-right-content space-y-10">
                {/* Post Project Update */}
                <Card inside={`pt-2 px-2 pb-8 shadow-md ${state.bg_color} ${state.text_color}`}>
                  <div className="flex flex-col items-center space-y-3">
                    <input className="shadow-md opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none" type="text" placeholder="Post Project Update" />
                    <button type="button" className="app-button bg-[#669999] hover:bg-[#78acac]" /* soon to have project update func onClick={updateProject}*/>
                      Post
                    </button>

                    {/* Delete Project */}
                    <button type="button" className="app-button bg-[#669999] hover:bg-[#78acac]" onClick={() => displayModal("delete")}>
                      Delete
                    </button>
                  </div>
                </Card>

                {/* Auxiliator */}
                <Card inside={`pt-2 px-2 pb-8 shadow-md ${state.bg_color} ${state.text_color}`}>
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="font-bold">Auxiliator</h3>
                    <p>${data.background}</p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </>
      ) : (
        // Project not Found
        <div className="flex justify-center h-[55vh]">
          <h3 className={`self-center ${state.text_color}`}>Project not Found</h3>
        </div>
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
