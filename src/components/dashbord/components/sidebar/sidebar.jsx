import { toggleSideBar } from "../../script";
import { logout } from "../../../../tools/tools.js";
import { useEffect, useId, useRef, useState } from "react";
import { validateToken } from "../../../../tools/tools.js";
function Logo() {
  return (
    <div className="logo-details">
      <i className="bx bxl-c-plus-plus icon"></i>
      <div className="logo_name">My Profile</div>
      <i className="bx bx-menu" onClick={toggleSideBar} id="btn"></i>
    </div>
  );
}

function ListItem({ setWindow, item }) {
  const changeWindow = () => {
    setWindow(item.name);
  };
  return (
    <li onClick={changeWindow} id={useId()}>
      <a id={useId()} className={item.active}>
        <i className={item.className}></i>
        <span className="links_name">{item.name}</span>
      </a>
      <span className="tooltip">{item.name}</span>
    </li>
  );
}

const itemsList = [
  { className: "bx bx-grid-alt", name: "Dashboard", active: "true" },
  { className: "bx bx-user", name: "User", active: "false" },
  { className: "bx bx-pie-chart-alt-2", name: "Analytics", active: "false" },
];

export function NavList({ setWindow, setSession, session }) {
  const nameDiv = useRef(null);
  const jobDiv = useRef(null);

  useEffect(() => {
    validateToken().then((result) => {
      const ot = setTimeout(() => {
        if (result[0]) {
          const user = result[1].data.user[0];
          jobDiv.current.innerHTML = `@${user.login}`;
          nameDiv.current.innerHTML = `${user.firstName} ${user.lastName}`;
        }
        clearTimeout(ot);
      }, 50);
    });
  }, []);
  const handleLogout = () => {
    logout(setSession);
  };
  return (
    <ul id={useId()} className="nav-list">
      <li id={useId()}>
        <i onClick={toggleSideBar} className="bx bx-search"></i>
        <input type="text" placeholder="Search..." />
        <span className="tooltip">Search</span>
      </li>
      {itemsList.map((item, index) => (
        <ListItem setWindow={setWindow} key={index} item={item} />
      ))}
      <li id={useId()} onClick={handleLogout} className="profile">
        <div className="profile-details">
          {/* <!--<img src="profile.jpg" alt="profileImg">--> */}
          <div className="name_job">
            <div ref={nameDiv} className="name"></div>
            <div ref={jobDiv} className="job"></div>
          </div>
        </div>
        <i className="bx bx-log-out" id="log_out"></i>
      </li>
    </ul>
  );
}

export function SideBar({ setWindow, setSession, session }) {
  return (
    <>
      <div className="sidebar">
        <Logo />
        <NavList
          setWindow={setWindow}
          setSession={setSession}
          session={session}
        />
      </div>
    </>
  );
}
