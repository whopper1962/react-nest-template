import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/SignIn";
import { SignUpVerify } from "./views/SignUpVerify";
import "./App.scss";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Top } from "./views/Top";

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/verify" element={<SignUpVerify />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;
