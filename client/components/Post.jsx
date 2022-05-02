import React from "react";

const Post = ({ post, id, postPage }) => {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      {!postPage && (
        <img src={post?.userImg} className="rounded-full h-11 w-11 mr-4" />
      )}
      <div className="flex flex-col w-full space-y-2"></div>
    </div>
  );
};

export default Post;
