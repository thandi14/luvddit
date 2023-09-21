import './PostPage.css'
import '../CreatePostPage/CreatePostPage.css'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import * as postActions from '../../store/posts'
import '../CreatePostPage/CreatePostPage.css'
import CommunitiesProfile from '../CreatePostPage/communites2';
import * as communityActions from '../../store/communities'
import DeletePost from './delete';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal2 } from '../../context/Modal2';
import pfp from "./IMG6.jpg";
import * as commentActions from '../../store/comments'
import PostLikes from '../HomePage/likes';
import DeleteComment from "./deleteC";
import CommentLikes from '../HomePage/likesC';
import MyCarousel from './postCrousel';
import YourCommunitesProfile from '../CommunityPage/communites3';
import SignupFormModal from '../SignupFormPage';
import { useModal } from '../../context/Modal';

//import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


function PostPage() {
    const { singlePost } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const { singleCommunity, userCommunities } = useSelector((state) => state.communities)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [ deleted, setDeleted ] = useState("")
    const targetRef = useRef(null);
    const { setModalContent2 } = useModal2()
    const [isVisible2, setIsVisible2] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ data1, setData1 ] = useState(null);
    const history = useHistory()
    const [ comment, setComment ] = useState("")
    const [ data2, setData2 ] = useState({})
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible5, setIsVisible5] = useState(false);
    const [ commentId, setCommentId ] = useState(null)
    const [ focus, setFocus ] = useState(false)
    const [ focus2, setFocus2 ] = useState(false)
    const [ focus3, setFocus3 ] = useState(false)
    const [ newComment, setNewComment ] = useState("")
    const [ commentM, setCommentM ] = useState(false)
    const [ commentId2, setCommentId2 ] = useState(null);
    const [ data3, setData3 ] = useState({})
    const [ comment2, setComment2 ] = useState("")
    const [ c, setC ] = useState(null)
    const [ tag, setTag ] = useState(null)
    const [ tags, setTags ] = useState(null)
    const [ message, setMessage ] = useState(null)
    const [ cHover, setCHover ] = useState(null)
    const [ scrollH, setScrollH ] = useState(false)
    const [ saveH, setSaveH ] = useState(false)
    const { setModalContent } = useModal()

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY < 450) {
              setIsVisible5(false)

          }
          else if (window.scrollY > 460) {
            setIsVisible5(true);

          } else {
            setIsVisible5(false);

          }
        };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };


      }, [])



    const myCommunity = Object.values(userCommunities)


    useEffect( () => {

        async function fetchData() {
            let response
            if (singlePost.id) response = await dispatch(postActions.thunkCreateComment(data2, singlePost.id))
        }
        fetchData()

    }, [dispatch, data2, singlePost.id])

    console.log(comment2)


    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleSave = (e) => {

        setData1({
            description
        })

        setIsVisible2(false)

    }

    const handleComment = (e) => {
        e.preventDefault()


        setData2({
            comment
        })

        setComment("")

    }

    const handleComment2 = (e) => {
        e.stopPropagation()

        if (!user) return setModalContent(<SignupFormModal />)

        setData3({
            comment2
        })

        setCommentM(false)

    }


    let comments

    if (singlePost.Comments && singlePost.Comments.length) comments = Object.values(singlePost.Comments).reverse()

    useEffect( () => {

        async function fetchData() {
            let response
            if (c && c.id) response = await dispatch(postActions.thunkUpdateComment(data3, c.id))
        }
        fetchData()

    }, [dispatch, c, data3])

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if (isVisible && targetRef.current && !targetRef.current.contains(event.target)) {
                setIsVisible(false);

            }

        };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
        };

    }, [isVisible]);

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


    useEffect( () => {

        async function fetchData() {
            if (data1 && singlePost.id)  await dispatch(postActions.thunkUpdatePosts(singlePost?.id, data1))
            let data
            if (id) data =  await dispatch(postActions.thunkGetDetailsById(id))
            setDeleted(data)
            if (data)  await dispatch(communityActions.thunkGetDetailsById(data?.communityId))

            console.log("TAGS", data1)
        }
        fetchData()


    }, [dispatch, data1, id])

    useEffect( () => {

        async function fetchData() {

            if (singlePost.id) {
                if (singlePost.PostSetting?.history) await dispatch(postActions.thunkUpdateHistory(singlePost.id))
                else if (!singlePost.PostSetting || singlePost.PostSetting && !singlePost.PostSetting.history) await dispatch(postActions.thunkCreateHistory(singlePost.id))
            }

        }
        fetchData()

    }, [dispatch, singlePost.PostSetting])


    useEffect( () => {
        if (singlePost.tags) setTags(singlePost.tags.split(','))
    }, [dispatch, singlePost.tags])

    if (!Object.values(singlePost).length) return <h2></h2>



    let editMenu = isVisible ? "edit-menu" : "hidden";

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

    let editMenu2 = isVisible3 ? "edit-menu" : "hidden";

    let top = isVisible5 ? "top2" : "hidden"

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

      function isLink(text) {
        // Regular expression to match a URL
        const urlRegex = /(https?:\/\/[^\s]+)/;

        return urlRegex.test(text);
      }



    return (

    <>
    <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} onClick={(() => history.push(`/communities/${singlePost.Community.id}/:page`))} id="comm-head">
        { !singlePost.Community?.CommunityStyle?.icon && singlePost.Community.type === "Profile" ? <img src={"https://external-preview.redd.it/2ha9O240cGSUZZ0mCk6FYku61NmKUDgoOAJHMCpMjOM.png?auto=webp&s=3decd6c3ec58dc0a850933af089fb3ad12d3a505"}></img> : null}
        { singlePost.Community?.CommunityStyle?.icon ? <img src={singlePost.Community?.CommunityStyle?.icon}></img> : null}
        { !singlePost.Community?.CommunityStyle?.icon && singlePost.Community.type !== "Profile" ? <div id="postforC"><i style={{ color: "white", fontSize: "16px", height: "16px" }} class="fi-ss-heart"></i></div> : null}

        { singleCommunity.type !== "Profile" ? <h1>l/{singleCommunity.name}</h1> : null}
        { singleCommunity.type === "Profile" ? <h1>u/{singleCommunity.name}</h1> : null}
    </div>
    { myCommunity.length && myCommunity[0].id !== singlePost.communityId ? <div style={{ opacity: "0.5", backgroundColor: `${singlePost.Community.CommunityStyle.base}`}}id="comm-head10">
        <p style={{ filter: "brightness(5)", fontWeight: "900", color: `${singlePost.Community.CommunityStyle.highlight}`, borderColor: `${singlePost.Community.CommunityStyle.highlight}`}}>Posts</p>
    </div> : null}
    <div className="whole-post-page">
        <div className="post-page">
        <div id="vote-side">
        <PostLikes post={singlePost} />
        </div>
        <div id="details-side">
        <p>Posted by l/{singlePost?.User?.username} just now<i onClick={((e) => {
                                        e.stopPropagation()
                                        window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))
                                    })}class="fi fi-rs-cowbell"></i></p>
        <h1>{singlePost?.title}</h1>
        <span id="tags">{ tags && tags.includes("oc") ? <div id="oc6">OC</div> : null} {tags && tags.includes("spoiler") ? <div id="spoiler6">Spoiler</div> : null } { tags && tags.includes("nsfw") ? <div id="nsfw6">NSFW</div> : null}</span>
        <div id="post-info1">
        { isVisible2 ? null : !isLink(singlePost.description) ? <p>{singlePost?.description}</p> : null}
        { isVisible2 ? null : isLink(singlePost.description) ? <a href={`${singlePost?.description}`}>{singlePost?.description}</a> : null}
        { isVisible2 ? <div className="post-input7">
                     <div id={ focus2 ? "add-to11" : "add-to7"}>
                    <i class="fi fi-rr-bold"></i>
                    <i class="fa-solid fa-italic"></i>
                    <i class="fi fi-rr-link-alt"></i>
                    <i class="fi fi-rr-strikethrough"></i>
                    <i class="fi fi-rr-code-simple"></i>
                    <i class="fa-solid fa-superscript"></i>
                    <i class="fi fi-rr-diamond-exclamation"></i>
                    <div id="divider16"></div>
                    <i class="fi fi-rr-heading"></i>
                    <i class="fi fi-rr-rectangle-list"></i>
                    <i class="fa-solid fa-list-ol"></i>
                    <i class="fi fi-rr-square-quote"></i>
                    <i class="fi fi-rr-square-code"></i>
                    <div id="divider16"></div>
                    <i class="fi fi-rr-grid-alt"></i>
                    <i class="fi fi-rr-picture"></i>
                    <i class="fa-brands fa-youtube"></i>
                    </div>
                   <textarea onFocus={(() => setFocus2(true))} onBlur={(() => setFocus2(false))} defaultValue={singlePost.description} onChange={((e) => setDescription(e.target.value) )} placeholder="Text(optional)"></textarea>
        </div> : null}
        {singlePost.PostImages?.length ? singlePost.PostImages?.length === 1 ? <div><img id="post-image1" src={singlePost.PostImages[0].imgURL} alt="postimg"></img></div> : <MyCarousel images={singlePost.PostImages}/> : null}
        </div>
        { isVisible2 ? <div id="save"><button style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}} onClick={handleClick2} >Cancel</button>
        { !description && <button id={"save-submit"} onClick={((e) => {
                    e.stopPropagation()
                    handleSave()
                    })}>Save</button>}
                { !saveH && description && <button onMouseEnter={(() => setSaveH(true))} style={{ backgroundColor: `${singlePost.Community.CommunityStyle.highlight}`}} id={ !description ? "save-submit" : "save-submit2"} onClick={((e) => {
                    e.stopPropagation()
                    handleSave()
                    })}>Save</button>}
                    { description && saveH && <button onMouseLeave={(() => setSaveH(false))} style={{ backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle.highlight, 0.5)}`}} id={ !description ? "save-submit" : "save-submit2"} onClick={((e) => {
                    e.stopPropagation()
                    handleSave()
                    })}>Save</button>}</div> : null}
        <div id="post-extras1">
            <div style={{ backgroundColor: "transparent"}} id="comment5">
            <i class="fa-regular fa-message"></i>
            <p>{comments && comments.length}</p>
            </div>
            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment4">
                <i class="fi fi-rs-heart-arrow"></i>
                <p>Share</p>
            </div>
            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment4">
                <i class="fi fi-rs-check-circle"></i>
                <p>Approved</p>
            </div>
            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment4">
                <i class="fi fi-rs-circle-cross"></i>
                <p>Removed</p>
            </div>
            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment4">
                <i class="fi fi-rr-box"></i>
                <p>Spam</p>
            </div>
            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment4">
                <i class="fi fi-rs-shield"></i>
            </div>
            <div id="comment4">
                <i class="fa-brands fa-reddit-alien"></i>
            </div>
            <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots"></i>
            <div className="menu">
            <div ref={targetRef} id={editMenu}>
                {!singlePost.PostImages?.length ? <p onClick={(() => {
                    setIsVisible2(true)
                    setIsVisible(false)
                    })}><i class="fi fi-rr-magic-wand"></i>Edit</p> : null}
                <p onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} ><i class="fi fi-rr-bookmark"></i>Save</p>
                <p onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                <p onClick={(() => {
                    setModalContent2(<DeletePost id={id} deleted={deleted}/>)
                    setIsVisible(false)
                    history.push('/')
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
            </div>
        </div>
        <div id="insights">
            <p>Post Insights</p>
            <p>Check back later to see views, shares, and more. <span style={{ color: `${singlePost.Community.CommunityStyle.base}`}} >Share your post</span> to spread the word!</p>
        </div>
        <div className="comment-input">
        {user ? <p>Comment as <span style={{ color: `${singlePost.Community.CommunityStyle.base}`}} >{user.username}</span></p> : "Please login"}
            <textarea onFocus={(() => setFocus(true))} onBlur={(() => setFocus(false))}  value={comment} onChange={((e) => setComment(e.target.value))} placeholder="What are your thoughts?"></textarea>
        <div id={focus ? "my-comments2" : "my-comments"}>
        <i class="fi fi-rr-gif-square"></i>
                <i class="fi fi-rr-picture"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-bold"></i>
                <i class="fa-solid fa-italic"></i>
                <i class="fi fi-rr-link-alt"></i>
                <i class="fi fi-rr-strikethrough"></i>
                <i class="fi fi-rr-code-simple"></i>
                <i class="fa-solid fa-superscript"></i>
                <i class="fi fi-rr-diamond-exclamation"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-heading"></i>
                <i class="fi fi-rr-menu-dots"></i>
                {/* <i class="fi fi-rr-rectangle-list"></i>
                <i class="fa-solid fa-list-ol"></i>
                <i class="fi fi-rr-square-quote"></i>
                <i class="fi fi-rr-square-code"></i>
                <div id="divider16"></div>
                <i class="fa-brands fa-youtube"></i> */}
            {!comment && <button id={"submit-c3"} onClick={handleComment}>Comment</button> }
            {comment &&  !cHover && <button onMouseEnter={(() => setCHover(true))} style={{ backgroundColor: `${singlePost.Community.CommunityStyle.highlight}`}} id={"submit-c4"} onClick={handleComment}>Comment</button> }
            {comment &&  cHover && <button onMouseLeave={(() => setCHover(false))} style={{ backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle.highlight, 0.5)}`}} id={"submit-c4"} onClick={handleComment}>Comment</button> }
        </div>
        </div>
        <div className="comments-for-post">
            <div style={{ color: `${singlePost.Community.CommunityStyle.base}`}}  onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="sort-comments">
                <div>
                <p>Sort By: Q&A (Suggested)<i class="fi fi-rr-caret-down"></i></p>
                </div>
                <div>
                <p>Clear suggested sort</p>
                </div>
                <div>
                <p>Contest</p>
                <img src="https://vizzendata.files.wordpress.com/2020/01/switch-left.png"></img>
                </div>
                <div id="divider16"></div>
                <div>
                <i id="searchI" class="fi fi-rs-search-heart"></i>
                <input type="text" placeholder='Search comments'></input>
                </div>
            </div>
            { !comments || !comments.length ? <div id="any-comments">
                    <i style={{ color: `${singlePost.Community.CommunityStyle.base}`}} class="fi fi-rr-comment-heart"></i>
                    <p>No Comments Yet</p>
                    <span>Be the first to share what you think</span>
                </div> :
                <div id="if-comments">
                    {comments.map((c, i) =>
                        <div onClick={(() => setC(c))} className="a-comment">
                            <div id="left-csec">
                            { !c.Profile?.CommunityStyle ? <img id="avatar6" src={pfp}></img> : null}
                            { c.Profile?.CommunityStyle?.icon ? <img id="avatar6" src={c.Profile?.CommunityStyle.icon}></img> : null}
                            <div id="c-line"></div>
                            </div>
                            <div id="right-csec">
                            <span><span id="username45">{c.User?.username}</span> { c.User && c.User.id === singlePost.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.createdAt)}</div></span>
                                { !(commentM && commentId2 === i) ? <p>{c.comment}</p> :
                                <div className="comment-input">
                                    <textarea onFocus={(() => setFocus3(true))} onBlur={(() => setFocus3(false))} defaultValue={c.comment} onChange={((e) => setComment2(e.target.value))} ></textarea>
                                <div id={focus3 ? "my-comments2" : "my-comments"}>
                                <i class="fi fi-rr-gif-square"></i>
                                        <i class="fi fi-rr-picture"></i>
                                        <div id="divider16"></div>
                                        <i class="fi fi-rr-bold"></i>
                                        <i class="fa-solid fa-italic"></i>
                                        <i class="fi fi-rr-link-alt"></i>
                                        <i class="fi fi-rr-strikethrough"></i>
                                        <i class="fi fi-rr-code-simple"></i>
                                        <i class="fa-solid fa-superscript"></i>
                                        <i class="fi fi-rr-diamond-exclamation"></i>
                                        <div id="divider16"></div>
                                        <i class="fi fi-rr-heading"></i>
                                        <i class="fi fi-rr-menu-dots"></i>
                                        {/* <i class="fi fi-rr-rectangle-list"></i>
                                        <i class="fa-solid fa-list-ol"></i>
                                        <i class="fi fi-rr-square-quote"></i>
                                        <i class="fi fi-rr-square-code"></i>
                                        <div id="divider16"></div>
                                        <i class="fa-brands fa-youtube"></i> */}
                                    <button id="cancel-c" onClick={((e) => {
                                        e.stopPropagation()
                                        setCommentM(false)
                                        })}>Cancel</button>
                                    <button id="submit-c2" onClick={handleComment2}>Save Edits</button>
                                </div>
                                </div> }
                                { commentM && commentId2 === i ? null : <div id="comment-extras">
                                   <div>
                                        <CommentLikes comment={c} />
                                    </div>
                                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} >
                                        <i class="fi fi-rs-heart-arrow"></i>
                                        <p>Share</p>
                                    </div>
                                    <i ref={targetRef} onClick={(() => {
                                        setIsVisible3(true)
                                        setCommentId(i)
                                       if (commentId === i) setIsVisible3(!isVisible3)
                                    })} class="fi fi-rr-menu-dots">
                                    { commentId === i ? <div className="menu">
                                    <div id="comm-sec25">
                                    <div onClick={((e) => e.stopPropagation())} id={editMenu2}>
                                    {c.userId !== user.id ? null : <p onClick={(() => {
                                        setCommentM(true)
                                        setIsVisible3(false)
                                        setCommentId2(i)
                                       // if (commentId !== i) setCommentM(!commentM)
                                        })}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                                     {c.userId === user.id ? null : <p><i class="fi fi-rr-flag"></i>Report</p>}
                                     <p><i class="fi fi-rr-bookmark"></i>Save</p>
                                     {c.userId === user.id ? null : <p><i class="fi fi-rs-cowbell"></i>Follow</p>}
                                     {c.userId !== user.id ? null : <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>}
                                     {c.userId !== user.id ? null : <p onClick={(() => {
                                     setModalContent2(<div> <DeleteComment id={c.id} /></div>)
                                     setIsVisible(false)
                                     setIsVisible3(false)
                                     })}><i class="fi fi-rr-trash-xmark"></i>Delete</p> }
                                    {c.userId !== user.id ? null : <label>
                                     <input type="checkbox" />
                                     Send me reply notifications
                                     </label> }
                                     </div>
                                     </div>
                                    </div>
                                     : null }
                                    </i>
                                </div> }
                            </div>
                        </div>
                    )}
                </div>}
        </div>
        </div>
        </div>
        <div className="side-community">
        { singlePost.Community.type === "Profile" && <CommunitiesProfile community={singlePost.Community} page={"/postId"}/>}
        { singlePost.Community.type !== "Profile" && <YourCommunitesProfile />}
        { singlePost.Community.type !== "Profile" && <div id="side-bar7">
            <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} id="cs-background7">
            <p>Moderators</p>
            </div>
            <div id="home-section7">
                { !message && <button onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${singlePost.Community.CommunityStyle.highlight}`, color: `${singlePost.Community.CommunityStyle.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
                { message && <button onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle.highlight, 0.1)}`, borderColor: `${singlePost.Community.CommunityStyle.highlight}`, color: `${singlePost.Community.CommunityStyle.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}            <div id="cs-side7">
                {user ? <span style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}}>{singlePost.User.username}</span> : "" }
                <span style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}}>VIEW ALL MODERATORS</span>
            </div>
            </div>
            </div>}
        { !scrollH && <button onMouseEnter={(() => setScrollH(true))} style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button>}
        { scrollH && <button onMouseLeave={(() => setScrollH(false))} style={{ backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle.base, 0.5)}`}} className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button>}

        </div>
    </div>
    </>
    )
}

export default PostPage
