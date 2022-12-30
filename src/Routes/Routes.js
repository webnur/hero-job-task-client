import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Media from "../Pages/Media/Media";
import About from "../Pages/About/About";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/media",
        element: <Media></Media>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
    
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: '/about',
    element: <About></About>
  }
]);

export default router;
