import { useState } from "react";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onFormSubmit(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user.uid);
        fetch(
          `https://todo-list-sa-default-rtdb.firebaseio.com/users/${user.uid}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tasks: [
                {
                  date: "",
                  done: false,
                  name: "Example",
                  task: "This is an example.",
                },
              ],
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
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
      <h1>Create Account page</h1>
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
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateAccount;
