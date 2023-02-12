import { createBrowserRouter } from "react-router-dom";
import { Login } from "./features/login/Login";
import Root from "./features/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    // children: [
    //   {
    //     path: "login",
    //     element: <Login />,
    //     // loader: contactLoader,
    //   },
    //   // {
    //   //   path: "contacts/:contactId/edit",
    //   //   element: <EditContact />,
    //   //   loader: contactLoader,
    //   //   action: editAction,
    //   // },
    // ],
  },
  {
    path: "authorization",
    element: <Login />,
    // loader: contactLoader,
  },
]);

export default router;
