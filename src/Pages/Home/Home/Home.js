import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import SinglePost from "../../Shared/SinglePost/SinglePost";


const Home = () => {

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="mt-4">
      <CreatePost></CreatePost>
      <h2 className="text-3xl text-center my-4 font-bold">Popular Post</h2>

      <div className="my-8">
      {posts.map((post) => (
        <SinglePost key={post._id} post={post}></SinglePost>
      ))}
    </div>
    </div>
  );
};

export default Home;
