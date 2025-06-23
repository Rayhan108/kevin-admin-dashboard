

import Main from "../layout/Main";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Verify from "../pages/Verify/Verify";
import Signin from "../pages/SignIn/Signin";
import Forgotpass from "../pages/ForgotPass/ForgotPass";

import { createBrowserRouter } from "react-router-dom";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import Users from "../pages/Users/Users";


const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin/>,
  },
  {
    path: "/passReset",
    element: <PasswordReset/>,
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
      {
        path: "/userManagement",
        element: <Users/>,
      },
      
    ],
  },
]);
export default router;
