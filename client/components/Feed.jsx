import Image from "next/image";

const Feed = ({ setOpenSidebar }) => {
  return (
    <div className="sm:ml-20 xl:ml-80 flex-1 border border-solid border-white min-h-full w-full">
      <div className="py-4 px-8 flex justify-between w-full h-16 items-center">
        <div className=" sm:opacity-0 sm:invisible  cursor-pointer">
          <Image
            src="https://icon-library.com/images/white-menu-icon/white-menu-icon-4.jpg"
            width={30}
            height={30}
            onClick={() => setOpenSidebar(true)}
          />
        </div>

        <div className="cursor-pointer sm:hidden">
          <Image src="https://rb.gy/ogau5a" width={30} height={30} />
        </div>
        <div className="cursor-pointer hidden sm:block">
          <a
            href="https://www.facebook.com/violetoniongarden/"
            className="cursor-pointer"
            target="_blank"
          >
            <Image
              src="https://icon-library.com/images/information-icon-white/information-icon-white-3.jpg"
              width={30}
              height={30}
            />
          </a>
        </div>
      </div>
      <div className="h-[2000px]"></div>
    </div>
  );
};

export default Feed;
