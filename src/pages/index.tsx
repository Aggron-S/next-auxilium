import Link from "next/link";
import Image from "next/image";

const Home = (): React.JSX.Element => {
  return (
    <div className="relative">
      <div className="relative" style={{ width: "81%", height: "auto" }}>
        <Image
          className="absolute -top-28 -z-10"
          width={0}
          height={0}
          alt="circle-glow-effect"
          src="/assets/circle-glow-effect.png"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className="grid grid-flow-col absolute inset-y-0 left-0 right-0 mx-auto">
        <section className="relative w-[60%] h-auto place-self-center">
          <Image
            className=""
            width={0}
            height={0}
            alt="box-logo"
            src="/assets/box-logo.png"
            layout="responsive"
            objectFit="contain"
          />
        </section>

        <section className="place-self-center">
          <h2 className="text-6xl tracking-wide">
            CATALYST <br /> OF <br /> CHANGE
          </h2>

          {/*---------------------------- Login -------------------------------------*/}
          <div className="mt-36">
            <Link
              className="app-button bg-[#669999] hover:bg-[#78acac]"
              href="/components/login">
              Login
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
