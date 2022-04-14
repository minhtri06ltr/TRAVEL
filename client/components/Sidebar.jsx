import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="flex mt-16 xl:justify-start justify-center   hoverAnimation py-2 xl:py-2 xl:px-4 p-0 w-full cursor-pointer">
      <div className="xl:mr-2 xl:-ml-2 mr-2 -ml-2 sm:mr-0 sm:ml-0   flex  justify-center ">
        <Image
          src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/275373074_2770143603280900_442644796018170289_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=90TAClBGCiAAX9hRZjy&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVJck1KvvHpN9sdr71Y45IQoLJWKjox2-zx6s7YgKK8nnw&oe=627F079C"
          width={50}
          height={50}
          className="rounded-full"
          objectFit="cover"
        />
      </div>
      <div className="xl:flex  flex-col  flex sm:hidden ">
        <span className="text-white text-xl font-medium limit-text-line">
          Lý Minh Trí
        </span>
        <span className="text-[#6e767d] text-base font-medium limit-text-line">
          @lýminhtrí
        </span>
      </div>
    </div>
  );
};
const LogoutButton = () => {
  return (
    <button className="rounded-full py-4 w-full hover:bg-opacity-80 bg-red-500">
      <span className="text-white text-base font-extrabold">Log out</span>
    </button>
  );
};
const ItemForSmallDevice = ({ icon, text }) => {
  return (
    <div className="cursor-pointer hoverAnimation flex items-center my-8 ">
      {icon}
      <span className="text-white ml-8 font-medium text-xl">{text}</span>
    </div>
  );
};
const ItemForLargeDevice = ({ icon, text }) => {
  return (
    <div className="my-6 hoverAnimation cursor-pointer flex w-full items-center">
      {icon}
      <span className="xl:block ml-4  hidden text-xl font-medium text-white">
        {text}
      </span>
    </div>
  );
};
const detectClickOutSide = (ref, setOpenSidebar) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const Sidebar = ({ setOpenSidebar, openSidebar }) => {
  const wrapperRef = useRef(null);
  detectClickOutSide(wrapperRef, setOpenSidebar);
  return openSidebar ? (
    <div
      ref={wrapperRef}
      className="flex h-screen fixed flex-col overflow-auto bg-zinc-900 w-[70%] z-10 p-4 slide-right "
    >
      <div className="w-full h-[30px] flex items-start justify-end mb-2">
        <Image
          src="https://icon-library.com/images/menu-icon-white-png/menu-icon-white-png-5.jpg"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => setOpenSidebar(false)}
        />
      </div>
      <div className="w-fit">
        {[
          { icon: <HashtagIcon width={30} color="white" />, text: "Explore" },
          {
            icon: <BellIcon width={30} color="white" />,
            text: "Notifications",
          },
          { icon: <InboxIcon width={30} color="white" />, text: "Messages" },
          {
            icon: <BookmarkIcon width={30} color="white" />,
            text: "Bookmarks",
          },
          {
            icon: <ClipboardListIcon width={30} color="white" />,
            text: "Lists",
          },
          { icon: <UserIcon width={30} color="white" />, text: "Profile" },
          {
            icon: <DotsCircleHorizontalIcon width={30} color="white" />,
            text: "More",
          },
        ].map((item, index) => (
          <ItemForSmallDevice key={index} text={item.text} icon={item.icon} />
        ))}

        <LogoutButton />
        <UserInfo />
      </div>
    </div>
  ) : (
    <div className="hidden sm:flex  h-screen fixed flex-col items-center w-20 xl:w-60  p-4">
      <div className="xl:ml-16  ">
        <Link href="/">
          <a className="hoverAnimation w-fit ">
            <Image src="https://rb.gy/ogau5a" width={40} height={40} />
          </a>
        </Link>
        {[
          {
            icon: <HashtagIcon width={30} color="white" />,
            text: "Explore",
          },
          {
            icon: <BellIcon width={30} color="white" />,
            text: "Notifications",
          },
          { icon: <InboxIcon width={30} color="white" />, text: "Messages" },
          {
            icon: <BookmarkIcon width={30} color="white" />,
            text: "Bookmarks",
          },
          {
            icon: <ClipboardListIcon width={30} color="white" />,
            text: "Lists",
          },
          { icon: <UserIcon width={30} color="white" />, text: "Profile" },
          {
            icon: <DotsCircleHorizontalIcon width={30} color="white" />,
            text: "More",
          },
        ].map((item, index) => (
          <ItemForLargeDevice key={index} text={item.text} icon={item.icon} />
        ))}
        <div className="hidden xl:flex">
          <LogoutButton />
        </div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Sidebar;
