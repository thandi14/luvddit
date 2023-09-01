import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import pfp from "./icons/IMG6.jpg"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user, menu }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(menu);
  const history = useHistory()
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) setShowMenu(false);
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = menu ? "profile-dropdown" : " hidden";

  return (
    <>
      {/* <img id="pfpButton" src={pfp} alt="pfp" onClick={openMenu}> */}
      {/* </img> */}
      <div className={ulClassName} ref={ulRef}>
        <div>
        <span id="nine"><i class="fi fi-rr-user"></i>My stuff</span>
        <span>Online status</span>
        <span onClick={(() => {
          setShowMenu(!showMenu)
          history.push("/profile")
          })}>Profile</span>
        <span>Create Avatar</span>
        <span>User settings</span>
        </div>
        <div onClick={(() => window.alert("Feature not avilable"))}>
          <span id="nine"><i class="fi fi-rr-eye"></i>View Options</span>
          <span>Mod Mode</span>
          <span>Dark Mode</span>
        </div>
        <div id="thirtythree" onClick={(() => window.alert("Feature not avilable"))}>
          <span><div id="luvvI">l/</div>Create a community</span>
          <span><i class="fi fi-rr-bullhorn"></i>Advertise on luddit</span>
          <span><i class="fi fi-rr-coins"></i>Coins</span>
          <span><i class="fa-solid fa-shield-halved"></i>Premium</span>
          <span><i class="fi fi-rr-telescope"></i>Explore</span>
          <span><i class="fi fi-rr-interrogation"></i>Help Center</span>
          <span><i class="fi fi-rr-circle-i"></i>More</span>
          <span><i class="fa-solid fa-scroll"></i>Terms and Policies</span>
          <span id="menu33">User Agreement</span>
          <span id="menu33">Privacy Policy</span>
          <span id="menu33">Content Policy</span>
          <span id="menu33">Moderator Code of Conduct</span>
        </div>
        {/* <span>{user.username}</span>
        <span>{user.firstName} {user.lastName}</span>
        <span>{user.email}</span> */}
        <div id="door" onClick={logout}><i class="fi fi-rr-door-closed"></i>Log Out</div>
        <span id="inc">Luddit, Inc. © 2023. All rights reserved.</span>
      </div>
    </>
  );
}

export default ProfileButton;
