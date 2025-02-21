import { useState } from "react";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onFormSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user.uid);
        console.log(user.email, "Signed in");

        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            id="email-address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}

export default Login;
