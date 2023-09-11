import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../context/Modal"


function CommunitiesProfile({ page, community }) {
    const { communities, userCommunities, singleCommunity, communityMemberships, memberships } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    let joined = null


    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true

    console.log(members)

    const myMemberships = Object.values(memberships)
    const member = myMemberships.filter((m) => m.id === singleCommunity.id)

    if (member) joined = true
    if (!member.length) joined = false

    useEffect(() => {

        async function fetchData() {
           if (community && community.id) await dispatch(communityActions.thunkGetDetailsById(community.id))
            if (user) await dispatch(communityActions.thunkGetCommunityMemberships())

        }

        fetchData()



    }, [dispatch])

    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 101));

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newRandomNum = Math.floor(Math.random() * 101);
            setRandomNum(newRandomNum);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };

    }, []);

    const handleJoinClick = async (e) => {
        let response
        e.stopPropagation()
        joined = true
        if (singleCommunity.type === "Public") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
        if (singleCommunity.type === "Private" || singleCommunity.type === "Restricted") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id, singleCommunity.type))
      }

      const handleUnjoinClick = async (e) => {
        let response
        e.stopPropagation()
        joined = false
        response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
      }

    const handleClick = (e) => {
        e.stopPropagation()
        if (community.type === "Profile") return
        closeModal()
        history.push(`/communities/${community.id}/:page`)

    }

    if (!community) return <h1></h1>
    let userCommunity = Object.values(community)

    let createdAt
    if (Object.values(community).length) createdAt = new Date(community.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];


    let myCommunities
    if (Object.values(userCommunities).length) myCommunities = Object.values(userCommunities)

    let firstCommunity
    if (myCommunities) firstCommunity = myCommunities[0].id

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;


    return (
        <>
        {community.type === "Profile" ? <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} className="your-community">
        <div on id="profile-header"></div>
        <div id="your-community">
        <div id="yc-avatar">
        <img src={avatar}></img>
        </div>
        <div id="user-community2">
        <span>l/{userCommunity[2]}</span>
        <i class="fi fi-rr-settings"></i>
        </div>
        <button id="user-button"><p>Create Avatar</p><i class="fi fi-rr-angle-small-right"></i></button>
        <div id="community-info">
            <div>
            <span id="ci-name">Karma</span>
            <span id="ci-icon"><i class="fi fi-rr-star-christmas"></i>{user.karma}</span>
            </div>
            <div>
            <span id="ci-name">Cake day</span>
            <span id="ci-icon"><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
            </div>
        </div>
        <button id="social-button"><i class="fi fi-rr-plus"></i>Add social link</button>
        {page === "/postId" ? <button onClick={(e) => history.push('/posts/new')} id="another">New Post</button> : null}
        <div id="options-link">
        <span>More Options</span>
        </div>
        </div>
        </div> :
         <div onClick={handleClick} id="your-community-profile">
                    {!singleCommunity.communityStyles?.length ? <div id="header-profile-comm4">
                    </div> : <div className="header-postC"><img id="header-profile-comm10" src={singleCommunity.communityStyles[0].header} ></img></div> }
                    <div id="profile-content">
                        <span id="profile-comm-title7">{ singleCommunity.communityStyles && singleCommunity.communityStyles.length ? <img id="PFP36" src={singleCommunity.communityStyles[0].profile}></img> : <div>l/</div>}{community?.name}</span>
                        <span id="profile-about7">{community?.about}</span>
                        <span id="when-created"><i class="fi fi-rr-cake-birthday"></i>Created {formattedDate}</span>
                        <div id="line"></div>
                        <div id="cs-side9">
                        <span><div>{community?.CommunityMembers}</div>Members</span>
                         <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                        </div>
                        <div id="line"></div>
                        {member.length && joined ? <button onClick={handleUnjoinClick} id="join-now2">Joined</button> : <button onClick={handleJoinClick} id="join-now">Join</button> }
                        <div id="line"></div>
                        <div id="cs-side5">
                        <span onClick={(() => window.alert("Feature coming soon"))}>COMMUNITY OPTIONS</span>
                        <i class="fa-solid fa-chevron-down"></i>
                </div>

                </div>

                </div> }
        </>
    )
}

export default CommunitiesProfile
