import { useState, useRef } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useDetect } from "../hooks/useDetectHook";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const wrapperRef = useRef(null);

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  useDetect(wrapperRef, setShowEmoji);
  const imgInputRef = useRef("");
  console.log(file);
  const addImgToPost = (e) => {
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      alert("This file is not a image");
      return;
    }
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
  };
  const addEmoji = (e) => {
    setInput(input + e.native);
  };
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    if (!file) {
      await addDoc(collection(db, "posts"), {
        text: input,
        timestamp: serverTimestamp(),
      });
    }

    const imgRef = ref(storage, `posts/${docRef.id}/img`); // path store img in firebase storage
    if (file) {
      await uploadString(imgRef, file, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          img: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setFile(null);
    setShowEmoji(false);
  };
  return (
    <div
      className={`border-b border-gray-700 p-4 flex space-x-4 overflow-y-auto ${
        loading && "opacity-60"
      }`}
    >
      <img
        className=" rounded-full h-14 w-14 object-cover cursor-pointer"
        src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/275373074_2770143603280900_442644796018170289_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=90TAClBGCiAAX9hRZjy&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVJck1KvvHpN9sdr71Y45IQoLJWKjox2-zx6s7YgKK8nnw&oe=627F079C"
      />
      <div className=" flex-1 divide-y divide-gray-700">
        <div className={`${file && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            name=""
            value={input}
            id=""
            row="2"
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening? Tell us now"
            className="placeholder-gray-500 min-h-[50px] tracking-wide bg-transparent outline-none border-none text-[#d9d9d9] font-medium w-full text-xl"
          ></textarea>

          {file && (
            <div className="relative">
              <div
                className={`absolute w-6 h-6 bg-[#15181c]
               hover:bg-[#272c26] bg-opacity-75 
               rounded-full flex items-center
                justify-center top-1 right-1  cursor-pointer ${
                  loading && "cursor-default"
                }`}
                onClick={() => !loading && setFile(null)}
              >
                <XIcon color="white" width={30} height={30} />
              </div>
              <img
                src={file}
                className="rounded-2xl max-h-80  object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div
            className={`flex items-center cursor-pointer ${
              loading && " cursor-default"
            }`}
          >
            <div className="icon" onClick={() => imgInputRef.current.click()}>
              <PhotographIcon color="#1b9df0" width={25} />
              <input
                type="file"
                onChange={addImgToPost}
                ref={imgInputRef}
                hidden
                disabled={loading}
              />
            </div>
            <div className="icon ">
              <ChartBarIcon color="#1b9df0" width={23} />
            </div>
            <div
              className="icon"
              onClick={() => !loading && setShowEmoji(!showEmoji)}
            >
              <EmojiHappyIcon color="#1b9df0" width={23} />
            </div>
            <div className="icon">
              <CalendarIcon color="#1b9df0" width={23} />
            </div>
            {showEmoji && (
              <div ref={wrapperRef}>
                <Picker
                  theme="dark"
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    borderRadius: "20px",
                    maxWidth: "320px",
                    marginTop: "18px",
                    marginLeft: "-222px",
                  }}
                />
              </div>
            )}
          </div>
          <button
            disabled={!input.trim() && !file}
            className={`text-white rounded-full bg-[#1d9bf0]
             w-28 font-bold shadow-2xl py-1.5 hover:bg-[#1a8cd8]
             disabled:opacity-50 disabled:hover:bg-[#1d9bf0]
             flex items-center justify-center shrink-0
             ${loading && "cursor-default"}`}
            onClick={!loading ? sendPost : () => {}}
          >
            {loading ? (
              <svg
                role="status"
                className=" w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
            ) : (
              "Tweet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
