import React, { useContext, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./SignUp.scss";

export const SignUp: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to={"/home"} />;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!emailRef.current) return;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: usernameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      sessionStorage.setItem("signup_email", emailRef.current.value);

      navigate("/signup/verify");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup">
      <div className="signup__section">
        <h1 className="signup__title">Signup</h1>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__input">
            <input id="username" type="text" autoComplete="username" required ref={usernameRef} />
            <label htmlFor="username">username</label>
          </div>
          <div className="signup__input">
            <input id="email" type="email" autoComplete="email" required ref={emailRef} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="signup__input">
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              ref={passwordRef}
            />
            <label htmlFor="password">password</label>
          </div>
          <div className="signup__input">
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              ref={confirmPasswordRef}
            />
            <label htmlFor="confirmPassword">confirm password</label>
          </div>
          <button type="submit" className="signup__button">
            Signup
          </button>
        </form>
        <Link to={"/signin"}>Signin</Link>
      </div>
    </div>
  );
};
