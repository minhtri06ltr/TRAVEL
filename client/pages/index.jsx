import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Widget from "../components/Widget";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="bg-black">
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Twitter with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Feed setOpenSidebar={setOpenSidebar} />
        <Widget />

        {/*Modal */}
      </main>
    </div>
  );
}
