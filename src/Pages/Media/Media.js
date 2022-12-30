import React from "react";
import { useQuery } from "@tanstack/react-query";
import SinglePost from "../Shared/SinglePost/SinglePost";

const Media = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://hero-job-task-server-zeta.vercel.app/posts");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="my-8">
      {posts.map((post) => (
        <SinglePost key={post._id} post={post}></SinglePost>
      ))}
    </div>
  );
};

export default Media;
