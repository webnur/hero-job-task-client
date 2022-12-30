import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import SinglePost from "../../Shared/SinglePost/SinglePost";


const Home = () => {

  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://hero-job-task-server-zeta.vercel.app/posts");
      const data = await res.json();
      return data;
    },   
  });

  const postSlice = posts.slice(0, 3);

  refetch()
  return (
    <div className="mt-4">
      <CreatePost></CreatePost>
      <h2 className="text-3xl text-center my-4 font-bold">Popular Post</h2>

      <div className="my-8">
      {postSlice.map((post) => (
        <SinglePost key={post._id} post={post}></SinglePost>
      ))}
    </div>
    </div>
  );
};

export default Home;
