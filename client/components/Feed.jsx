import Image from "next/image";
import Input from "./Input";

const Feed = ({ setOpenSidebar }) => {
  return (
    <div className="sm:ml-20 xl:ml-80 flex-1 flex-grow border-l border-r border-gray-700 border border-solid  min-h-full w-full">
      <div className="py-4 sticky top-0 z-10 border-b border-gray-700 px-8 flex justify-between w-full h-16 items-center">
        <div className=" sm:opacity-0 sm:invisible hoverAnimation  cursor-pointer">
          <Image
            src="https://icon-library.com/images/white-menu-icon/white-menu-icon-4.jpg"
            width={30}
            height={30}
            onClick={() => setOpenSidebar(true)}
          />
        </div>

        <div className="cursor-pointer hoverAnimation sm:hidden">
          <Image src="https://rb.gy/ogau5a" width={35} height={35} />
        </div>
        <div className="cursor-pointer hoverAnimation p-0 hidden sm:flex px-1 pt-1 items-center justify-center">
          <a href="https://www.facebook.com/violetoniongarden/" target="_blank">
            <Image
              src="https://icon-library.com/images/information-icon-white/information-icon-white-3.jpg"
              width={30}
              height={30}
            />
          </a>
        </div>
      </div>
      <Input />
      <div className="h-[3000px]"></div>
    </div>
  );
};

export default Feed;
