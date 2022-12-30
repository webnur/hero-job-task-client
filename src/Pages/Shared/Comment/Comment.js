import React from "react";

const Comment = ({ comment }) => {
  console.log(comment);
  const { authorImage, authorName, commentText } = comment;
  return (
    <div className="flex items-center p-2 space-x-4">
      <img
        src={authorImage}
        alt=""
        className="w-12 h-12 rounded-full dark:bg-gray-500"
      />
      <div>
        <h2 className="text-lg font-semibold">{authorName}</h2>
        <span className="flex items-center space-x-1">
          <p className="text-xs dark:text-gray-400">
            {commentText}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Comment;
