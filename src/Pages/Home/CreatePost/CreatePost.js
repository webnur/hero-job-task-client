import React from "react";

const CreatePost = () => {
  return (
    <div className="py-6 px-4 bg-slate-100 rounded-md">
      <h2 className="py-2">Create a Post</h2>
      <form action="">
        <label className="block">
          <textarea
            rows="3"
            placeholder="Write your post"
            className=" p-4 block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
          ></textarea>
        </label>
        <fieldset className="w-full space-y-1 dark:text-gray-100">
        <label className="block text-sm font-medium">
            Image
          </label>
          <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer"
            >
              <input
                type="file"
                name="image"
                className="bg-white rounded-xl"
                id=""
              />
            </label>
        </fieldset>

        <input className=" mt-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 cursor-pointer rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type="submit" value="Post" />
      </form>
    </div>
  );
};

export default CreatePost;
