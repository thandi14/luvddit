import { useState, useEffect } from 'react';
import './CommunityPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as communityActions from '../../store/communities'
import SignupFormModal from '../SignupFormPage';
import { useModal } from '../../context/Modal';


function YourCommunitesProfile({ base, highlight }) {
    const { communities, communityMemberships, singleCommunity } = useSelector((state) => state.communities);
    const { id } = useParams()
    const { posts } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.session);
    const history = useHistory()
    const [isVisible, setIsVisible] = useState(false)
    const [ about, setAbout ] = useState("");
    const [ data1, setData1 ] = useState("");
    const dispatch = useDispatch()
    const [singleCommunityName, setSingleCommunityName] = useState(singleCommunity.name)
    const [ color, setColor ] = useState(singleCommunity.CommunityStyle?.base)
    const location = useLocation()
    const { setModalContent } = useModal()

    useEffect(() => {
        setSingleCommunityName(singleCommunity.name)

    }, [singleCommunity.name]);


    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true

    useEffect(() => {

        async function fetchData() {
         if (id) await dispatch(communityActions.thunkGetCommunityMemberships(id))
          if (id) await dispatch(communityActions.thunkGetDetailsById(id))
          else return
        }

        fetchData()

    }, [dispatch, id])

    useEffect( () => {

        async function fetchData() {
            let response
            if (singleCommunity.id) response = await dispatch(communityActions.thunkUpdateCommunities(singleCommunity.id, data1))
            if (response) {
                history.push(`/communities/${response.id}/:page`)
                setIsVisible(!isVisible)
            }

        }
        fetchData()

    }, [dispatch, data1])


    const handleSubmit = async () => {

        if (about) {
            setData1({
                name: singleCommunityName,
                about,
             })

        }


    }

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


    let createdAt
    if (Object.values(singleCommunity).length) createdAt = new Date(singleCommunity.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    let style
    if (singleCommunity.CommunityStyle) style = singleCommunity.CommunityStyle

    return (
        <>
       {!location.pathname.includes("/communities2/") ? <div className="home-section">
            <div style={{ backgroundColor: `${style?.base}`}} id="cs-background">
                <p>About Community</p>
                { user && singleCommunity.userId === user.id ? <p onClick={((e) => history.push(`/communities/${id}/mod`))} id="seven"><span id="tools">
                    <i class="fi fi-rs-shield"></i>MOD TOOLS</span><i class="fi fi-rr-menu-dots"></i></p> : <i onClick={(() => window.alert("Feature not available"))} id="comm-sets" class="fi fi-rr-menu-dots"></i>}
            </div>
            <div id="home-section">
            <div id="cs-side1">
                { location.pathname.includes("/posts/") && !singleCommunity.CommunityStyle?.icon ? <div onClick={(() => history.push( `/communities/${singleCommunity.id}/:page`))} style={{ padding: "4% 0%", alignItems: "center", display: "flex", gap: "5px"}} ><div style={{ fontSize: "30px", color: "white", backgroundColor: `${style?.base}`}} id="pfp100">/l</div><span style={{ fontWeight: "900"}}>/l {singleCommunity.name}</span></div> : null}
                { location.pathname.includes("/posts/") && singleCommunity.CommunityStyle?.icon ? <div onClick={(() => history.push( `/communities/${singleCommunity.id}/:page`))} style={{ padding: "4% 0%", alignItems: "center", display: "flex", gap: "5px"}} ><img src={singleCommunity.CommunityStyle?.icon} id="pfp100"></img><span style={{ fontWeight: "900"}}>/l {singleCommunity.name}</span></div> : null}
                {!singleCommunity.about && !isVisible ? <button onClick={(() => setIsVisible(!isVisible))} id="add-about">Add description</button> : null}
                {isVisible ? <div style={{ borderColor: `${style?.highlight}`}} className="about-edit">
                <input maxLength={500} defaultValue={singleCommunity?.about} onChange={((e) => setAbout(e.target.value))} placeholder="Tell us about your community" id="input-about" type="text"></input>
                <div id="edit-about"><span>{500 - about.length} Characters remaining</span><div><span onClick={(() => setIsVisible(!isVisible))}>Cancel</span><span style={{ color: `${style?.highlight}`}} onClick={handleSubmit}>Save</span></div></div>
                </div> : null}
                { !location.pathname.includes("/posts/") && user && singleCommunity.about && !isVisible ? <span style={{  borderColor: `${style?.highlight}`}} id={user.id === singleCommunity.userId ? "can-you-edit" : ""} onClick={(() => setIsVisible(!isVisible))}>{singleCommunity.about}{user.id === singleCommunity.userId ? <i style={{ color: `${style?.highlight}`}} id="edit-icon4" class="fi fi-rr-magic-wand"></i> : null} </span> : null}
                { location.pathname.includes("/posts/") && user && singleCommunity.about ? <span style={{ marginBottom: "5px"}} >{singleCommunity.about}</span> : null}

                { !user && singleCommunity.about ?  <span>{singleCommunity.about}</span> : null}
                <span><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
                { (singleCommunity.type === "Restricted" || singleCommunity.type === "Private") && <span><i class="fi fi-rs-crossed-eye"></i>{singleCommunity.type}</span>}
            </div>
            <div id="line"></div>
            <div id="cs-side2">
                <span><div id="online">{singleCommunity.CommunityMembers}</div>{ singleCommunity.id === 10 ? "Lovers" : "Members"}</span>
                <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>{ singleCommunity.id === 10 ? "Online Lovers" : "Online"}</span>
            </div>
            { singleCommunity.userId === user?.id &&
            <>
            <div id="line"></div>
            <div onClick={(() => window.alert("Feature not available"))} id="cs-side3">
                <span><div>NEW</div>Community topics<i class="fi fi-rr-circle-i"></i></span>
                <span style={{ color: `${style?.highlight}`}}>Add a Primary Topic<i class="fa-solid fa-chevron-down"></i></span>
            </div>
            </>
            }
            <div id="line"></div>
            { user ? <button style={{ backgroundColor: `${style?.highlight}`}} onClick={(() => history.push(`/posts/new/${singleCommunity.id}`))} id="but3">{ singleCommunity.type !== "Public" && singleCommunity.userId !== user.id && !approved ? "Draft Post" : "Create Post"}</button> : <button style={{ backgroundColor: `${style?.highlight}`}} onClick={(() => setModalContent(<SignupFormModal />))} id="but3">Create Post</button>}
            <div id="line"></div>
            <div id="cs-side5">
                <span onClick={(() => window.alert("Feature not available"))}>COMMUNITY OPTIONS</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            </div>

            </div> :
            <div className="home-section">
            <div style={{ backgroundColor: `${base}`}} id="cs-background">
                <p>About Community</p>
                { user && singleCommunity.userId === user.id ? <p onClick={((e) => history.push(`/communities/${id}/mod`))} id="seven"><span id="tools">
                    <i class="fi fi-rs-shield"></i>MOD TOOLS</span><i class="fi fi-rr-menu-dots"></i></p> : <i onClick={(() => window.alert("Feature not available"))} id="comm-sets" class="fi fi-rr-menu-dots"></i>}
            </div>
            <div id="home-section">
            <div id="cs-side1">
                {!singleCommunity.about && !isVisible ? <button onClick={(() => setIsVisible(!isVisible))} id="add-about">Add description</button> : null}
                {isVisible ? <div style={{ borderColor: `${highlight}`}} className="about-edit">
                <input maxLength={500} defaultValue={singleCommunity?.about} onChange={((e) => setAbout(e.target.value))} placeholder="Tell us about your community" id="input-about" type="text"></input>
                <div id="edit-about"><span>{500 - about.length} Characters remaining</span><div><span onClick={(() => setIsVisible(!isVisible))}>Cancel</span><span style={{ color: `${highlight}`}} onClick={handleSubmit}>Save</span></div></div>
                </div> : null}
                { user && singleCommunity.about && !isVisible ? <span style={{  borderColor: `${style.highlight}`}} id={user.id === singleCommunity.userId ? "can-you-edit" : ""} onClick={(() => setIsVisible(!isVisible))}>{singleCommunity.about}{user.id === singleCommunity.userId ? <i style={{ color: `${style.highlight}`}} id="edit-icon4" class="fi fi-rr-magic-wand"></i> : null} </span> : null}
                { !user && singleCommunity.about ?  <span>{singleCommunity.about}</span> : null}
                <span><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
                { (singleCommunity.type === "Restricted" || singleCommunity.type === "Private") && <span><i class="fi fi-rs-crossed-eye"></i>{singleCommunity.type}</span>}
            </div>
            <div id="line"></div>
            <div id="cs-side2">
                <span><div id="online">{singleCommunity.CommunityMembers}</div>Members</span>
                <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
            </div>
            <div id="line"></div>
            <div onClick={(() => window.alert("Feature not available"))} id="cs-side3">
                <span><div>NEW</div>Community topics<i class="fi fi-rr-circle-i"></i></span>
                <span style={{ color: `${highlight}`}}>Add a Primary Topic<i class="fa-solid fa-chevron-down"></i></span>
            </div>
            <div id="line"></div>
            { user ? <button style={{ backgroundColor: `${highlight}`}} onClick={(() => history.push(`/posts/new/${singleCommunity.id}`))} id="but3">{ singleCommunity && singleCommunity.type !== "Public" || !approved || singleCommunity.userId !== user.id? "Draft Post" : "Create Post"}</button> : <button style={{ backgroundColor: `${style.highlight}`}} onClick={(() => setModalContent(<SignupFormModal />))} id="but3">Create Post</button>}
            <div id="line"></div>
            <div id="cs-side5">
                <span onClick={(() => window.alert("Feature not available"))}>COMMUNITY OPTIONS</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            </div>

            </div>
            }
        </>
    )
}

export default YourCommunitesProfile
