import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../context/Modal"


function CommunitiesProfile({ page, community }) {
    const { communities, userCommunities, singleCommunity, communityMemberships } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const [ joined, setJoined ] = useState(null)
    const memberships = Object.values(communityMemberships)
    const member = memberships.filter((m) => m.communityId === singleCommunity.id)

    useEffect(() => {

        async function fetchData() {
           if (community.id) await dispatch(communityActions.thunkGetDetailsById(community.id))
            await dispatch(communityActions.thunkGetCommunityMemberships())

        }

        fetchData()

        const member = memberships.filter((m) => m.communityId === singleCommunity.id)
        if (member) setJoined(true)
        if (!member) setJoined(false)


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
        e.stopPropagation()
        let response
        setJoined(true)
        await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
    }

    const handleUnjoinClick = async (e) => {
        e.stopPropagation()
        let response
        setJoined(false)
        response = await dispatch(communityActions.thunkUnjoinCommunities(community.id))
    }

    const handleClick = () => {
        if (page === "create") return
        closeModal()
        history.push(`/communities/${community.id}`)

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



    const profile = community.id

    let myCommunities
    if (Object.values(userCommunities).length) myCommunities = Object.values(userCommunities)

    let firstCommunity
    if (myCommunities) firstCommunity = myCommunities[0].id

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;


    return (
        <>
        {profile === firstCommunity ? <div className="your-community">
        <div id="profile-header"></div>
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
                    <div id="header-profile-comm4">
                    </div>
                    <div id="profile-content">
                        <span id="profile-comm-title7"><div>l/</div>{community?.name}</span>
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
