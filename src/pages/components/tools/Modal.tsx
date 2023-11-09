import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, db } from "../../../firebase";

// User Defined Imports
import ProjectData  from "@/shared/ProjectData";
import { useModalStateService } from "@/shared/ModalStateService";

export type ModalType = "fund" | "update" | "delete" | "";

const Modal = ({ type, data }: {type: ModalType, data: ProjectData}) => {
  const router = useRouter();
  const { setModalState }  = useModalStateService();

  // Fund Project
  const fundProject = async () => {
    
  }
  // Update Project
  const updateProject = async () => {
    
  }

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

  // Put tailwindcss classnames in here (it should be centered and has modal attributes)
  // No fund, update and delete logic as of now, finish and put it below on the jsx logic
  return (
    <>
      {type === "fund" && (
        <>
          <div className="fixed z-[1000] overflow-y-auto top-0 w-full left-0">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>

              <span className="inline-block align-middle h-screen">&#8203;</span>

              <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <label className="font-medium text-gray-800">Name</label>
                  <input type="text" className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" />
                  <label className="font-medium text-gray-800">Url</label>
                  <input type="text" className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" />
                </div>
                <div className="bg-gray-200 px-4 py-3 text-right">
                  <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={() => setModalState("isDisplayModal", false)}><i className="fas fa-times"></i> Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {type === "update" && (
        <div className="flex justify-center items-center h-[50vh] z-999">
        <div className="bg-red-500">
          <h1>Update Project</h1>
        </div>
        <button className="bg-red-600" onClick={() => setModalState("isDisplayModal", false)}>Update</button>
      </div>
      )}
      {type === "delete" && (
        <div className="flex justify-center items-center h-[50vh] z-999">
          <div className="bg-red-500">
            <h1>Delete Project</h1>
          </div>
          <button className="bg-red-600" onClick={deleteProject}>Delete</button>
        </div>
      )}
    </>
  );
};
export default Modal;