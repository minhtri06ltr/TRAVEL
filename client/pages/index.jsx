import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Widget from "../components/Widget";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";

export default function Home({ providers, trendingResults, followResults }) {
  const { data: session } = useSession();
  const [openSidebar, setOpenSidebar] = useState(false);
  if (!session) return <Login providers={providers} />;

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

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  //get all sign in methods
  const providers = await getProviders();
  // const session = await getSession(context);

  //export response data
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      // session,
    },
  };
}
