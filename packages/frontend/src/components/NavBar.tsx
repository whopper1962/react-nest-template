import React, { useContext } from "react";
import "./NavBar.scss";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, refresh } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed");

      refresh();
      navigate("/signin");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="nav-bar">
      {user && (
        <>
          <p>{user.name}</p>
          <button type="button" onClick={handleSignOut}>
            Signout
          </button>
        </>
      )}
    </div>
  );
};
