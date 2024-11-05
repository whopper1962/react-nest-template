import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/not-found",
    element: <NotFound/>,
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
