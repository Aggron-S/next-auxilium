import { useEffect } from "react";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// Firebase Imports
import { auth, db } from "../../../firebase";

// User Defined Imports
import ProjectData  from "@/shared/ProjectData";
import { useStateService } from "@/shared/StateService";
import { useModalStateService } from "@/shared/ModalStateService";
import Checkout from "../Checkout";

export type ModalType = "update" | "delete" | "submit" | "payment" | "";

const Modal = ({ type, data }: {type: ModalType, data: ProjectData}) => {
  const router = useRouter();
  const { state } = useStateService();
  const { setModalState }  = useModalStateService();

  // // Stripe Payment Pubishable key validation
  // if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  //   throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  // }
  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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

  // Stripe Payment

  // Put tailwindcss classnames in here (it should be centered and has modal attributes)
  // No fund, update and delete logic as of now, finish and put it below on the jsx logic
  
  return (
    <>
      {/* Screen Overlay */}
      <div className="fixed inset-0 bg-[#080F25] opacity-70 z-[100]"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-[102]">
        <div
          tabIndex={-1}
          className={`${state.card_color} w-11/12 max-w-md p-6 rounded-lg mx-4 outline-none`}
        >
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
          {type === "payment" && (
            <Checkout amount={500} />
            // <Elements
            //   stripe={stripePromise}
            //   options={{
            //     mode: "payment",
            //     amount: 500,
            //     currency: "usd",
            //   }}
            // >
            //   <Checkout amount={500} />
            // </Elements>
          )}
        </div>
      </div>
    </>
  );
};
export default Modal;