import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthProvider";
import Comment from "../Comment/Comment";

const SinglePost = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  //get comment data
  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch("https://hero-job-task-server-zeta.vercel.app/comments");
      const data = await res.json();
      return data;
    },
  });

  //send comment data
  const handleComment = (data) => {
    console.log(data.comment);
    const commentData = {
      commentText: data.comment,
      authorName: user.displayName,
      authorImage: user.photoURL,
      postId: post._id,
    };
    fetch("https://hero-job-task-server-zeta.vercel.app/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        if (data.acknowledged) {
          toast.success("comment added");
        }
      });
    refetch();
  };

  const allComments = comments.filter((com) => com.postId === post._id);

  // comment slice
  const sliceComment = allComments.slice(0, 3);

  return (
    <div className="md:flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
      <div className="flex space-x-4">
        {post.authorUrl ? (
          <img
            alt=""
            src={post.authorUrl}
            className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
          />
        ) : (
          <FaUserAlt className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full p-2"></FaUserAlt>
        )}
        <div className="flex flex-col space-y-1  justify-center">
          <a
            rel="noopener noreferrer"
            href="/"
            className="text-sm font-semibold"
          >
            {post.authorName ? post.authorName : "unknown"}
          </a>
          <p>{post.time}</p>
        </div>
      </div>
      <div>
        <img
          src={post.image}
          alt=""
          className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
        />
        <p className="text-sm dark:text-gray-400">{post.content}</p>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              title="Like post"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-3 mt-2">
          <form action="" onSubmit={handleSubmit(handleComment)}>
            <textarea
              placeholder="Add a comment..."
              name="comment"
              id=""
              {...register("comment", { required: "User Name is required" })}
              cols="50"
              className="rounded-lg w-full py-0.5 p-2 dark:bg-transparent border-none text-sm pl-0 dark:text-gray-100"
              rows="2"
            ></textarea>
            <input
              // style={{ background: "#FDB066" }}
              className="py-2 my-2 px-2 rounded-lg bg-slate-50 cursor-pointer"
              type="submit"
              value="Add Comment"
            />
          </form>
          <div>
            <p>comments:</p>
            {sliceComment.map((comment) => (
              <Comment key={comment._id} comment={comment}></Comment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
