import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import * as communityActions from "../../store/communities"
import { useEffect, useRef, useState } from "react";
import './CommunityPage.css'
import avatar from "./imagedit2.png"
import pfp from "./IMG6.jpg"
import YourCommunitesProfile from "./communites3";
import { useModal } from "../../context/Modal";
import PostPageModal from "../PostPage/PostPageModal";
import * as postsActions from '../../store/posts'
import PostLikes from "../HomePage/likes";
import NoPosts from "../YourProfilePage/none";
import tinycolor from "tinycolor2";
import { useModal2 } from '../../context/Modal2'
import DeletePost from "../PostPage/delete";
import MyCarousel from "../PostPage/postCrousel";
import { useFilter } from "../../context/filter";
import SignupFormModal from "../SignupFormPage";


function HotCommunityPage() {
  const { id } = useParams();
  const { communities, communityMemberships, singleCommunity, memberships, userCommunities } = useSelector((state) => state.communities);
  const { hotCommunityPosts, singlePost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.session);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);
  const history = useHistory()
  const [ isLiked, setIsLiked ] = useState([]);
  let joined = null
  const [ scrolling, setScrolling ] = useState(false)
  const [singleCommunityName, setSingleCommunityName] = useState(singleCommunity.name)
  const [ button, setButton ] = useState(true)
  const [ message, setMessage ] = useState(false)
  const [ tags, setTags ] = useState(null)
  const [ data1, setData1 ] = useState({})
  const { setModalContent2 } = useModal2()
  const [ indx, setIndx ] = useState(null)
  const [ postId, setPostId ] = useState(null)
  const targetRef = useRef()
  const { page } = useParams(); // Retrieve the page parameter from the URL
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [threshold, setThreshold] = useState(450);
  const { filter, setFilter } = useFilter()
  const [ hiddenBox, setHiddenbox ] = useState(false)
  const [ hiddenPost, setHiddenPost ] = useState(null)

  useEffect(() => {
      setFilter(true)
      localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    useEffect(() => {

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, [currentPage]);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - threshold) {
        const storedCurrentPage = localStorage.getItem("currentPage");

        setCurrentPage(currentPage + 1);
        setThreshold(threshold + 200);
        if (id) dispatch(postsActions.thunkGetHotCommunityPosts(id, currentPage)); // Fetch posts for the specified page
      }
    }

    const handleSaved = async (id) => {
      if (!user) return setModalContent(<SignupFormModal />)
      await dispatch(postsActions.thunkCreateSaved(id))
    }

    const handleSaved2 = async (id) => {
      if (!user) return setModalContent(<SignupFormModal />)
      await dispatch(postsActions.thunkUpdateSaved(id))
    }

    const handleUnsaved = async (id) => {
      await dispatch(postsActions.thunkUpdateSaved2(id))
    }

    const handleHide = async (id) => {
      if (!user) return setModalContent(<SignupFormModal />)
      await dispatch(postsActions.thunkCreateHidden(id))
    }

    const handleHide2 = async (id) => {
      if (!user) return setModalContent(<SignupFormModal />)
      await dispatch(postsActions.thunkUpdateHidden(id))
    }

    const handleUnhide = async (id) => {
      await dispatch(postsActions.thunkUpdateHidden2(id))
    }


  useEffect(() => {
    setButton(singleCommunity.CommunityStyle?.base)
    if (id) dispatch(postsActions.thunkGetHotCommunityPosts(id, page)); // Fetch posts for the specified page
  }, [dispatch, page, id, singleCommunity]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
  }, []);

  useEffect(() => {
    setSingleCommunityName(singleCommunity.name)

  }, [singleCommunity.name]);

  const handleClick = () => {
    setIsVisible5(!isVisible5);
  };

  let editMenu = isVisible5 ? "edit-menu" : "hidden";


  const myMemberships = Object.values(memberships).concat(Object.values(userCommunities))
  const member = Object.values(memberships).some((m) => m.id === singleCommunity.id)



  if (member) joined = true
  if (!member.length) joined = false

  let ePost = []

  ePost = Object.values(hotCommunityPosts).sort((a, b) => b.Votes?.length - a.Votes?.length).filter((p) => p.communityId === singleCommunity.id)

  useEffect( () => {
    if (singlePost.tags) setTags(singlePost.tags.split(','))
}, [dispatch, singlePost.tags])

  useEffect(() => {

    async function fetchData() {
      if (id) await dispatch(communityActions.thunkGetDetailsById(id))
      else return
    }

    fetchData()

  }, [dispatch, id])

  useEffect(() => {

    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
    }

    fetchData()

  }, [dispatch, id])

  useEffect( () => {

    async function fetchData() {
        if (postId && data1)  await dispatch(postsActions.thunkUpdatePosts(postId, data1))
        let data
        if (postId) {
            data =  await dispatch(postsActions.thunkGetDetailsById(postId))
        }

    }
    fetchData()

  }, [dispatch, data1, postId])

  let top = isVisible ? "top" : "down2"


  const handleJoinClick = async () => {
      if (!user) return setModalContent(<SignupFormModal />)
    let response
    joined = true
    if (singleCommunity.id) {

      if (singleCommunity.type === "Public") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
      if (singleCommunity.type === "Private" || singleCommunity.type === "Restricted") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id, singleCommunity.type))
    }
  }
  const handleUnjoinClick = async () => {
    let response
    joined = false
    if (singleCommunity.id) response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
  }



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 250) {
        setIsVisible2(false)

      }
      else if (window.scrollY > 260) {
        setIsVisible(true);
        setIsVisible2(true);

      }
      else {
        setIsVisible(false);

      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


  }, [])

  useEffect(() => {

    const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
            setIsVisible5(false);

          }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

  }, []);


  // if (!Object.values(singleCommunity).length) return <h1 className="data-not-here"></h1>



