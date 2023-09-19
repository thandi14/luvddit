import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect, useRef } from "react"
import * as communityActions from "../../store/communities"
import CreateCommunity from "../CreateCommunityModel"
import { useModal } from "../../context/Modal"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom"
import { MenuContext } from "../../context/Menu";
import { useContext } from "react";

function CommunitiesMenu({ value }) {
    const { communities, singleCommunity, userCommunities, communityMemberships, memberships } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const { setModalContent } = useModal()
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);
    const targetRef = useRef(null);
    const location = useLocation()
    const targetRef2 = useRef(null);
    const [ comms, setComms ] = useState(singleCommunity.name)
    const [ comms2, setComms2 ] = useState(null)
    const history = useHistory()
    const { menuOpen, toggleMenu } = useContext(MenuContext);
    let idName = !isVisible ? "search2" : "hidden";
    let idName2 =  "choose-comms1";
    let search = isVisible ? "hidden" : "search-comms"



    useEffect( () => {
        async function fetchData() {
           // if (!location.pathname.includes("posts/new/")) {

            let data
            if (id) data = await dispatch(communityActions.thunkGetDetailsById(id))
          // }
        }
        fetchData();
        setComms(singleCommunity.name)

    }, [dispatch, id])

    console.log(id)

    let community = Object.values(communities).filter((c) => c.type === "Profile" && c.userId === user.id)[0]
    let community2 = Object.values(memberships)
    let community3

   if (comms2) community2 = Object.values(community2).filter((c) => c.name.toLowerCase().includes(comms2.toLowerCase()))
   if (comms2) community3 = Object.values(community2).filter((c) => c.name.toLowerCase().includes(comms2.toLowerCase()))
   if (!community2.length) community2 = Object.values(memberships)


    const handleClick = () => {
        console.log("helo")
        setIsVisible(!isVisible);
        setIsVisible2(!isVisible2);

      };

      const handleClick2 = () => {
        setIsVisible(!isVisible);

     }

     useEffect(() => {
        const handleDocumentClick = (event) => {
          if (!(targetRef.current && targetRef.current.contains(event.target)) && !(targetRef2.current && targetRef2.current.contains(event.target))) {
            setIsVisible(true);
          }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
      }, []);


    console.log(isVisible)
    let style
    if (singleCommunity.CommunityStyle) style = singleCommunity.CommunityStyle

    return (
        <>
        {/* {isVisible ? */}
                {/* //  <div onClick={handleClick} id="choose-comms">
                //  {!singleCommunity.name ? <i class="fi fi-rr-circle-dashed"></i> : null}
                //  {singleCommunity.name && !singleCommunity.CommunityStyle && singleCommunity.type === "Profile" ? <img src={avatar}></img> : null }
                //  {singleCommunity.name && singleCommunity.CommunityStyle && singleCommunity.CommunityStyle.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle.icon}></img> : null }
                //  {singleCommunity.name && singleCommunity.CommunityStyle && singleCommunity.CommunityStyle.base && !singleCommunity.CommunityStyle.icon ? <div style={{ backgroundColor: `${singleCommunity.CommunityStyle.base}`}} id="nav-comms90">l/</div> : null}
                //  <input onChange={((e) => setComms(e.target.value))} defaultValue={singleCommunity.name ? `l/${singleCommunity.name}` : ""} placeholder="Choose your community"></input>
                //  <i onClick={handleClick} class="fa-solid fa-chevron-down"></i>
                //  <div id="div2"></div>
                //  </div>
            // : */}
        <div >
        <div
        ref={targetRef2}
        onClick={handleClick} style={{ display: !isVisible ? "none" : ""}} id={"choose-comms"}>
        {!singleCommunity.name ? <i class="fi fi-rr-circle-dashed"></i> : null}
        {singleCommunity.name && !singleCommunity.CommunityStyle && singleCommunity.type === "Profile" ? <img src={avatar}></img> : null }
        {singleCommunity.name && singleCommunity.CommunityStyle && singleCommunity.CommunityStyle.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle.icon}></img> : null }
        {singleCommunity.name && singleCommunity.CommunityStyle && singleCommunity.CommunityStyle.base && !singleCommunity.CommunityStyle.icon ? <div style={{ backgroundColor: `${singleCommunity.CommunityStyle.base}`}} id="nav-comms90">l/</div> : null}
        <input onChange={((e) => setComms(e.target.value))} defaultValue={comms ? `l/${comms}` : ""} placeholder="Choose your community"></input>
        <i onClick={handleClick} class="fa-solid fa-chevron-down"></i>
        <div id="div2"></div>
        </div>
        <div ref={targetRef}
        style={{ display: isVisible ? "none" : ""}}
        className="search-comms">
        <div id={idName}>
        <div id={idName2}>
        <i class="fi fi-rs-search-heart"></i>
        { !isVisible && <input  id="input-button" onChange={((e) => setComms2(e.target.value))} text="type" defaultValue={comms ? `l/${comms}` : ""} placeholder="Search communities"></input>}
        <i  onClick={handleClick2} class="fa-solid fa-chevron-down"></i>
        </div>
        <div id="new-m">
        {/* <div style={{ height: "300px", borderBox: "box-sizing"}} id="border5"></div> */}
        <div id="your-comms">
            {!comms2 || community3?.length ?
            <>
            <p>Your Profile</p>
            <div onClick={((e) => {
                setId(community.id)
                setIsVisible(true)
                })} id="user-community">
            <div id='uc-img'>
            { !user.Community.CommunityStyle?.icon ? <img src={avatar}></img> : null }
            { user.Community.CommunityStyle?.icon ? <img src={user.Community.CommunityStyle?.icon}></img> : null }

            </div>
            <div id="uc-name">
            <p>u/{community?.name}</p>
            </div>
            </div>
            </>
            :
            <div
            id="none-comm3"
            >
            <span
            style={{ fontSize: "14px", color: "#878A8C"}}
            >No communities found</span>
            </div>
            }
            <div id="div2"></div>
            <div id="your-comms5">
                <p>Your communities<span onClick={(() => setModalContent(<CreateCommunity />))} style={{ color: `${singleCommunity.CommunityStyle?.base}`}}>Create New</span></p>
                {community2.map((u) =>
                     <div onClick={((e) => {
                        setId(u.id)
                        setIsVisible(true)
                        })} id="all-user-comms">
                        {u.CommunityStyle.icon ? <img id="PFP34" src={u.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${u.CommunityStyle?.base}`}} id="all-comms-pfp">l/</div>}
                        <p>l/{u?.name}</p>
                    </div>
                )}
            </div>
        </div>
        </div>
        {/* <div id="border5">

        </div> */}
            </div>
        </div>
        </div>
        </>
    )
}

export default CommunitiesMenu
