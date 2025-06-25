

import Main from "../layout/Main";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Verify from "../pages/Verify/Verify";

import Forgotpass from "../pages/ForgotPass/ForgotPass";

import { createBrowserRouter } from "react-router-dom";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import Users from "../pages/Users/Users";
import Bookings from "../pages/Bookings/Bookings";
import Message from "../pages/Message/Message";
import Flag from "../pages/Flag/Flag";
import Membership from "../pages/Membership/Membership";
import ManageFees from "../pages/ManageFees/ManageFees";
import Earnings from "../pages/Earnings/Earnings";
import ManagePlatformFee from "../pages/ManagePlatformFee/ManagePlatformFee";
import Categories from "../pages/Categories/Categories";
import Blogs from "../pages/Blogs/Blogs";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import Feedback from "../pages/Feedback/Feedback";
import Reply from "../pages/Feedback/Reply";
import Profile from "../pages/Profile/Profile";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import NotificationDetails from "../pages/Notification/NotificationDetails";
import Notification from "../pages/Notification/Notification";
import Signin from "../pages/Signin/Signin"

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
      {
        path: "/userManagement",
        element: <Users/>,
      },
      {
        path: "/booking",
        element: <Bookings/>,
      },
      {
        path: "/booking/message",
        element: <Message/>,
      },
      {
        path: "/membership",
        element: <Membership/>,
      },
      {
        path: "/membership/manageFees",
        element: <ManageFees/>,
      },
      {
        path: "/booking/flag",
        element: <Flag/>,
      },
      {
        path: "/earnings",
        element: <Earnings/>,
      },
      {
        path: "/earnings/platformFee",
        element: <ManagePlatformFee/>,
      },
      {
        path: "/categories",
        element: <Categories/>,
      },
      {
        path: "/blogs",
        element: <Blogs/>,
      },
      {
        path: "/blogs/createBlogs",
        element: <CreateBlog/>,
      },
      {
        path: "/feedback",
        element: <Feedback/>,
      },
      {
        path: "/feedback/reply",
        element: <Reply/>,
      },
      {
        path: "/setting/updateProfile",
        element: <Profile/>,
      },
      {
        path: "/setting/privacy",
        element: <Privacy/>,
      },
      {
        path: "/setting/terms",
        element: <Terms/>,
      },
             {
            path: "/notification",
            element: <Notification/>,
          },
         {
            // Dynamic route for client details
            path: "/notification/:id",
            element: <NotificationDetails/>, 
          },
    ],
  },
]);
export default router;
