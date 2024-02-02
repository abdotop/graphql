import "./login.css";
import axios from "axios";
// import React, { useContext } from 'react';
import { submitSignIn } from "../../tools/tools.js";
import { useEffect, useState } from "react";
// import { SessionContext } from "../../App.jsx";

// import "./illustration.svg"

function Form(setSession) {
  const [errorMessage, setErrorMessage] = useState("");
  const [connection, setConnection] = useState([false, ""]);
  const handleForm = (e) => {
    submitSignIn(e, setConnection);
  };
  useEffect(() => {
    if (!connection[0]) {
        setErrorMessage(connection[1]);
    } else {
        setSession.setSession(connection);
    }
  }, [connection]);

  return (
    <form onSubmit={handleForm} className="login-form box">
      <div className="description">
        <h1>
          Welcome to your<span> Dashboard</span>
        </h1>
      </div>
      <input name="Username" required type="text" placeholder="Email or Username" />
      <input name="password" required type="password" placeholder="Password" />
      {errorMessage && <span>{errorMessage}</span>}
      <button>SIGN IN</button>
    </form>
  );
}

export function Login(setSession) {
  return (
    <div className="container">
      <div className="illustration" />
      <Form {...setSession} />
    </div>
  );
}

{
  /* <div class="container">
    <div class="illustration"></div>
    <div class="login-form box">
        <div class="description">
            <h1>Welcome to your<span> Dashboard</span></h1>
        </div>
        <input type="text" name="" id="Username" placeholder="Email or Username">
        <input type="password" name="" id="password" placeholder="Password">
        <button onclick="signIn(this)">SIGN IN</button>
    </div>
   </div> */
}
