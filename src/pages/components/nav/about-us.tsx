import Image from "next/image";
import { useStateService } from "@/shared/StateService";

const AboutUs = () => {
  const { state } =  useStateService();

  return (
    <div className="flex justify-center items-center gap-[15%] h-full max-[1200px]:ml-0 ml-8">
      <p className={`text-justify text-xl pt-5 mx-5 ${state.text_color}`}>
        Auxilium is a crowdfunding app that is integrated into a web-based system. It allows project creators to promote their ideas and raise funds for their projects, while also allowing users to discover and support projects that they find interesting. Project creators can use Auxilium to set financing targets, discuss project details, and acquire financial resources from a large audience. Users can explore projects, contribute financially, and track the progress of the projects they support. The integration of crowdfunding functionality in Auxilium empowers individuals and groups to seek support and bring their innovative ideas to life.
      </p>
      <Image width={450} height={400} className="max-[1200px]:hidden" alt="box-logo" src="/assets/box-logo.svg" />
    </div>
  );
};
export default AboutUs;
