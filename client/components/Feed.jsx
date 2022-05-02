import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Input from "./Input";
import Post from "./Post";

const Feed = ({ setOpenSidebar }) => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),

        (snapshot) => setPosts(snapshot.docs),
        (error) => console.log(error)
      ),

    []
  );
  console.log(posts);
  return (
    <div className="sm:ml-20 xl:ml-80 flex-1 flex-grow border-l border-r border-gray-700 border border-solid  min-h-full w-full">
      <div className=" sticky top-0 z-10 bg-black border-b px-3 border-gray-700 flex justify-between w-full h-16 items-center">
        <div className=" sm:opacity-0 sm:invisible hoverAnimation p-4   cursor-pointer">
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
        <a
          href="https://www.facebook.com/violetoniongarden/"
          className="cursor-pointer hoverAnimation hidden ml-1 sm:flex p-2 items-center justify-center"
          target="_blank"
        >
          <Image
            src="https://icon-library.com/images/information-icon-white/information-icon-white-3.jpg"
            width={30}
            height={30}
          />
        </a>
      </div>
      <Input />
      {/*Post section*/}
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
      <div className="h-[3000px]"></div>
    </div>
  );
};

export default Feed;
