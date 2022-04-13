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

const ItemForSmallDevice = ({ icon, text }) => {
  return (
    <div className="cursor-pointer flex items-center my-8 ">
      {icon}
      <span className="text-white ml-8 font-medium text-xl">{text}</span>
    </div>
  );
};
const ItemForLargeDevice = ({ icon, text }) => {
  return (
    <div className="my-10 cursor-pointer flex w-full items-center">
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
      className="flex h-screen fixed flex-col bg-zinc-900 w-[70%] z-10 p-4 slide-right "
    >
      <div className="w-full h-[30px] flex items-start justify-end mb-6">
        <Image
          src="https://icon-library.com/images/menu-icon-white-png/menu-icon-white-png-5.jpg"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => setOpenSidebar(false)}
        />
      </div>
      <div>
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
      </div>
    </div>
  ) : (
    <div className="hidden sm:flex  h-screen fixed flex-col items-center w-20 xl:w-60  p-4">
      <div className="mt-6 ml-20">
        <Link href="/">
          <a>
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
      </div>
    </div>
  );
};

export default Sidebar;
