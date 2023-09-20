import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import * as communityActions from '../../store/communities'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import avatar from "./IMG6.jpg"



function ModTools() {
    const { communities, communityMemberships, singleCommunity, communityMembers } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [ memberId, setMemberId ] = useState(null)
    let joined

    useEffect(() => {

        async function fetchData() {
          await dispatch(communityActions.thunkGetCommunityMemberships(id))
          if (id) await dispatch(communityActions.thunkGetDetailsById(id))
          else return
        }

        fetchData()

    }, [dispatch, id])



    const getTimeDifferenceString = (createdAt) => {
        const currentTime = new Date();
        const createdAtDate = new Date(createdAt);

        const timeDifferenceInSeconds = Math.floor((currentTime - createdAtDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
          return timeDifferenceInSeconds === 1 ? `${timeDifferenceInSeconds} sec ago` : `${timeDifferenceInSeconds} secs ago`;
        } else if (timeDifferenceInSeconds < 3600) {
          const minutes = Math.floor(timeDifferenceInSeconds / 60);
          return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
        } else if (timeDifferenceInSeconds < 86400) {
          const hours = Math.floor(timeDifferenceInSeconds / 3600);
          return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
        } else if (timeDifferenceInSeconds < 2592000) {
          const days = Math.floor(timeDifferenceInSeconds / 86400);
          return days === 1 ? `${days} day ago` : `${days} days ago`;
        } else if (timeDifferenceInSeconds < 31536000) {
          const months = Math.floor(timeDifferenceInSeconds / 2592000);
          return months === 1 ? `${months} month ago` : `${months} months ago`;
        } else {
          const years = Math.floor(timeDifferenceInSeconds / 31536000);
          return years === 1 ? `${years} year ago` : `${years} years ago`;
        }
      };


    let members = []
    if (communityMemberships) members = Object.values(communityMemberships)

    return(
        <div>
            <div id="name-head">
                <div style={{ fontWeight: "900" }}id="name-headC2">
                {singleCommunity.CommunityStyle?.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle.icon}></img> : <div style={{ backgroundColor: `${singleCommunity.CommunityStyle?.base}`, color: "white", display: "flex", alignItems: "center", justifyContent: "center"}} id="pfp30">l/</div>}
                <div onClick={((e) => history.push(`/communities/${id}/:page`))}
                style={{ color: "#0079D3", cursor: "pointer"}}>
                    <span>l/</span><span>{singleCommunity.name}</span>
                </div>
                <span>/</span>
                <span>Approved</span>
                </div>
                <div id="mmod">

                <div id="mod-menu">
                    <div onClick={((e) => history.push(`/communities/${id}/:page`))} id="color45"><i class="fi fi-rr-arrow-left"></i><span>Exit mod tools</span></div>
                    <div id="ov-mod">
                        <div id="color45">OVERVIEW</div>
                        <span><i class="fi fi-rr-envelopes"></i><span>Queues</span></span>
                        <span id="sec40"><span id="sec30"><i class="fi fi-rr-envelope"></i><span>Modmail</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                        <span><i class="fi fi-rr-calendar-heart"></i><span>Scheduled Posts</span></span>
                        <span id="color45"><i class="fi fi-rr-following"></i><span>User Management</span></span>
                    </div>
                    <div id="ov-mod">
                        <div id="color45">MODERATION</div>
                        <span><i class="fa-solid fa-scroll"></i><span>Rules and Removal Reasons</span></span>
                        <span><i class="fi fi-rr-bookmark"></i><span>User Flair</span></span>
                        <span><i class="fi fi-rr-code-compare"></i><span>Conent Controls</span></span>
                        <span><i class="fi fi-rr-rectangle-list"></i><span>Mod Log</span></span>
                        <span><i class="fi fi-rr-robot"></i><span>Automod</span></span>
                        <span><i class="fi fi-rr-key"></i><span>Saftey</span></span>
                    </div>
                    <div id="ov-mod">
                        <div id="color45">CONTENT</div>
                        <span><i class="fi fi-rr-book-alt"></i><span>Wiki</span></span>
                        <span><i class="fi fi-rr-bookmark"></i><span>Post Flair</span></span>
                    </div>
                    <div id="ov-mod">
                        <div id="color45">SETTINGS</div>
                        <span><i class="fi fi-rr-settings"></i><span>General Settings</span></span>
                        <span><i class="fi fi-rr-notebook"></i><span>Posts and Comments</span></span>
                        <span onClick={((e) => history.push(`/communities2/${id}/:page`))} id="color45"><i class="fi fi-rr-paint-roller"></i><span>Community Appearance</span></span>
                        <span><i class="fi fi-rs-cowbell"></i><span>Notifications</span></span>
                        <span><i class="fi fi-rr-square-e"></i><span>Content Rating</span></span>
                        <span><i class="fi fi-rr-kiss-wink-heart"></i><span>Awards and Emojis</span></span>
                    </div>
                    <div id="ov-mod2">
                        <div id="color45">SUPPORT</div>
                        <span onClick={(() => window.open("/communities/10/:page", "_blank"))} id="color45"><span><i class="fa-brands fa-reddit-alien"></i><span>Mod Help Center</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                        <span><span><i class="fa-brands fa-reddit-alien"></i><span>Mod Code of Conduct</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                        <span><span><i class="fa-brands fa-reddit-alien"></i><span>ModSupport</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                        <span><span><i class="fa-brands fa-reddit-alien"></i><span>ModHelp</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                        <span><span><i class="fa-brands fa-reddit-alien"></i><span>Content Luvddit</span></span><i class="fi fi-rr-arrow-up-right-from-square"></i></span>
                    </div>
                    <span>Reddit Inc © 2023<br></br>
                        All rights reserved</span>
                </div>
                </div>
            <div>
            </div>
                <div id="mod-page">
                    <div id="modC">
                        <span id="mod-title">User Management</span>
                        <div id="mod-pick"><span onClick={(() => window.alert("Feature not availble"))}>Banned</span><span onClick={(() => window.alert("Feature not availble"))}>Muted</span><span id="mod-picked">Approved</span><span onClick={(() => window.alert("Feature not availble"))}>Moderators</span></div>
                        <button onClick={(() => window.alert("Feature not availble"))} id="mod-button">Approve user</button>
                        { !members.length ? <div id="no-users">
                            <div id="none100">
                            <i class="fi fi-rr-magic-wand"></i>
                            <span>No approved users in l/{singleCommunity.name}</span>
                            </div>
                        </div> :
                        <div id="yes-users">
                            <div style={{ backgroundColor: "#EDEFF1", height: "48px", alignItems: "center", display: "flex", paddingLeft: "1%"}}>
                                <div style={{ position: "relative", overflow: 'hidden', borderRadius: "4px" }}>
                                <input onClick={(() => window.alert("Feature not availble"))} placeholder="Search for a user">
                                </input>
                                <i class="fi fi-rs-search-heart"></i>
                                </div>
                            </div>
                            {members.map((m) =>
                                <div className="eMember">
                                <div onClick={(() => {
                                   if (m.userId !== user.id) history.push(`/profile2/${m.userId}/:page`)
                                   if (m.userId === user.id) history.push(`/profile/:page`)
                                })}>
                                { m.Community?.communityStyles?.length ? <img style={{ backgroundColor: "#0079D3", borderRadius: "4px", width: "28px", height: "28px"}} src={m.Community.communityStyles[0].profile}></img> : <img style={{ backgroundColor: "#0079D3", borderRadius: "4px", width: "28px", height: "28px"}} src={avatar}></img> }
                                <span style={{ fontSize: "14px", fontWeight: "900" }}>{m.User.username}</span>
                                </div>
                                <span style={{ color: "#ccc", fontSize: "12px"}} >{getTimeDifferenceString(m.updatedAt)}</span>
                                {m.status === "Approved" ? <span onClick={(() => {
                                    let status = "Unapproved"
                                    dispatch(communityActions.thunkUpdateMember(id, m.userId, status))
                                    })} id="mem-butt">Remove</span> :
                                <span onClick={(() => {
                                    let status = "Approved"
                                    dispatch(communityActions.thunkUpdateMember(id, m.userId, status))
                                    })} id="mem-butt">Approve</span>}
                                </div>
                            )}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModTools
