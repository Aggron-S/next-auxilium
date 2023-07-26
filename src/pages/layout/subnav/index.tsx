import { useRouter } from "next/router";

const SubNav = () => {
  const router = useRouter();
  const appStaticPath = ["/", "/components/login", "/components/signup"];

  const handleClick = async e => {
    // Some Button Click Logic
    e.preventDefault;
    console.log("Search Button Clicked");
    // It needs to connect to certain api to search for projects. once the project has located and user tries to enter, it needs to show only the results for that, in grid form pa rin like filter out langz
    // return await router.push('')
  };

  return (
    <>
      {!appStaticPath.includes(router.pathname) && (
        <nav className="flex items-center justify-between p-3 mt-3 mb-5 bg-gradient-to-r from-[#FF6633] to-[#669799]">
          {/* Subnav text depends on your current page location */}
          <h2>Discover Projects</h2>{" "}
          <section>
            <input
              className="rounded bg-slate-300 text-slate-900 border-2 border-slate-800 border-opacity-80 mr-8"
              type="text"
              id="first"
              name="first"
            />
            {/*---------------------------- Search -------------------------------------*/}
            <button
              className="app-button bg-[#202027] hover:bg-[#3c3c46]"
              onClick={handleClick}>
              Search
            </button>
          </section>
        </nav>
      )}
    </>
  );
};
export default SubNav;
