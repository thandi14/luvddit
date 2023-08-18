import "./CreatePostPage.css"
import CommunitiesMenu from "./communites";
import PostForm from "./form"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector";
import avatar from "./IMG6.jpg"
import avatar2 from './Unknown2.jpg'
import CommunitiesProfile from "./communites2";
import { useDispatch } from "react-redux";
import * as communityActions from "../../store/communities"


function CreatePost() {
  const { communities, singleCommunity, userCommunities, communityMemberships } = useSelector((state) => state.communities)
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const targetRef = useRef(null);
  const [ comms, setComms ] = useState("")
  const dispatch = useDispatch()
  const [initial, setInitial] = useState(singleCommunity.name);


    useEffect(() => {
    setInitial(singleCommunity.name)

    }, [singleCommunity]);

    const handleClick = () => {
      setIsVisible(!isVisible);
      setIsVisible2(!isVisible2);

    };

    const handleClick2 = () => {
       setIsVisible(!isVisible);

    }

    useEffect(() => {
        dispatch(communityActions.thunkGetUserCommunities())
    }, [])

    const handleDocumentClick = (event) => {
        if (targetRef.current && !targetRef.current.contains(event.target)) {
            setIsVisible(false);
            setIsVisible2(false)
        }
    };

    // useEffect(() => {

    //     // Reload the page when it is loaded


    // }, []);

    let idName = isVisible ? "search2" : "hidden";
    let idName2 = !isVisible ? "choose-comms3" : "choose-comms1";

    let community = Object.values(singleCommunity)
    let memberships = Object.values(communityMemberships)
    if (memberships.filter((m) => m.communityId == singleCommunity.id).length) community = Object.values(singleCommunity)


    console.log(memberships.filter((m) => m.communityId == singleCommunity.id))

    return (
        <div className="create-post-page">
            <div className="create-post">
                <div id="cp-title">
                <h3>Create a post</h3>
                <div>
                <span>DRAFTS</span>
                <p>0</p>
                </div>
                </div>
                <div id='border2'></div>
                <div ref={targetRef} className="search-comms">
                {!isVisible && !isVisible2 ?
                 <div onClick={handleClick} id="choose-comms">
                 {community.length ? <img src={avatar}></img> : <i class="fi fi-rr-circle-dashed"></i>}
                 <input onChange={((e) => setComms(e.target.value))} defaultValue={community.length ? `l/${community[2]}` : null} placeholder="Choose your community"></input>
                 <i onClick={handleClick} class="fa-solid fa-chevron-down"></i>
                 </div>
                :
                <div id={idName2}>
                <i class="fi fi-rs-search-heart"></i>
                <input id="input-button" onChange={((e) => setComms(e.target.value))} text="type" defaultValue={initial ? `l/${initial}` : ""} placeholder="Search communities"></input>
                <i  onClick={handleClick2} class="fa-solid fa-chevron-down"></i>
                </div>}
                <div id={idName}>
                    <CommunitiesMenu value={isVisible} />
                </div>
                </div>
                <PostForm />
            </div>
            <div className="posting-on-l">
                { community.length ? <CommunitiesProfile page={'create'}/> : null }
                <div id="posting-on-l">
                    <div id="pols">
                    <img src={avatar2}></img>
                    <h3>Posting to luvddit</h3>
                    </div>
                <div id="border9"></div>
                <p>1. Remember the human </p>
                <div id="border9"></div>
                <p>2. Behave like you would in real life</p>
                <div id="border9"></div>
                <p>3. Look for the original source of content</p>
                <div id="border9"></div>
                <p>4. Search for duplicates before posting</p>
                <div id="border9"></div>
                <p>5. Read the communities rules</p>
                <div id="border9"></div>
                </div>
                <h4>Please be mindful of luvddit's <span>content policy</span> and practice good <span>luvddiquette.</span></h4>
            </div>
        </div>
    )
}

export default CreatePost
