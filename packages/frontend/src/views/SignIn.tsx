import React, { useRef } from "react";
import "./SignIn.scss";
import { Link, useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });
      if (!res.ok) throw new Error("Failed");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signin">
      <div className="signin__section">
        <h1 className="signin__title">Signin</h1>
        <form className="signin__form" onSubmit={handleSubmit}>
          <div className="signin__input">
            <input id="email" type="email" autoComplete="email" required ref={emailRef} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="signin__input">
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              ref={passwordRef}
            />
            <label htmlFor="password">password</label>
          </div>
          <button type="submit" className="signin__button">
            Signin
          </button>
        </form>
        <Link to={"/signup"}>Signup</Link>
      </div>
    </div>
  );
};
