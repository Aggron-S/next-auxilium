import Link from "next/link";
import Image from "next/image";
import { useStateService } from "@/shared/StateService";

const Home = (): React.JSX.Element => {
  const { state } = useStateService();

  return (
    <div 
      className="bg-cover bg-no-repeat w-auto h-full"
      style={{ backgroundImage: `url(/assets/circle-glow-effect.png)` }}
    >
      <div className="flex items-center justify-center gap-[15%] ">
        <Image
          className="h-[500px] w-[500px] max-[1000px]:hidden"
          width={0}
          height={0}
          alt="box-logo"
          src="/assets/box-logo.svg"
        />
        <div className="flex flex-col items-start justify-center max-[1000px]:text-center max-[1000px]:items-center gap-[15%] h-[450px] w-[350px] text-6xl tracking-wide">
          <h2 className={`text-6xl font-normal ${state.text_color}`}>
            CATALYST <br /> OF <br /> CHANGE
          </h2>

          {/*---------------------------- Login -------------------------------------*/}
          <Link
            className="text-slate-200 rounded-md px-7 py-2 bg-[#669999] hover:bg-[#78acac] text-lg font-extralight shadow-sm"
            href="/components/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
