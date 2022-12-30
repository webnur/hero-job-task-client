import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Navbar from "../Shared/Navbar/Navbar";

const SignUp = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
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
        createUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log(user);

            const userInfo = {
              displayName: data.username,
              photoURL: imageData.data.display_url,
            };
            updateUser(userInfo);
            const emailUser = {
              name: data.username,
              email: user.email,
            };
            navigate(from, { replace: true });
            saveUser(emailUser);
          })
          .catch((error) => console.error(error));
      });

    console.log(data);
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const googleUser = {
          name: user.displayName,
          email: user.email,
        };
        saveUser(googleUser);

        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  // save user to database

  const saveUser = (dbUser) => {
    fetch("https://hero-job-task-server-zeta.vercel.app//users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dbUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("user info successfully added in database");
        }
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <section className="signup-bg py-5">
        <div className="sm:w-full mb-5 max-w-sm p-6 m-auto mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit(handleSignUp)} className="mt-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                {...register("username", { required: "User Name is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}

            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer"
            >
              <input
                type="file"
                name="image"
                className="bg-white rounded-xl"
                {...register("img", { required: "img is required" })}
                id=""
              />
            </label>
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}

            <div>
              <label
                htmlFor="userEmail"
                className="block my-2 text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: "email is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="email"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                {...register("password", { required: "password is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
              or login with Social Media
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="flex items-center mt-6 -mx-2">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
            >
              <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="hidden mx-2 sm:inline">Sign in with Google</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
