import React, { useContext, useState } from "react";
import "./NavBar.scss";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const NavBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { user, refresh } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed");

      refresh();
      setOpen(false);
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
          <button type="button" onClick={() => setOpen(true)}>
            Signout
          </button>
        </>
      )}
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        message={"signout?"}
        okText={"Signout"}
        onConfirm={handleSignOut}
      />
    </div>
  );
});
