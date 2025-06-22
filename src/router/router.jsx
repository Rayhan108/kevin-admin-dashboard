import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Signin from "../pages/SignIn/Signin";
import DashboardPage from "../pages/DashboardPage/DashboardPage";


const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin />,
  },

  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      
    ],
  },
]);
export default router;
