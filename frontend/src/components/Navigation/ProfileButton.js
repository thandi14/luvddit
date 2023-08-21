import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import pfp from "./icons/IMG6.jpg"

function ProfileButton({ user, menu }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(menu);
  const ulRef = useRef();

  console.log(menu)

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
        <span>Profile</span>
        <span>Create Avatar</span>
        <span>User settings</span>
        </div>
        <div>
          <span id="nine"><i class="fi fi-rr-eye"></i>View Options</span>
          <span>Mod Mode</span>
          <span>Dark Mode</span>
        </div>
        <div>
          <span>Create a community</span>
          <span><i class="fi fi-rr-bullhorn"></i>Advertise on luddit</span>
          <span><i class="fi fi-rr-coins"></i>Coins</span>
          <span><i class="fa-solid fa-shield-halved"></i>Premium</span>
          <span><i class="fi fi-rr-telescope"></i>Explore</span>
          <span><i class="fi fi-rr-interrogation"></i>Help Center</span>
          <span><i class="fi fi-rr-circle-i"></i>More</span>
          <span><i class="fa-solid fa-scroll"></i>Terms and Policies</span>
          <span>User Agreement</span>
          <span>Privacy Policy</span>
          <span>Content Policy</span>
          <span>Moderator Code of Conduct</span>
        </div>
        {/* <span>{user.username}</span>
        <span>{user.firstName} {user.lastName}</span>
        <span>{user.email}</span> */}
        <div onClick={logout}><i class="fi fi-rr-door-closed"></i>Log Out</div>
      </div>
    </>
  );
}

export default ProfileButton;
