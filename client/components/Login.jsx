import Image from "next/image";

const Line = () => {
  return <div className="accessory h-1  flex-1 "></div>;
};
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" bg-zinc-900 rounded-xl shadow-2xl  h-[300px]  w-[300px] px-4 flex justify-center relative">
        <div className="rounded-full shadow-2xl border-8 flex items-center justify-center p-4  bg-[#1DA1F2] absolute border-black translate-y-[-60%]">
          <Image src="https://rb.gy/ogau5a" width={70} height={70} />
        </div>
        <div className="flex flex-col w-full items-center">
          <div className="flex justify-around w-full items-center mt-12">
            <Line />
            <span className="font-formTitle text-3xl mx-4 block relative text-white  ">
              Twitter
            </span>
            <Line />
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            <button>Sign in with</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
