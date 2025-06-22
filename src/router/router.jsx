

import Main from "../layout/Main";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Verify from "../pages/Verify/Verify";
import Signin from "../pages/SignIn/Signin";
import Forgotpass from "../pages/ForgotPass/ForgotPass";
import SignUp from "../pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/verify",
    element: <Verify/>,
  },
 
  {
    path: "/forget-password",
    element: <Forgotpass/>,
  },


  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <DashboardPage/>,
      },
      
    ],
  },
]);
export default router;
