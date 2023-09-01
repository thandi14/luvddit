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
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


function CreatePost() {
  const { communities, singleCommunity, userCommunities, communityMemberships } = useSelector((state) => state.communities)
  const { user } = useSelector((state) => state.session)
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const targetRef = useRef(null);
  const [ comms, setComms ] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()


    useEffect(() => {
     window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);



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

    useEffect(() => {

        const handleDocumentClick = (event) => {
            console.log(targetRef)
            if (targetRef.current && !targetRef.current.contains(event.target)) {
                setIsVisible(false);
                setIsVisible2(false)
            }
        };


          document.addEventListener('click', handleDocumentClick);
          return () => {
              document.removeEventListener('click', handleDocumentClick);
          };

      }, []);


    useEffect(() => {
        if (window.performance && performance.navigation.type !== 1) {
          // Page is visited for the first time, reload it
          history.go(0);
        }
    }, [history]);

    let idName = isVisible ? "search2" : "hidden";
    let idName2 = !isVisible ? "choose-comms3" : "choose-comms1";

    let community = Object.values(singleCommunity)
    let memberships = Object.values(communityMemberships)
    if (memberships.filter((m) => m.communityId == singleCommunity.id).length) community = Object.values(singleCommunity)

    console.log(singleCommunity)
    return (
        <div className="create-post-page">
            <div className="create-post">
                <div id="cp-title">
                <h3>Create a post</h3>
                <div>
                {singleCommunity.name && singleCommunity.name !== user.username ? <div>
                <span>COLLECETIONS</span>
                <p>0</p>
                </div> : null}
                <div>
                <span>DRAFTS</span>
                <p>0</p>
                </div>
                </div>
                </div>
                <div id='border2'></div>
                <div ref={targetRef} className="search-comms">
                {!isVisible && !isVisible2 ?
                 <div onClick={handleClick} id="choose-comms">
                 {community && community.length ? community[9] && singleCommunity.name !== user.username ? community[9][0]?.profile ? <img id="pfp30" src={community[9][0]?.profile}></img> : <div id="nav-comms90">l/</div>: <img src={avatar}></img> : <i class="fi fi-rr-circle-dashed"></i>}
                 <input onChange={((e) => setComms(e.target.value))} defaultValue={singleCommunity.name ? `l/${singleCommunity.name}` : ""} placeholder="Choose your community"></input>
                 <i onClick={handleClick} class="fa-solid fa-chevron-down"></i>
                 </div>
                :
                <div id={idName2}>
                <i class="fi fi-rs-search-heart"></i>
                <input id="input-button" onChange={((e) => setComms(e.target.value))} text="type" defaultValue={singleCommunity ? `l/${singleCommunity.name}` : ""} placeholder="Search communities"></input>
                <i  onClick={handleClick2} class="fa-solid fa-chevron-down"></i>
                </div>}
                <div id={idName}>
                    <CommunitiesMenu value={isVisible} />
                </div>
                </div>
                <PostForm />
            </div>
            <div className="posting-on-l">
                { community.length ? <CommunitiesProfile community={singleCommunity} page={'create'}/> : null }
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
