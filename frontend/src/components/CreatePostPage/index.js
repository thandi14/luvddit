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
import { MenuContext } from "../../context/Menu";
import { useContext } from "react";


function CreatePost() {
  const { communities, singleCommunity, userCommunities, communityMemberships } = useSelector((state) => state.communities)
  const { user } = useSelector((state) => state.session)
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  const [ comms, setComms ] = useState("")
  const [ comms2, setComms2 ] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const { menuOpen, toggleMenu } = useContext(MenuContext);

  let members = Object.values(communityMemberships)


    useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    useEffect(() => {

        setComms2(singleCommunity.name)
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

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if (targetRef.current && !targetRef.current.contains(event.target)) {
                setIsVisible(false);
                setIsVisible2(false)
            }

            if (targetRef2.current && !targetRef2.current.contains(event.target)) {
                setIsVisible(false);
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

    let idName = "search2" ;
    let idName2 = !isVisible ? "choose-comms3" : "choose-comms1";

    let community = Object.values(singleCommunity)
    let memberships = Object.values(communityMemberships)
    if (memberships.filter((m) => m.communityId == singleCommunity.id).length) community = Object.values(singleCommunity)




    return (
        <div className="create-post-page">
            <div className="create-post">
                <div id="cp-title">
                <h3>Create a post</h3>
                <div onClick={(() => window.alert("Feature not available"))}>
                {singleCommunity.name && singleCommunity.name !== user.username ? <div style={{width: "140px"}}>
                <span style={{ color: `${singleCommunity.CommunityStyle?.highlight}`}} >COLLECTIONS</span>
                <p>0</p>
                </div> : null}

                <div  style={{width: "100px"}} onClick={(() => window.alert("Feature not available"))}>
                <span  style={{ color: `${singleCommunity.CommunityStyle?.highlight}`}} >DRAFTS</span>
                <p>0</p>
                </div>

                </div>
                </div>
                    {/* <div id='border2'></div>
                <div ref={targetRef} className="search-comms"> */}

                {/* <div id={idName}> */}
                    <CommunitiesMenu />
                {/* </div>
                </div> */}
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
