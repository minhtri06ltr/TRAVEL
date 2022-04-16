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
  LogoutIcon,
} from "@heroicons/react/outline";
import { HashtagIcon as ActiveHashtagIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useDetect } from "../util/useDetectHook";

const UserInfo = () => {
  return (
    <div className="flex mt-16 xl:justify-start justify-center   hoverAnimation py-2 xl:py-2 xl:px-4 p-0 w-full cursor-pointer">
      <div className="xl:mr-2.5 xl:-ml-2 mr-2.5 -ml-2 sm:mr-0 sm:ml-0   flex  justify-center ">
        <img
          src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/275373074_2770143603280900_442644796018170289_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=90TAClBGCiAAX9hRZjy&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVJck1KvvHpN9sdr71Y45IQoLJWKjox2-zx6s7YgKK8nnw&oe=627F079C"
          className="h-14 w-14 rounded-full object-cover"
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
    <button className="shadow-2xl rounded-full py-1 w-full hover:bg-opacity-80 flex justify-center items-center bg-red-500">
      <LogoutIcon color="white" width={35} height={35} />
    </button>
  );
};
const ItemForSmallDevice = ({ Icon, text, active }) => {
  return (
    <div className="cursor-pointer hoverAnimation flex items-center my-8 ">
      <Icon width={30} height={30} color="white" />
      <span
        className={`text-white ml-8  font-medium text-xl ${
          active && "font-bold"
        }`}
      >
        {text}
      </span>
    </div>
  );
};
const ItemForLargeDevice = ({ Icon, text, active }) => {
  return (
    <div className="my-6 hoverAnimation cursor-pointer flex w-full items-center">
      <Icon width={30} height={30} color="white" />
      <span
        className={`xl:block ml-4  hidden text-xl font-medium text-white ${
          active && "font-bold"
        } `}
      >
        {text}
      </span>
    </div>
  );
};

const Sidebar = ({ setOpenSidebar, openSidebar }) => {
  const wrapperRef = useRef(null);
  useDetect(wrapperRef, setOpenSidebar);
  return openSidebar ? (
    <div
      ref={wrapperRef}
      className="flex h-screen fixed flex-col overflow-auto bg-zinc-900 w-[70%] z-20 p-4 slide-right "
    >
      <div className="w-full h-[30px] flex items-start  justify-end mb-2 ">
        <Image
          src="https://icon-library.com/images/menu-icon-white-png/menu-icon-white-png-5.jpg"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => setOpenSidebar(false)}
        />
      </div>
      <div className="w-[90%] ml-[5%]">
        {[
          {
            icon: HashtagIcon,
            text: "Explore",
            active: true,
            activeIcon: ActiveHashtagIcon,
          },
          {
            icon: BellIcon,
            text: "Notifications",
          },
          { icon: InboxIcon, text: "Messages" },
          {
            icon: BookmarkIcon,
            text: "Bookmarks",
          },
          {
            icon: ClipboardListIcon,
            text: "Lists",
          },
          { icon: UserIcon, text: "Profile" },
          {
            icon: DotsCircleHorizontalIcon,
            text: "More",
          },
        ].map((item, index) => (
          <ItemForSmallDevice
            key={index}
            text={item.text}
            Icon={item.active ? item.activeIcon : item.icon}
            active={item.active}
          />
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
            icon: HashtagIcon,
            text: "Explore",
            active: true,
            activeIcon: ActiveHashtagIcon,
          },
          {
            icon: BellIcon,
            text: "Notifications",
          },
          { icon: InboxIcon, text: "Messages" },
          {
            icon: BookmarkIcon,
            text: "Bookmarks",
          },
          {
            icon: ClipboardListIcon,
            text: "Lists",
          },
          { icon: UserIcon, text: "Profile" },
          {
            icon: DotsCircleHorizontalIcon,
            text: "More",
          },
        ].map((item, index) => (
          <ItemForLargeDevice
            key={index}
            active={item.active}
            text={item.text}
            Icon={item.active ? item.activeIcon : item.icon}
          />
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
