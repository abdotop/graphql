import { useEffect, useRef, useState } from "react";
import { SideBar } from "./components/sidebar/sidebar";
import { Dashboard } from "./components/dasborard";
import { User } from "./components/user";
import { Analytics } from "./components/analytics";

import "./dash.css";
// import

export function Dash({ setSession, session }) {
  const [currentWindow, setWindow] = useState("Dashboard");
  // useEffect
  return (
    <>
      <SideBar
        setWindow={setWindow}
        setSession={setSession}
        session={session}
      />
      <section className="home-section">
        <div className="text">{currentWindow}</div>
        {currentWindow === "Dashboard" ? (
          <Dashboard />
        ) : currentWindow === "User" ? (
          <User />
        ) : (
          <Analytics />
        )}
      </section>
    </>
  );
}
