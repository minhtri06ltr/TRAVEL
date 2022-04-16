import { useState, useRef, useEffect } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useDetect } from "../util/useDetectHook";

const Input = () => {
  const wrapperRef = useRef(null);

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  useDetect(wrapperRef, setShowEmoji);
  const imgInputRef = useRef("");
  const addImgToPost = () => {};
  return (
    <div
      className={`border-b border-gray-700 p-4 flex space-x-4 overflow-y-auto`}
    >
      <img
        className=" rounded-full h-14 w-14 object-cover cursor-pointer"
        src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/275373074_2770143603280900_442644796018170289_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=90TAClBGCiAAX9hRZjy&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVJck1KvvHpN9sdr71Y45IQoLJWKjox2-zx6s7YgKK8nnw&oe=627F079C"
      />
      <div className=" flex-1 divide-y divide-gray-700">
        <div className={``}>
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
                className="absolute w-10 h-10 bg-[#15181c]
               hover:bg-[#272c26] bg-opacity-75 
               rounded-full flex items-center
                justify-center top-1 left-1  cursor-pointer"
                onClick={() => setFile(null)}
              >
                <XIcon color="white" width={30} height={30} />
              </div>
              <img
                src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/275373074_2770143603280900_442644796018170289_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=90TAClBGCiAAX9hRZjy&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVJck1KvvHpN9sdr71Y45IQoLJWKjox2-zx6s7YgKK8nnw&oe=627F079C"
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
        </div>
      </div>
    </div>
  );
};

export default Input;
