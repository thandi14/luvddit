import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id="signup-form">
      <h1>Sign Up</h1>
      <p>By continuing, you are setting up a Luddit account and agree to our <span>User Agreement</span> and <span>Privacy Policy</span>.</p>
      <form id="form-sign" onSubmit={handleSubmit}>
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p id="error">{errors.email}</p>}
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p id="error">{errors.username}</p>}
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p id="error">{errors.password}</p>}
        <label>
          <input id={Object.values(errors).length ? "input-err2" : "input-err"}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p id="error">{errors.confirmPassword}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <p id="sign-up2">Already a Luddit? <span onClick={(() => setModalContent(<LoginFormModal />))}>Login in</span></p>

    </div>
  );
}

export default SignupFormModal;