const handleOc = (e) => {
    e.stopPropagation()

    if (tags && tags.includes("oc")) {
        setData1({
            tags: singlePost.tags.split('oc,').join()
        })
    }
    else if (tags && !tags.includes("oc")) {
        setData1({
            tags: singlePost.tags += ",oc"
        })
    }
    else if (!tags) {
        setData1({
            tags: "oc"
        })
    }
}

const handleSpoiler = (e) => {
    e.stopPropagation()

    if (tags && tags.includes("spoiler")) {
        setData1({
            tags: singlePost.tags.split('spoiler,').join()
        })
    }
    else if (tags && !tags.includes("spoiler")) {
        setData1({
            tags: singlePost.tags += ",spoiler"
        })
    }
    else if (!tags) {
        setData1({
            tags: "spoiler"
        })
    }

}

const handleNsfw = (e) => {

    e.stopPropagation()

    if (tags && tags.includes("nsfw")) {
        setData1({
            tags: singlePost.tags.split('nsfw').join()
        })
    }
    else if (tags && !tags.includes("nsfw")) {
        setData1({
            tags: singlePost.tags += ",nsfw"
        })
    }
    else if (!tags) {
        setData1({
            tags: "nsfw"
        })
    }


}

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


  let style
  if (singleCommunity.CommunityStyle) style = singleCommunity.CommunityStyle

  function openEmailClient() {
    const emailAddress = 'thandimpofu2003@gmail.com';  // Replace with the desired recipient's email address
    const subject = 'Subject of the Email';  // Replace with the desired subject
    const body = 'Body of the Email';  // Replace with the desired body

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }


  function reduceOpacity(color, opacity) {
    if (/^#/.test(color)) {
      // If the color is a hex value
      const hexColor = color.replace('#', '');
      const r = parseInt(hexColor.slice(0, 2), 16);
      const g = parseInt(hexColor.slice(2, 4), 16);
      const b = parseInt(hexColor.slice(4, 6), 16);

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else {
      // If the color is a named color
      const tempElement = document.createElement('div');
      tempElement.style.color = color;
      document.body.appendChild(tempElement);

      const computedColor = getComputedStyle(tempElement).color;
      const match = computedColor.match(/\d+/g);
      const [r, g, b] = match ? match.map(Number) : [0, 0, 0];

      document.body.removeChild(tempElement);

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }


  function isURLOrFile(str) {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (urlRegex) return urlRegex.test(str);
    const filePathRegex = /^[a-zA-Z]:\\([a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\\)*[a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\.\w{1,}$/;
    if (filePathRegex) return filePathRegex.test(str);
}


  return (
    <div style={{
      backgroundImage: isURLOrFile(style?.background) ? `url(${style?.background})` : '', // Replace with the actual path to your image
      backgroundColor: !isURLOrFile(style?.background) ? `${style?.background}` : "",
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      height: "100"
      }}>
        <div className="community-page-header">
       { style ? <div style={{
        width: '100%',
        height: '200px',
        backgroundImage: style?.banner ? `url(${style.banner})` : '', // Replace with the actual path to your image
        backgroundColor: `${style.base}`,
        filter: 'brightness(90%)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        }}></div> :
        <div id="community-page-header"></div> }
            <div>
        <div id="community-page-title">

            <div id="community-title-head">
            { style && style.icon ? <img id="img-pfp"src={style.icon}></img> : <div style={{ backgroundColor: `${style?.base}`}} id="comm-pfp">l/</div> }
            <div id="communityName">
            { singleCommunity.id !== 10 && singleCommunity.name}
                {singleCommunity.id === 10 && "For all your questions about Luvddit!"}
                <span>l/{singleCommunityName}</span>
            </div>
            {user && member && button ? <button  onMouseEnter={(() => setButton(false))} style={{ color: `${style?.highlight}`, border: `1px solid ${style?.highlight}`}} onClick={handleUnjoinClick} id="joined">Joined</button> : null }
            {user && member && !button ? <button  onMouseLeave={(() => setButton(true))} style={{ backgroundColor: `${reduceOpacity(style?.highlight, 0.1)}`, color: `${style?.highlight}`, border: `1px solid ${style?.highlight}`}} onClick={handleUnjoinClick} id="joined">Leave</button> : null }
            {!member || !user ? <button style={{ backgroundColor: `${style?.highlight}`, border: `1px solid ${style?.highlight}`}} onClick={handleJoinClick} id="join">Join</button> : null }
            </div>
        </div>
        {user && singleCommunity.userId !== user?.id ? <div id="comm-head11">
        <p>Posts</p>
        { singleCommunity.id === 10 && <p style={{ border: "0px"}} onClick={(() => window.open(`${singleCommunity.tabOne}`, "_blank"))}>My Github</p>}
        { singleCommunity.id === 10 && <p style={{ border: "0px"}} onClick={(() => window.open(`${singleCommunity.tabTwo}`, "_blank"))}>My Linkedin</p>}
        { singleCommunity.id === 10 &&<p style={{ border: "0px"}} onClick={(() => window.open(`${singleCommunity.tabThree}`, "_blank"))}>My Portfolio</p>}
        </div> : null}
        </div>
            </div>
        <div className="community-page-content">

        </div>
        <div className="community-page-content">
            <div className="posts">
                {user ? <div className="create">
                { !user.Community?.CommunityStyle?.icon ? <img onClick={(() => history.push('/profile/:page'))} src={pfp} alt="pfp"></img> : null}
                { user.Community?.CommunityStyle?.icon ? <img onClick={(() => history.push('/profile/:page'))} src={user.Community?.CommunityStyle?.icon} alt="pfp"></img> : null}                    <input onClick={(() => history.push('/posts/new'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => history.push('/posts/new/image'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => history.push('/posts/new/link'))} class="fi fi-rr-link-alt"></i></div>
                </div> :
                <div onClick={(() => setModalContent(<SignupFormModal />))} className="create">
                    <img src={pfp}></img>
                    <input type="text" placeholder="Create Post"></input>
                    <div><i class="fi fi-rr-picture"></i></div>
                    <div><i class="fi fi-rr-link-alt"></i></div>
                </div> }
                <div className="filter">
                <div id="filter-side1">
                <div style={{ backgroundColor: "#EDEFF1"}} onClick={(() => history.push(`/communities/${singleCommunity.id}/:page`))} id="best">
                <i style={{ color: `${singleCommunity.CommunityStyle?.base}`}} class="fi fi-sr-flame"></i>
                <p style={{ color: `${singleCommunity.CommunityStyle?.base}`}} >Hot</p>
                </div>
                <div onClick={(() => history.push(`/communities/recent/${singleCommunity.id}/:page`))}id="best">
                <i class="fi fi-rr-bahai"></i>
                <p>New</p>
                </div>
                <div onClick={(() => history.push(`/communities/top/${singleCommunity.id}/:page`))} id="best">
                <i class="fi fi-ts-signal-bars-good"></i>
                <p>Top</p>
                </div>
                <i onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} class="fi fi-rr-menu-dots"></i>
                </div>
                <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="filter-side2">
                <i class="fi fi-rr-horizontal-rule"></i>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                {ePost && !ePost.length ? <NoPosts name={"posted"} /> : ePost.map((post, i) =>
                   <div className="post-content">
                       {post.PostSetting?.hidden && <div style={{ width: "100%"}} id="hideP">
                      <h2>Post hidden</h2>
                      <button onClick={(() => handleUnhide(post.PostSetting.id))} id="undoH">Undo</button>
                      </div>}
                      { !post.PostSetting?.hidden && <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="pc-side1">
                      <PostLikes post={post}
                      />
                      </div>}
                      { !post.PostSetting?.hidden && <div id="pc-side2">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="nameOf">
                    {/* <img src={pfp}></img> */}
                    <p id="cp">Posted by <span onClick={((e) => {
                        e.stopPropagation()
                        post.userId !== user?.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3  id="p-tit" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 id={post.userId === user?.id ? "title-content2" : "title-content"}>{post.title}<span>{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</span></h3></h3>                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="content">
                    {post.PostImages?.length !== 0 && <div id="img2">
                    {post.PostImages?.length === 1 ? <img style={{ maxWidth: "100%", maxHeight: "511px", alignSelf: "flex-end" }} src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : <MyCarousel images={post.PostImages}/>}
                    </div>}
                    { post.description && <div style={{position: "relative"}} id={post.userId === user?.id ? "finishing60" : "finishing2"}>
                      <span id="post-des">{post.description}</span>
                      { post.description.length > 140 && <div id="faded"></div>}
                      </div>}
                    </div>
                    {user && post.User?.id !== user?.id ?<div id="post-extras9">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p >{post.Comments?.length} Comments</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    { !post.PostSetting || !post.PostSetting.saved ? <div onClick={(() => {
                      post.PostSetting ? handleSaved2(post.id) : handleSaved(post.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div> :
                    <div onClick={(() => {
                      handleUnsaved(post.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                    </div>
                    }
                    <i id="hideP" onClick={(() => {
                      setHiddenPost(post.id)
                      setHiddenbox(!hiddenBox)}
                      )} class="fi fi-rr-menu-dots">
                      {hiddenBox && hiddenPost == post.id && <div style={{top: "15px"}} id="hp">
                        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><i class="fi fi-rr-volume-mute"></i>Mute l/help</span>
                        <span onClick={(() => post.PostSetting ? handleHide2(post.id) : handleHide(post.id))} ><i class="fi fi-rr-eye-crossed"></i>Hide</span>
                        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><i class="fi fi-rr-flag"></i>Report</span>
                      </div>}
                    </i>
                    </div> :
                    <div id="post-extras9">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{post.Comments.length}</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment">
                    <i class="fi fi-rs-shield"></i>
                    </div>
                { post.userId !== user?.id && <i onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} class="fi fi-rr-menu-dots"></i>}
                { post.userId === user?.id && <i onClick={((e) => {
                  e.stopPropagation()
                  handleClick()
                  setIndx(i)
                  setPostId(post.id)
                })} id="menu" class="fi fi-rr-menu-dots">
                <div id="post-menu25">
                {indx === i && <div className="menu">
                <div ref={targetRef} id={editMenu}>
                   {post?.PostImages.length && post?.PostImages[0].imgURL ? null :
                   <p onClick={(() => setModalContent2(<PostPageModal postId={post.id} scroll={false} />))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                   { !post.PostSetting || !post.PostSetting.saved ? <p onClick={(() => {
                      post.PostSetting ? handleSaved2(post.id) : handleSaved(post.id)
                    })} ><i class="fi fi-rr-bookmark"></i>Save</p> : <p onClick={(() => {
                      handleUnsaved(post.id)
                    })} ><i class="fi fi-rr-bookmark-slash"></i>Unsave</p> }
                    <p onClick={(() => post.PostSetting ? handleHide2(post.id) : handleHide(post.id))} ><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                    <p onClick={(() => {
                        setModalContent2(<div> <DeletePost id={post.id} /></div>)
                        setIsVisible5(false)
                    })}><i class="fi fi-rr-trash-xmark"></i>Delete</p>
                   <label onClick={handleOc}>
                    <input defaultChecked={tags?.includes("oc")} type="checkbox" />
                    Mark as OC
                    </label>
                    <label onClick={handleSpoiler}>
                    <input defaultChecked={tags?.includes("spoiler")} type="checkbox" />
                    Mark as Spolier
                    </label>
                    <label onClick={handleNsfw}>
                    <input defaultChecked={tags?.includes("nsfw")} type="checkbox" />
                    Mark as NSFW
                    </label>
                    <label>
                    <input type="checkbox" />
                    Send me reply notifications
                    </label>
                </div>
                </div> }
                </div>
                </i>}
                    </div>}
                    </div>}
                    </div>
                )}
            </div>
            <div className="sidebar">


                <YourCommunitesProfile />
                <div className="home-section">
                <div style={{ backgroundColor: `${style?.base}`}} id="cs-background">
                    <p>Moderators</p>
                </div>
                <div id="home-section">
                { singleCommunity.id === 10 && !message && <button onClick={(() => openEmailClient())} onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${style?.highlight}`, color: `${style?.highlight}`}} id="but4"><i class="fi fi-rr-envelope"></i> Message the creator</button>}
                { singleCommunity.id === 10 && message && <button  onClick={(() => openEmailClient())} onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(style?.highlight, 0.1)}`, borderColor: `${style?.highlight}`, color: `${style?.highlight}`}} id="but4"><i class="fi fi-rr-envelope"></i> Message the creator</button>}
                { singleCommunity.id !== 10 && !message && <button onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${style?.highlight}`, color: `${style?.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
                { singleCommunity.id !== 10 && message && <button onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(style?.highlight, 0.1)}`, borderColor: `${style?.highlight}`, color: `${style?.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
                <div id="cs-side6">
                    {user?.id !== singleCommunity.User?.id ? <span style={{ color: `${style?.highlight}` }} onClick={(() => history.push(`/profile2/${singleCommunity.User?.id}/:page`))}> {singleCommunity.User?.username}</span> : "" }
                    {user?.id === singleCommunity.User?.id ? <span style={{ color: `${style?.highlight}` }} onClick={(() => history.push(`/profile/:page`))}> {singleCommunity.User?.username}</span> : "" }
                    <span onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} style={{ color: `${style?.highlight}` }}>VIEW ALL MODERATORS</span>
                </div>
                </div>

                </div>

                { isVisible2 ? <button style={{ backgroundColor: `${style?.highlight}`}} className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>

        </div>
    )
}


export default HotCommunityPage
