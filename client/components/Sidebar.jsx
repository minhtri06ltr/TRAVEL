import Image from "next/image";
import { useRef } from "react";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import {
  HashtagIcon as ActiveHashtagIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useDetect } from "../hooks/useDetectHook";
import { signOut, useSession } from "next-auth/react";

const UserInfo = ({ info }) => {
  return (
    <div className="flex mt-16 xl:justify-start justify-start pl-4 sm:pl-0    xl:py-2   w-full">
      <div className="xl:mr-2.5   mr-2.5  sm:mr-0  flex  justify-center ">
        <img src={info.image} className="h-14 w-14 rounded-full object-cover" />
      </div>
      <div className="xl:flex  flex-col justify-between  flex sm:hidden ">
        <span className="text-white text-xl font-semibold limit-text-line">
          {info.name}
        </span>
        <span className="text-[#6e767d] text-base font-medium limit-text-line">
          @{info.tag}
        </span>
      </div>
    </div>
  );
};
const LogoutButton = () => {
  return (
    <button className="shadow-2xl rounded-full p-0 sm:p-2 xl:p-0   w-full sm:w-auto xl:w-full hover:bg-opacity-80 flex justify-center items-center bg-red-500">
      <LogoutIcon
        color="white"
        className="xl:hidden hidden  sm:block"
        width={32}
        height={32}
      />
      <span
        onClick={signOut}
        className="text-white py-2 text-xl sm:hidden font-medium  xl:block"
      >
        Log out
      </span>
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
    <div className="my-6 p-4 hoverAnimation cursor-pointer flex w-full items-center">
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
  const { data: session } = useSession();
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
        <UserInfo info={session.user} />
      </div>
    </div>
  ) : (
    <div className="hidden sm:flex  h-screen  fixed flex-col items-center w-20 xl:w-60  p-4">
      <div className="xl:ml-16  ">
        <Link href="/">
          <a className="hoverAnimation w-fit p-4 ">
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

        <div onClick={signOut} className="flex justify-center w-full">
          <LogoutButton />
        </div>

        <UserInfo info={session.user} />
      </div>
    </div>
  );
};

export default Sidebar;
