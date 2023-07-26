import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase Imports
import { auth, googleProvider, db } from "../../../firebase";

const Button = () => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/components/login" && (
        <>
          {/* If User is Logged In */}
          {console.log(auth?.currentUser?.uid)}
          {auth?.currentUser?.uid !== undefined ? (
            <button
              type="button"
              className="app-button bg-[#669999] hover:bg-[#78acac]">
              {/* <Image
                width={0}
                height={0}
                alt={ev.title}
                src={ev.image}
                layout="responsive"
              /> */}
              {auth?.currentUser?.displayName}
            </button>
          ) : (
            // If User Is not Logged In
            <Link
              className={`app-button bg-[#669999] hover:bg-[#78acac]`}
              href="/components/login">
              Login
            </Link>
          )}
        </>
      )}
    </>
  );
};
export default Button;
