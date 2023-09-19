import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import pfp from "./icons/IMG6.jpg"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CreateCommunity from "../CreateCommunityModel";
import { useModal } from "../../context/Modal";

function ProfileButton({ user, menu, r }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(menu);
  const history = useHistory()
  const { setModalContent } = useModal()
  //const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) setShowMenu(false);
    setShowMenu(true);
  };

  useEffect(() => {
    if (menu) setShowMenu(true)
    if (!menu) setShowMenu(false)
  }, [menu])

  useEffect(() => {
   // if (!showMenu) return;

    const closeMenu = (e) => {
      if (r && r.current && !r.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    setShowMenu(false)
  };

  const ulClassName = showMenu ? "profile-dropdown" : " hidden";

  return (
    <>
      {/* <img id="pfpButton" src={pfp} alt="pfp" onClick={openMenu}> */}
      {/* </img> */}
      <div className={ulClassName} >
        <div>
        <span id="nine"><i class="fi fi-rr-following"></i>My stuff</span>
        <span>Online status</span>
        <span onClick={(() => {
          setShowMenu(false)
          history.push("/profile/:page")
          })}>Profile</span>
        <span>Create Avatar</span>
        <span>User settings</span>
        </div>
        <div onClick={(() => window.alert("Feature not avilable"))}>
          <span id="nine"><i class="fi fi-rr-eye"></i>View Options</span>
          <span>Mod Mode</span>
          <span>Dark Mode</span>
        </div>
        <div id="thirtythree">
          <span onClick={(() => setModalContent(<CreateCommunity />))}><div id="luvvI">l/</div>Create a community</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fi fi-rr-bullhorn"></i>Advertise on luddit</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fi fi-rr-coins"></i>Coins</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fa-solid fa-shield-halved"></i>Premium</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fi fi-rr-telescope"></i>Explore</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fi fi-rr-interrogation"></i>Help Center</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fi fi-rr-circle-i"></i>More</span>
          <span onClick={(() => window.alert("Feature not avilable"))}><i class="fa-solid fa-scroll"></i>Terms and Policies</span>
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
