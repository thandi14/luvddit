import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import * as communitiesActions from "../../store/communities"
import '../HomePage/HomePage.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import PostPageModal from '../PostPage/PostPageModal'
import { useModal } from '../../context/Modal'
import CreateCommunity from '../CreateCommunityModel'
import PostLikes from '../HomePage/likes'
import "./SearchPage.css"
import avatar from './IMG6.jpg'
import alien from "./searchingavatar.png"
import { useSearch } from '../../context/search'
import teleAlien from "./telescopeA.png"

function SearchCommunities() {
    const { posts, singlePost, communityPosts } = useSelector((state) => state.posts);
    const { communities, memberships, searchCommunities } = useSelector((state) => state.communities);

    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [ votePost, setVotePost ] = useState(null);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const { search } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const [ communityId, setCommunityId ] = useState(null)

    const handleButtonClick = () => {
      document.getElementById('nfo').focus(); // Assuming your input has an id of 'myInput'
    };


    let top = isVisible ? "top" : "down";

    useEffect(() => {
      localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage, search]);

    useEffect(() => {

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, [currentPage, search]);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - threshold) {
        const storedCurrentPage = localStorage.getItem("currentPage");

        setCurrentPage(currentPage + 1);
        setThreshold(threshold + 200);
        if (!search) dispatch(communitiesActions.thunkGetAllSearchedCommunitites(currentPage)); // Fetch posts for the specified page
        if (search) dispatch(communitiesActions.thunkGetAllSearched2Communitites(currentPage, search)); //

      }
    }

    useEffect(() => {
      if (!search) dispatch(communitiesActions.thunkGetAllSearchedCommunitites(page)); // Fetch posts for the specified page
      if (search) dispatch(communitiesActions.thunkGetAllSearched2Communitites(page, search)); // Fetch posts for the specified page

    }, [dispatch, page, search]);

    const handleJoinClick = async (e) => {
      e.stopPropagation()
      let response
     // joined = true
      await dispatch(communitiesActions.thunkJoinCommunities(communityId, "Unapproved"))

    }

    const handleUnjoinClick = async (e) => {
      e.stopPropagation()
      let response
     // joined = false
      response = await dispatch(communitiesActions.thunkUnjoinCommunities(communityId))
    }





    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY < 450) {
            setIsVisible2(false)

        }
        else if (window.scrollY > 460) {
          setIsVisible(true);
          setIsVisible2(true);

        } else {
          setIsVisible(false);

        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


    }, [])


    let eCommunity = Object.values(searchCommunities).filter((c) => c.type === "Public" || c.type === "Restricted").reverse().sort((a, b) => a.createdAt - b.createdAt)
    if (!search) eCommunity = []
    if (search) eCommunity = eCommunity.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    if (!eCommunity.length && search) eCommunity = []


    let recent = []

    let cm = Object.values(memberships)

    // for (let c of cm ) {
    //   for ( let p of c.Posts ) recent.push(p)
    // }

   recent = recent.reverse().sort((a, b) => a.createdAt - b.createdAt)

   recent = recent.slice(0, 5)

   const myMemberships = Object.values(memberships)

    return (
        <div className="splashPage">
            <div style={{ gap: "0px", width: "100%"}} className="posts">
                <div style={{ height: "72px", width: "59%" }} >
                <div id="pick-search">
                    <button onClick={(() => history.push(`/search/:page/${search}`))} >Posts</button>
                    <button onClick={(() => history.push(`/search/comments/:page/${search}`))}>Comments</button>
                    <button id="picked-S">Communities</button>
                    <button onClick={(() => history.push(`/search/profiles/:page/${search}`))}>People</button>
                </div>
                </div>
                { eCommunity.length > 0 && eCommunity?.map((community, i) =>
                    <div onClick={(() => {
                      history.push(`/communities/${community.id}/:page`)
                      })} style={{ borderRadius: "0%", alignItems: "center", height: "80px"}} id={`${community.id}`} className="post-content">
                    <div style={{ marginLeft: "1.5%"}}></div>
                    {community.CommunityStyle?.icon ? <img id="community-icon" style={{ margin: "0%" }}  src={community.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${community.CommunityStyle?.base}`, color: "white", width: "35px", height: "35px", fontSize: "26px", marginRight: "1%" }} id="pfp30">l/</div>}
                    <div style={{ margin: "1% 0%"}} id="pc-side2">
                    <div style={{ width: "100%", position: "relative", display: "flex", alignItems: "center"}}>
                        <div>
                    <div style={{ marginLeft: "1%"}} id="nameOf">
                    <span style={{ fontWeight: "500", whiteSpace: "nowrap"}} onClick={(() => history.push(`/communities/${community.id}/:page`))} className="userName" id="community">l/{community.name}</span>
                    <p>·</p>
                    <p style={{ whiteSpace: "nowrap"}}> {community.CommunityMembers} {community.CommunityMembers === 1 ? "member" : "members"} </p>
                    </div>
                    { community.about && <p id="c-about"> {community.about} </p>}
                        </div>
                    { !myMemberships.some((m) => m.userId === user?.id) ? <button onClick={((e) => {
                      e.stopPropagation()
                      if (!user) return window.alert("Please login")
                      dispatch(communitiesActions.thunkJoinCommunities(community.id))
                      })} id="follow3">
                      Join
                    </button>
                    :
                    <button onClick={((e) => {
                      e.stopPropagation()
                      dispatch(communitiesActions.thunkUnjoinCommunities(community.id))
                      })} id="follow3">
                     Unjoin
                    </button>
                    }
                    </div>
                    </div>
                    <div style={{ marginRight: "1.5%"}}></div>
                    </div>
                )}
                 { !eCommunity.length && <div id="none-hereS" >
                    <img style={{ height: "130px", width: "130px"}} src={teleAlien}></img>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>Hm... we couldnt find any results for</span>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>"{search}"</span>
                    <span style={{ fontSize: "14px", width: "100%", textAlign: "center"}}>Double-check your spelling or try different keywords to <span onClick={handleButtonClick} style={{ color: "#0079D3", cursor: "pointer" }} >adjust your search</span></span>
                </div> }
            </div>
        </div>
    )
}

export default SearchCommunities
