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
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const wrapperRef = useRef(null);

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  useDetect(wrapperRef, setShowEmoji);
  const imgInputRef = useRef("");
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
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      text: input,
      timestamp: serverTimestamp(),
    });
    const imgRef = ref(storage, `posts/${docRef.id}/img`);
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
      className={`border-b border-gray-700 p-4 flex space-x-4 overflow-y-auto`}
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
                className="absolute w-6 h-6 bg-[#15181c]
               hover:bg-[#272c26] bg-opacity-75 
               rounded-full flex items-center
                justify-center top-1 right-1  cursor-pointer"
                onClick={() => setFile(null)}
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
          <div className="flex items-center">
            <div className="icon" onClick={() => imgInputRef.current.click()}>
              <PhotographIcon color="#1b9df0" width={25} />
              <input
                type="file"
                onChange={addImgToPost}
                ref={imgInputRef}
                hidden
              />
            </div>
            <div className="icon ">
              <ChartBarIcon color="#1b9df0" width={23} />
            </div>
            <div className="icon" onClick={() => setShowEmoji(!showEmoji)}>
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
            className="text-white rounded-full bg-[#1d9bf0]
             px-6 font-bold shadow-2xl py-1.5 hover:bg-[#1a8cd8]
             disabled:opacity-50 disabled:hover:bg-[#1d9bf0]
             "
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
