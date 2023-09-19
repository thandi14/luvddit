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

function SearchProfiles() {
    const { posts, singlePost, communityPosts } = useSelector((state) => state.posts);
    const { communities, memberships, searchProfiles } = useSelector((state) => state.communities);

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

    let top = isVisible ? "top" : "down";

    useEffect(() => {
      localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage, search]);

    const handleButtonClick = () => {
      document.getElementById('nfo').focus(); // Assuming your input has an id of 'myInput'
    };


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
        if (!search) dispatch(communitiesActions.thunkGetAllSearchedProfiles(currentPage)); // Fetch posts for the specified page
        if (search) dispatch(communitiesActions.thunkGetAllSearched3Communitites(currentPage, search));

      }
    }


    useEffect(() => {
      if (!search) dispatch(communitiesActions.thunkGetAllSearchedProfiles(page)); // Fetch posts for the specified page
      if (search) dispatch(communitiesActions.thunkGetAllSearched3Communitites(page, search)); // Fetch posts for the specified page
    }, [dispatch, page, search]);



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

    let eCommunity = Object.values(searchProfiles).filter((c) => c.type === "Profile").reverse().sort((a, b) => a.createdAt - b.createdAt)
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

      const myMemberships = Object.values(memberships)


    return (
        <div className="splashPage">
            <div style={{ gap: "0px", width: "100%"}} className="posts">
                <div style={{ height: "72px", width: "59%" }} >
                <div id="pick-search">
                    <button onClick={(() => history.push(`/search/:page/${search}`))} >Posts</button>
                    <button onClick={(() => history.push(`/search/comments/:page/${search}`))}>Comments</button>
                    <button onClick={(() => history.push(`/search/communities/:page/${search}`))}>Communities</button>
                    <button id="picked-S" onClick={(() => history.push(`/search/profiles/:page/${search}`))}>People</button>
                </div>
                </div>
                { eCommunity.length > 0 && eCommunity?.map((community, i) =>
                    <div onClick={(() => history.push(`/profile2/${community.userId}/:page`))}  style={{ borderRadius: "0%", alignItems: "center", height: "80px"}} id={`${community.id}`} className="post-content">
                    <div style={{ marginLeft: "1.5%"}}></div>
                    {community.CommunityStyle?.icon ? <img id="community-icon" style={{ margin: "0%" }}  src={community.CommunityStyle?.icon}></img> : <img id="community-icon" style={{ margin: "0%" }}  src={avatar}></img>}
                    <div style={{ margin: "1% 0%"}} id="pc-side2">
                    <div style={{ width: "100%"}}>
                    <div style={{ marginLeft: "1%", position: "relative"}} id="nameOf">
                    <span style={{ fontWeight: "500"}} onClick={(() => history.push(`/profile2/${community.userId}/:page`))} className="userName" id="community">u/{community.name}</span>
                    <p>·</p>
                    <p > {community.User.karma} Karma </p>
                    <button onClick={((e) => {
                      e.stopPropagation()
                      window.alert("Feature not available")
                      })}id="follow3">
                      Follow
                    </button>
                    </div>
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

export default SearchProfiles
