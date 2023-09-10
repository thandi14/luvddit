import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormPage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    history.push('/')
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  const handleDemo = () => {
    setCredential("Demo-lition")
    setPassword("password")
  }

  console.log(errors)

  return (
    <div id="login-form">
      <h1>Log In</h1>
      <p>By continuing, you are setting up a Luddit account and agree to our <span>User Agreement</span> and <span>Privacy Policy</span>.</p>
      <form id="form-log"onSubmit={handleSubmit}>
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="text"
            placeholder="Username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
          {errors.credential && (
            <p id="error">Incorrect username or password</p>
          )}
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p onClick={(() => window.alert("Feature coming soon"))} id="sign-up2">Forgot your <span id="no">username</span> or <span id="no">password?</span></p>
        <button type="submit">Log In</button>
      </form>
      <p id="sign-up2">New to Luvddit? <span onClick={(() => setModalContent(<SignupFormModal />))} id="yes">Sign Up</span></p>
      <p id="sign-up2">Sign In as <span onClick={handleDemo} id="yes">Demo-lition</span></p>

    </div>
  );
}

export default LoginFormModal;
