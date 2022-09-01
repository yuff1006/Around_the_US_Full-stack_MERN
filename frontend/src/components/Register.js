import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register({ onSubmit }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email: registerEmail, password: registerPassword });
  };
  const handlePasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Sign up</h1>
        <form
          className="auth__form"
          name="signup-form"
          onSubmit={handleRegisterSubmit}
        >
          <input
            className="auth__input"
            placeholder="Email"
            type="text"
            onChange={handleEmailChange}
          />
          <input
            className="auth__input"
            placeholder="Password"
            type="password"
            onChange={handlePasswordChange}
          />
          <button className="auth__button" type="submit">
            Sign up
          </button>
          <NavLink to="/singin" className="auth__redirect">
            Already a member? Log in here!
          </NavLink>
        </form>
      </div>
    </main>
  );
}

export default Register;
