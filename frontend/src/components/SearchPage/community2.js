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
import * as commentActions from '../../store/comments'
import { useSearch } from '../../context/search'
import teleAlien from "./telescopeA.png"
import YourCommunitesProfile from '../CommunityPage/communites3'

function SearchCommunityComments() {
    const { posts, singlePost, postsHistory } = useSelector((state) => state.posts);
    const { communities, memberships, singleCommunity, searchComments } = useSelector((state) => state.communities);
    const { postComments } = useSelector((state) => state.comments)
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
    const { id } = useParams();
    const targetRef = useRef()
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const { search } = useParams()


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
        if (search && id) dispatch(communitiesActions.thunkGetSearchedCommunitiyComments(id, currentPage, search));

      }
    }

    useEffect(() => {
      // Fetch comments when page changes
      if (search && id) dispatch(communitiesActions.thunkGetSearchedCommunitiyComments(id, page, search));
    }, [dispatch, page, search]);



  useEffect(() => {

    async function fetchData() {
      let data
      if (user) data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
      }
      fetchData()

  }, [dispatch, posts, user])

  useEffect(() => {
    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetAllPosts())
      }
      fetchData()
  }, [singlePost.Comments])

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


    if (!search ) eComment = []
    let eComment = Object.values(searchComments).reverse().sort((a, b) => a.createdAt - b.createdAt)
    if (search) eComment = eComment.filter((c) => c.comment.toLowerCase().includes(search.toLowerCase()))
    if (!eComment.length && search ) eComment = []

    let recent = []

    let cm = Object.values(memberships)

    // for (let c of cm ) {
    //   for ( let p of c.Posts ) recent.push(p)
    // }

   recent = recent.reverse().sort((a, b) => a.createdAt - b.createdAt)

   recent = recent.slice(0, 5)

   const handleButtonClick = () => {
    document.getElementById('nfo').focus(); // Assuming your input has an id of 'myInput'
  };



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
            <div className="posts">
                <div style={{ height: "92px", width: "100%" }} >
                <div id="pick-search">
                <button onClick={(() => history.push(`/search2/community/${singleCommunity.id}/:page/${search}`))} >Posts</button>
                    <button id="picked-S" onClick={(() => history.push(`/search2/comments/${singleCommunity.id}/:page/${search}`))}>Comments</button>
                    <span style={{ cursor: "pointer", display: "flex", gap: "5px", }}>Show results from <span onClick={(() => history.push(`/search/:page/${search}`))} style={{ fontWeight: "900", color: "#0079D3" }}>all of luvddit</span><i onClick={(() => history.push(`/search/:page/${search}`))} style={{ height: "20px", fontSize: "20px", color: "#0079D3"}} class="fi fi-rr-arrow-right"></i></span>
                </div>
                <div onClick={(() => window.alert("Feature not available"))} id="pick-sort">
                    <button>Sort<i style={{ fontSize: "12px"}} class="fa-solid fa-chevron-down"></i></button>
                </div>
                </div>
                { eComment.length > 0 && eComment?.map((comment, i) =>
                    <div style={{ borderRadius: "0%"}} id={`${comment.id}`} className="post-content">
                    <div style={{ marginLeft: "0.5%"}}></div>
                    <div style={{ margin: "1% 0%"}} id="pc-side2">
                    <div style={{ width: "100%"}}>
                    <div style={{ marginLeft: "1%"}} id="nameOf">
                    {comment.Post.Community?.CommunityStyle?.icon ? <img style={{ margin: "0%" }} onClick={(() => setModalContent(<PostPageModal postId={comment.Post?.id} scroll={false} />))} src={comment.Post.Community?.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${comment.Post?.Community?.CommunityStyle?.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={comment.Post?.id} scroll={false} />))} id="pfp30">l/</div>}
                    <span style={{ fontWeight: "500"}} onClick={(() => history.push(`/communities/${comment.Post?.communityId}/:page`))} className="userName" id="community">l/{comment?.Post?.Community?.name}</span>
                    <p>·</p>
                    <p >Posted by <span onClick={(() => {
                     if (comment.Post.userId === user?.id) history.push(`/profile/${comment.Post.userId}/:page`)
                     if (comment.Post.userId !== user?.id) history.push(`/profile2/${comment.Post.userId}/:page`)
                    })} className="userName">u/{comment.Post?.User?.username}</span> {getTimeDifferenceString(comment.Post?.createdAt)}</p>
                    </div>
                    <h3  style={{ padding: "0px", margin: "0px" , marginBottom: "1%", marginLeft: "0%"}} onClick={(() => setModalContent(<PostPageModal postId={comment.Post.id} scroll={false} />))} id="title"><h3 style={{ fontSize: "12px", color: "#979798" }} id="title-content">{comment.Post?.title}</h3></h3>
                    <div style={{ marginBottom: "10px", marginLeft: "18px", marginRight: "18px"}} onClick={(() => setModalContent(<PostPageModal postId={comment.Post?.id} scroll={false} />))} id="content30">
                    { !comment.User.Communities?.length || !comment.User.Communities[0].CommunityStyle?.icon ? <img id="pfp30" src={avatar}></img> : null}
                    { comment.User.Communities?.length && comment.User.Communities[0].CommunityStyle?.icon ? <img id="pfp30" src={comment.User.Communities[0].CommunityStyle?.icon}></img> : null}
                    <div style={{ display: "flex", gap: "10px", flexDirection: "column"}}>
                    <span style={{ height: "10px", padding: "0px", gap: "3px", fontSize: "12px", fontWeight: "900", display: "flex", alignItems: "center"}} ><span id="underl-name" onClick={((e) => {
                      e.stopPropagation()
                     if (comment.userId === user?.id) history.push(`/profile/${comment.userId}/:page`)
                     if (comment.userId !== user?.id) history.push(`/profile2/${comment.userId}/:page`)
                    })}>{comment.User?.username}</span><p style={{textDecoration: "none"}} >·</p><span style={{ textDecoration: "none", color: "rgb(151, 151, 152)"}}>{getTimeDifferenceString(comment.createdAt)}</span></span>
                    {comment.comment}
                    <span style={{ margin: "0px"}} id="c-votes">{comment.Votes?.length} upvotes</span>
                    </div>
                    </div>
                    </div>
                    <span id="thread" onClick={(() => setModalContent(<PostPageModal postId={comment.Post?.id} scroll={true} />))} style={{ color: "#0079D3", height: "30px", fontSize: "12px", marginLeft: "18px", display: "flex" }} >Go to thread</span>
                    <div id="post-extras50" >
                        <span>{comment.Post?.Votes?.length} upvotes</span>
                        <span>{comment.Post?.Comments?.length} comments</span>
                        <span>0 awards</span>

                    </div>
                    </div>
                    <div style={{ marginRight: "0.5%"}}></div>
                    </div>
                )}
                 { !eComment.length && <div id="none-hereS" >
                    <img style={{ height: "130px", width: "130px"}} src={teleAlien}></img>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>Hm... we couldnt find any results for</span>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>"{search}"</span>
                    <span style={{ fontSize: "14px", width: "100%", textAlign: "center"}}>Double-check your spelling or try different keywords to <span onClick={handleButtonClick} style={{ color: "#0079D3", cursor: "pointer" }} >adjust your search</span></span>
                </div> }
            </div>
            <div style={{ gap: "0px"}} className="sidebar">

            <div id="nsfw-on">
                    {/* <span style={{ textAlign: "right"}} >Safe search<button>Toggle</button></span> */}
                </div>
                <YourCommunitesProfile />
                { isVisible2 ? <button style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>
    )
}

export default SearchCommunityComments
