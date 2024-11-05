import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/SignIn";
import { SignUpVerify } from "./views/SignUpVerify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup/verify",
    element: <SignUpVerify />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
