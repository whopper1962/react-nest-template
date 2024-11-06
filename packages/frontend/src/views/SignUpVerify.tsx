import React, { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./SignUpVerify.scss";

export const SignUpVerify: React.FC = () => {
  const signupEmail = sessionStorage.getItem("signup_email");
  const [success, setSuccess] = useState<boolean>(false);
  const verificationCodeRef = useRef<HTMLInputElement | null>(null);
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to={"/home"} />;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/auth/signup/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupEmail,
          code: verificationCodeRef.current?.value,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (success)
    return (
      <div>
        Verification success!
        <Link to={"/signin"}>Signin</Link>
      </div>
    );

  return (
    <div className="signup-verify">
      <div className="signup-verify__section">
        <h1 className="signup-verify__title">Signup-verify</h1>
        <form className="signup-verify__form" onSubmit={handleSubmit}>
          <div className="signup-verify__input">
            <input id="code" type="text" required ref={verificationCodeRef} />
            <label htmlFor="code">Verification code</label>
          </div>
          <button type="submit" className="signup-verify__button">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};
