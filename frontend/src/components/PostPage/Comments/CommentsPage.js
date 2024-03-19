import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../PostPage.css"
import * as postActions from '../../../store/posts';
import * as communityActions from '../../../store/communities';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import pfp from "../IMG6.jpg";
import { useModal2 } from "../../../context/Modal2";
import * as commentActions from '../../../store/comments'
import DeleteComment from "./deleteC";
import CommentLikes from "../../HomePage/likesC";
import SignupFormModal from "../../SignupFormPage";
import DeletePost from "../delete";
import PostLikes from "../../HomePage/likes";
import MyCarousel from "../postCrousel";
import CommunitiesProfile from "../../CreatePostPage/communites2";
import YourProfilePage from "../../YourProfilePage";
import YourCommunitesProfile from "../../CommunityPage/communites3";
import Comments2 from "./Comments2";

function CommentsPage() {
    const { singlePost, singleComment } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const { singleCommunity, userCommunities } = useSelector((state) => state.communities)
    const { id } = useParams();
    const { commentId } = useParams();
    const { closeModal } = useModal();
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
    // const [ commentId, setCommentId ] = useState(null)
    const [ comment3, setComment3 ] = useState("")
    const [ data3, setData3 ] = useState({})
    const [ comment2, setComment2 ] = useState("")
    const [ c, setC ] = useState(null)
    const [ tag, setTag ] = useState(null)
    const [ focus, setFocus ] = useState(false)
    const [ focus2, setFocus2 ] = useState(false)
    const [ focus3, setFocus3 ] = useState(false)
    const [ focus4, setFocus4 ] = useState(false)
    const [ sortComment, setSortComment ] = useState(false)
    const [ commentM, setCommentM ] = useState(false)
    const [ commentR, setCommentR ] = useState(false)
    const [ commentId2, setCommentId2 ] = useState(null);
    const [ p, setP ] = useState(null)
    const [ message, setMessage ] = useState(false)
    const [ tags, setTags ] = useState(null)
    const [ cHover, setCHover] = useState(false)
    const [ scrollH, setScrollH ] = useState(false)
    const [ saveH, setSaveH ] = useState(false)
    const { setModalContent } = useModal()
    const [ sComments, setSComments ] = useState("")
    const [ sComments2, setSComments2 ] = useState("Best")
    const [ parent, setParent ] = useState(null)

    useEffect(() => {

        async function fetchData() {
            if (commentId) await dispatch(postActions.thunkGetCommentById(commentId))
        }
        fetchData()
    }, [commentId, dispatch])

    console.log(singleComment)

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

    const handleSaved = async (postId) => {
        if (singlePost.PostSetting && !singlePost.PostSetting.saved) await dispatch(postActions.thunkUpdateSaved(postId))
        else if (!singlePost.PostSetting) await dispatch(postActions.thunkCreateSaved(postId))
    }

    const handleUnsaved = async (postId) => {
        await dispatch(postActions.thunkUpdateSaved2(postId))
    }

    useEffect( () => {

        async function fetchData() {
            let response
            if (singlePost.id) response = await dispatch(postActions.thunkCreateComment(data2, singlePost.id))
        }
        fetchData()

    }, [dispatch, data2, singlePost.id])


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

      if (sComments2.length && comments?.length) {
        if (sComments2 === "Best") {
            comments = comments.sort((a, b) => b.Votes?.length - a.Votes?.length)
        }
        if (sComments2 === "Top") {
            comments = comments.sort((a, b) => b.Votes?.filter((v) => v.upVote == 1).length - a.Votes?.filter((v) => v.upVote == 1).length)
        }
        if (sComments2 === "New") {
            comments = comments.sort((a, b) => b.createdAt - a.createdAt)
        }
        if (sComments2 === "Old") {
            comments = comments.sort((a, b) => b.createdAt - a.createdAt).reverse()
        }
        if (sComments2 === "Controversial") {
            comments = comments.sort((a, b) => b.Votes?.filter((v) => v.downVote == 1).length - a.Votes?.filter((v) => v.downVote == 1).length)
        }
    }

    if (sComments.length) comments = comments.filter((c) => c.comment.includes(sComments))



    return (

    <>
    <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} onClick={(() => history.push(`/communities/${singlePost.Community.id}/:page`))} id="comm-head">
        { !singlePost.Community?.CommunityStyle?.icon && singlePost.Community.type === "Profile" ? <img src={"https://external-preview.redd.it/2ha9O240cGSUZZ0mCk6FYku61NmKUDgoOAJHMCpMjOM.png?auto=webp&s=3decd6c3ec58dc0a850933af089fb3ad12d3a505"}></img> : null}
        { singlePost.Community?.CommunityStyle?.icon ? <img src={singlePost.Community?.CommunityStyle?.icon}></img> : null}
        { !singlePost.Community?.CommunityStyle?.icon && singlePost.Community.type !== "Profile" ? <div id="postforC"><i style={{ color: "white", fontSize: "16px", height: "16px" }} class="fi-ss-heart"></i></div> : null}

        { singlePost.Community.type !== "Profile" ? <h1>l/{singlePost.Community?.name}</h1> : null}
        { singlePost.Community.type === "Profile" ? <h1>u/{singlePost.Community?.name}</h1> : null}
    </div>
    { myCommunity.length && myCommunity[0].id !== singlePost.communityId ? <div style={{ opacity: "0.5", backgroundColor: `${singlePost.Community.CommunityStyle.base}`}}id="comm-head10">
        <p style={{ filter: "brightness(5)", fontWeight: "900", color: `${singlePost.Community.CommunityStyle.highlight}`, borderColor: `${singlePost.Community.CommunityStyle.highlight}`}}>Posts</p>
    </div> : null}
    <div className="whole-post-page">
        <div style={{ marginTop: "0px"}} className="post-page">
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
        {singlePost.description && <div id="post-info1">
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
        </div> }
        {singlePost.PostImages?.length ? singlePost.PostImages?.length === 1 ? <div style={{ justifyContent: "center", display: "flex"}}><img id="post-image1" src={singlePost.PostImages[0].imgURL} alt="postimg"></img></div> : <MyCarousel images={singlePost.PostImages}/> : null}
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
                        { !singlePost.PostSetting || !singlePost.PostSetting.saved ? <p onClick={(() => {
                      handleSaved(singlePost.id)
                    })}>
                    <i class="fi fi-rr-bookmark"></i>Save</p> :
                    <p onClick={(() => {
                      handleUnsaved(singlePost.id)
                    })}>
                    <i class="fi fi-rr-bookmark-slash"></i>Unsave</p> }
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
        <div className="comments-for-post">
        <div style={{ marginTop: "5px", color: `${singlePost.Community.CommunityStyle.highlight}`}} id="sort-comments">
                    <div style={{ position: "relative", display: "flex", flexDirection: "column"}}>
                    <p onClick={(() => setSortComment(!sortComment))} id="sorting-comms">Sort By: {sComments2}
                    <i class="fi fi-rr-caret-down"></i>
                    </p>
                    { sortComment && <div id="comment-m">
                        <span style={{ color: sComments2 === "Best" ? "#0079D3" : ""}} onClick={((e) => {
                            e.stopPropagation()
                            setSComments2("Best")
                            setSortComment(false)
                            })}>Best</span>
                        <span style={{ color: sComments2 === "Top" ? "#0079D3" : ""}} onClick={((e) => {
                            e.stopPropagation()
                            setSComments2("Top")
                            setSortComment(false)
                            })}>Top</span>
                        <span style={{ color: sComments2 === "New" ? "#0079D3" : ""}} onClick={((e) => {
                            e.stopPropagation()
                            setSComments2("New")
                            setSortComment(false)
                            })}>New</span>
                        <span style={{ color: sComments2 === "Controversial" ? "#0079D3" : ""}} onClick={((e) => {
                            e.stopPropagation()
                            setSComments2("Controversial")
                            setSortComment(false)
                            })}>Controversial</span>
                        <span style={{ color: sComments2 === "Old" ? "#0079D3" : ""}} onClick={((e) => {
                            e.stopPropagation()
                            setSComments2("Old")
                            setSortComment(false)
                            })}>Old</span>
                    </div>}

                    </div>
                    {/* <div>
                    <p>Clear suggested sort</p>
                    </div>
                    <div>
                    <p>Contest</p>
                    <img src="https://vizzendata.files.wordpress.com/2020/01/switch-left.png"></img>
                    </div> */}
                </div>
            { !comments || !comments.length ? <div id="any-comments">
                    <i style={{ color: `${singlePost.Community.CommunityStyle.base}`}} class="fi fi-rr-comment-heart"></i>
                    <p>No Comments Yet</p>
                    <span>Be the first to share what you think</span>
                </div> :
                <Comments2 />
                }
        </div>
        </div>
        </div>
        <div className="side-community">
        { singlePost.Community.type !== "Profile" && <CommunitiesProfile community={singlePost.Community} page={"/postId"}/>}
        { singlePost.Community.type === "Profile" && <YourCommunitesProfile />}
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

export default CommentsPage
