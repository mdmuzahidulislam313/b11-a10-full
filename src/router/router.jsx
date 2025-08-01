import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Error404 from "../pages/Error404";
import AllGroups from "../pages/Groups/AllGroups";
import CreateGroup from "../pages/Groups/CreateGroup";
import GroupDetails from "../pages/Groups/GroupDetails";
import MyGroups from "../pages/Groups/MyGroups";
import UpdateGroup from "../pages/Groups/UpdateGroup";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "groups", element: <AllGroups /> },
      {
        path: "group/:id",
        element: (
          <PrivateRoute>
            <GroupDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "createGroup",
        element: (
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "updateGroup/:id",
        element: (
          <PrivateRoute>
            <UpdateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "myGroups",
        element: (
          <PrivateRoute>
            <MyGroups />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
