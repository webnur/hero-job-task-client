import moment from "moment";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";

const CreatePost = () => {
    const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePost = (data) => {
    console.log(data.post);
    console.log(data.img);

    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageKey = process.env.REACT_APP_REACT_APP_ImageBB_Api_key;
    const imageUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;

    fetch(imageUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const time = moment().format('MMMM Do YYYY, h:mm:ss a');
        const postData = {
          content: data.post,
          image: imageData.data.display_url,
          authorName: user?.displayName,
          authorUrl: user?.photoURL,
          time
        };

        // save post data to database
        fetch("https://hero-job-task-server-zeta.vercel.app/posts", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((data) => {
            reset()
            console.log(data);
            if(data.acknowledged){
                toast.success('post successfully added')
            }            
          });
      });
  };

  return (
    <div className="py-6 px-4 bg-slate-100 rounded-md">
      <h2 className="py-2">Create a Post</h2>
      <form action="" onSubmit={handleSubmit(handlePost)}>
        <label className="block">
          <textarea
            rows="3"
            placeholder="Write your post"
            {...register("post", { required: "post is required" })}
            className=" p-4 block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
          ></textarea>
        </label>
        <fieldset className="w-full space-y-1 dark:text-gray-100">
          <label className="block text-sm font-medium">Image</label>
          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer"
          >
            <input
              type="file"
              name="image"
              {...register("img", { required: "img is required" })}
              className="bg-white rounded-xl"
              id=""
            />
          </label>
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </fieldset>

        <input
          className=" mt-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 cursor-pointer rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
};

export default CreatePost;
