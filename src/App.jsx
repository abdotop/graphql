import { useEffect, useState } from "react";
import { Login } from "./components/login/login.jsx";
import { validateToken,name } from "./tools/tools.js";
import { Dash } from "./components/dashbord/dash.jsx";
import { checkBox } from "./config/config.js";
import "./App.css";

function DarkMod() {
  useEffect(() => {
    const checkbox = document.getElementById("toggle-check");
    if (localStorage.getItem("mode") === "dark") {
      checkbox.checked = true;
      document.body.classList.add("dark-mode");
    }
  }, []);
  return (
    <>
      <input onChange={checkBox} type="checkbox" id="toggle-check" />
      <label htmlFor="toggle-check" className="toggle-label">
        <div className="toggle-container">
          <div className="toggle-light-icon icon">
            <i className="darkmod_i bx bxs-sun"></i>
          </div>
          <div className="toggle-dark-icon icon">
            <i className="darkmod_i bx bxs-moon"></i>
          </div>
          <div className="toggle-circle"></div>
        </div>
      </label>
    </>
  );
}

function App() {
  // const SessionContext = createContext();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // name()
    validateToken().then((result) => {
      // console.log(result);
      const ot = setTimeout(()=>{
        setSession(result);
        clearTimeout(ot)
      },50)
    });
  }, []);
  if (session === null) {
    return <div>Loading...</div>;
  }

  // <DarkMod />
  return (
    <>
      {session[0] ? (
        <Dash setSession={setSession} session={session} />
      ) : (
        <Login setSession={setSession} />
      )}
    </>
  );
}

export default App;
