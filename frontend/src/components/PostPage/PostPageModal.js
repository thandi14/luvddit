import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import YourCommunitesProfile from "../CommunityPage/communites3";
import "./PostPage.css"
import * as postActions from '../../store/posts';
import * as communityActions from '../../store/communities';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import pfp from "./IMG6.jpg";
import DeletePost from "./delete";
import { useModal2 } from "../../context/Modal2";
import CommunitiesProfile from "../CreatePostPage/communites2";
import PostLikes from "../HomePage/likes";
import * as commentActions from '../../store/comments'
import DeleteComment from "./Comments/deleteC";
import CommentLikes from "../HomePage/likesC";
import MyCarousel from "./postCrousel";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignupFormModal from "../SignupFormPage";
import Comments from "./Comments/Comments";

function PostPageModal({ postId, cId, vis3, replyId }) {
    const { communities, singleCommunity, communityMemberships, memberships, userCommunities } = useSelector((state) => state.communities);
    const { singlePost, postsHistory, postsReplies } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [ deleted, setDeleted ] = useState("")
    const targetRef = useRef(null);
    const  { setModalContent2, modalRef2 } = useModal2()
    const [isVisible2, setIsVisible2] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ data1, setData1 ] = useState({})
    const [ data2, setData2 ] = useState({})
    const [ data3, setData3 ] = useState({})
    const history = useHistory()
    const { closeModal, scroll, setScroll, setThreadId, threadId } = useModal();
    const targetRef2 = useRef(null);
    const targetRef3 = useRef(null)
    const targetRef5 = useRef(null)
    const targetRef6 = useRef(null)
    const [ comment, setComment ] = useState("")
    const [ comment2, setComment2 ] = useState("")
    const [ comment3, setComment3 ] = useState("")
    const [isVisible3, setIsVisible3] = useState(false);
    const [ commentId, setCommentId ] = useState(null);
    const [ c, setC ] = useState(null)
    const [ button, setButton ] = useState(false)
    const [ postH, setPostH ] = useState([])
    const [ focus, setFocus ] = useState(false)
    const [ focus2, setFocus2 ] = useState(false)
    const [ focus3, setFocus3 ] = useState(false)
    const [ focus4, setFocus4 ] = useState(false)
    const [ sortComment, setSortComment ] = useState(false)
    const [ commentM, setCommentM ] = useState(vis3 ? true : false)
    const [ commentR, setCommentR ] = useState(false)
    const [ commentId2, setCommentId2 ] = useState(cId ? cId : null);
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
    const [ hiddenBox, setHiddenbox ] = useState(false)
    const [ hiddenPost, setHiddenPost ] = useState(null)

    let joined = null

    // useEffect(() => {

    //     if (scroll) setScrolling(true)
    //     if (!scroll) setScrolling(false)

    // }, [scroll])

    const handleSaved = async (id) => {
        if (!user) return setModalContent(<SignupFormModal />)
        if (singlePost.PostSetting && !singlePost.PostSetting.saved) await dispatch(postActions.thunkUpdateSaved(id))
        else if (!singlePost.PostSetting) await dispatch(postActions.thunkCreateSaved(id))
      }

      const handleUnsaved = async (id) => {
        await dispatch(postActions.thunkUpdateSaved2(id))
      }

      const handleSaved2 = async (id) => {
        if (!user) return setModalContent(<SignupFormModal />)
        await dispatch(postActions.thunkCreateSaved2(id))
      }

      const handleUnsaved2 = async (id) => {
        await dispatch(postActions.thunkCreateDeleteSaved2(id))
      }


    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true


    const myMemberships = Object.values(memberships).concat(Object.values(userCommunities))
    const member = myMemberships.filter((m) => m.id === singlePost.Community?.id)

    if (member) joined = true
    if (!member.length) joined = false

    useEffect(() => {

        async function fetchData() {
          if (id) await dispatch(communityActions.thunkGetCommunityMemberships(id))
          if (id) await dispatch(communityActions.thunkGetDetailsById(id))
          else return
        }


        fetchData()

    }, [dispatch, id])

    useEffect(() => {

        async function fetchData() {
          if (singlePost.id) await dispatch(postActions.thunkGetReplies(singlePost.id))
          else return
        }

        fetchData()

    }, [dispatch, singlePost.id])


    const handleUnhide = async (id) => {
        await dispatch(postActions.thunkUpdateHidden2(id))
    }

    const handleJoinClick = async (e) => {
        e.stopPropagation()
        let response
        joined = true
        await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
    }

    const handleUnjoinClick = async (e) => {
        e.stopPropagation()
        let response
        joined = false
        response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
    }


    const handleClick = (e) => {
        e.stopPropagation()
        setIsVisible(!isVisible);
    };

    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleSave = () => {

        setData1({
            description
        })
        setIsVisible2(false)
    }

    const handleComment = (e) => {
        e.stopPropagation()

        if (!user) return setModalContent(<SignupFormModal />)

        setData2({
            comment
        })

        setComment("")

    }

    const handleReply = (e) => {
        e.stopPropagation()

        if (!user) return setModalContent(<SignupFormModal />)

        setData2({
            comment: comment3,
            parent
        })

        setParent(null)
        setComment3("")

    }



    const handleComment2 = (e) => {
        e.stopPropagation()

        if (!user) return setModalContent(<SignupFormModal />)

        setData3({
            comment: comment2
        })

        setCommentM(false)

    }

    useEffect( () => {
        if (singlePost.tags) setTags(singlePost.tags.split(','))
    }, [dispatch, singlePost.tags])


    const handleHide = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postActions.thunkCreateHidden(id))
    }

    const handleHide2 = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postActions.thunkUpdateHidden(id))
    }


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


    let comments
    if (singlePost.Comments && singlePost.Comments.length) comments = Object.values(singlePost.Comments).sort((a, b) => a.createdAt - b.createdAt)

    const scrollToTop = () => {
        const container = document.querySelector('.post-modal'); // Adjust the selector as needed
        if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            // container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }
    };

    let pHistory
    if (postsHistory) pHistory = Object.values(postsHistory)

    useEffect( () => {

        async function fetchData() {
            if (data1)  await dispatch(postActions.thunkUpdatePosts(singlePost?.id, data1))
            let data
            if (postId) {
                data =  await dispatch(postActions.thunkGetDetailsById(postId))
                setP(data)
            }


        }
        fetchData()

    }, [dispatch, data1, postId])


    useEffect( () => {

        async function fetchData() {

            if (singlePost.PostSetting && singlePost.PostSetting.history) await dispatch(postActions.thunkUpdateHistory(postId))
            else if (!singlePost.PostSetting || singlePost.PostSetting && !singlePost.PostSetting.history) await dispatch(postActions.thunkCreateHistory(postId))

        }
        fetchData()

    }, [dispatch, postId])


    function isURLOrFile(str) {
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        if (urlRegex) return urlRegex.test(str);
        const filePathRegex = /^[a-zA-Z]:\\([a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\\)*[a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\.\w{1,}$/;
        if (filePathRegex) return filePathRegex.test(str);
    }

    let editMenu = isVisible ? "edit-menu" : "hidden";
    let editMenu2 = isVisible3 ? "edit-menu" : "hidden";


    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10));

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const newRandomNum = Math.floor(Math.random() * 101);
        setRandomNum(newRandomNum);
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);


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

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if ((modalRef2.current && !modalRef2.current.contains(event.target)) && (targetRef2.current && !targetRef2.current.contains(event.target)) && (targetRef3.current && !targetRef3.current.contains(event.target))) {
                closeModal();

            }

        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, []);


    const countReply = function(comments) {
        let count = 0; // Initialize the count

        for (let comment of comments) {
            // Add the number of replies for the current comment
            count += comment.Replies ? comment.Replies.length : 0;

            // Recursively count replies for nested comments
            if (comment.Replies?.length) {
                count += countReply(comment.Replies);
            }
        }

        return count;
    };


    useEffect(() => {

    const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
                    setIsVisible3(false);
            }
        if ((targetRef5.current && !targetRef5.current.contains(event.target))) {
                setIsVisible(false);
        }

        if ((targetRef6.current && !targetRef6.current.contains(event.target))) {
            setHiddenbox(false);
        }



        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, []);


    if (!Object.values(singlePost).length) return <h1></h1>

    let createdAt
    if (singlePost.Community && Object.values(singlePost?.Community)?.length) createdAt = new Date(singlePost?.Community.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

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

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    let style
        if (singlePost.Community?.CommunityStyle) style = singlePost.Community.CommunityStyle.highlight

    function isLink(text) {
        // Regular expression to match a URL
        const urlRegex = /(https?:\/\/[^\s]+)/;

        return urlRegex.test(text);
    }


  function openEmailClient() {
    const emailAddress = 'thandimpofu2003@gmail.com';  // Replace with the desired recipient's email address
    const subject = 'Subject of the Email';  // Replace with the desired subject
    const body = 'Body of the Email';  // Replace with the desired body

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

    if (sComments2.length && comments?.length) {
        if (sComments2 === "Best") {
            comments = comments.sort((a, b) => b.Votes?.length - a.Votes?.length)
        }
        else if (sComments2 === "Top") {
            comments = comments.sort((a, b) => b.Votes?.filter((v) => v.upVote == 1).length - a.Votes?.filter((v) => v.upVote == 1).length)
        }
        else if (sComments2 === "New") {
            comments = comments.sort((a, b) => b.createdAt - a.createdAt)
        }
        else if (sComments2 === "Old") {
            comments = comments.sort((a, b) => b.createdAt - a.createdAt).reverse()
        }
        else if (sComments2 === "Controversial") {
            comments = comments.sort((a, b) => b.Votes?.filter((v) => v.downVote == 1).length - a.Votes?.filter((v) => v.downVote == 1).length)
        }
        else {
            comments = comments.sort((a, b) => b.Votes?.length - a.Votes?.length)
        }
    }

    if (sComments.length) comments = comments.filter((c) => c.comment.toLowerCase().includes(sComments.toLowerCase()))
   // let thread = comments

    return (
        <div className="post-modal">
            <div id="one">
                <div ref={targetRef3} id="post-details-head">
                <div>
                <div id="line5"></div>
                <PostLikes post={singlePost} p={"post"} h={true}
                />
                <div id="line5"></div>
                <i class="fi fi-rr-picture"></i>
                <span id="t-head">{singlePost.title}</span>
                </div>
                <span onClick={(() => {
                    setScroll(false)
                    setThreadId(null)
                    closeModal()})} id="close-head"><i class="fi fi-rr-cross-small"></i>Close</span>
                </div>
                <div id="2">
        <div ref={targetRef2} className="whole-post-page2">
            <div style={{ position: "relative" }} className="post-page">
            <div id="vote-side">
                <PostLikes post={singlePost} p={"post"}
                />
            </div>
            <div id="details-side">
            <div id="nameOf3">
                    {singlePost.Community?.CommunityStyle?.icon && <img src={singlePost.Community?.CommunityStyle?.icon}></img>}
                    {!singlePost.Community?.CommunityStyle?.icon && <div id="pfp30" style={{ color: "white", backgroundColor: `${singlePost.Community.CommunityStyle?.base}`}}>l/</div>}
                    <span id="community">l/{singlePost.Community?.name}</span>
                    <p>·</p>
                    <p style={{ display: "flex", width: "100%", alignItems: "center"}} >Posted by l/{singlePost?.User?.username} {getTimeDifferenceString(singlePost.createdAt)}<i style={{ fontSize: "20px", marginRight: "1%", marginTop: "0.6%", position: "absolute", right: "0" }} onClick={((e) => {
                                        e.stopPropagation()
                                        window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))
                                    })}class="fi fi-rs-cowbell"></i></p>

                    {/* <p>Posted by u/{singlePost.User?.username} {getTimeDifferenceString(singlePost.createdAt)}</p> */}
                    </div>
            <h1>{singlePost?.title}</h1>
            <span id="tags">{ tags && tags.includes("oc") ? <div id="oc6">OC</div> : null} {tags && tags.includes("spoiler") ? <div id="spoiler6">Spoiler</div> : null } { tags && tags.includes("nsfw") ? <div id="nsfw6">NSFW</div> : null}</span>
            <div id="post-info1">
                        { isVisible2 ? null : !isLink(singlePost.description) ? <p>{singlePost?.description}</p> : null}
                        { isVisible2 ? null : isLink(singlePost.description) ? <a href={`${singlePost?.description}`}>{singlePost?.description}</a> : null}            { isVisible2 ? <div className="post-input7">
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
            { isVisible2 ? <div id="save"><button style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}} onClick={((e) => {
                e.stopPropagation()
                handleClick2()
                })} >Cancel</button>
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
                    })}>Save</button>}
                    </div> : null}
            {!user || (user && singlePost.User?.id !== user.id) ? <div id="post-extras3">
                    <div style={{ backgroundColor: "transparent"}} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{comments && comments.length ? Object.values(postsReplies).length : "0"} Comments</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    { !singlePost.PostSetting || !singlePost.PostSetting.saved ? <div onClick={(() => {
                      singlePost.PostSetting ? handleSaved2(singlePost.id) : handleSaved2(singlePost.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div> :
                    <div onClick={(() => {
                      handleUnsaved(singlePost.PostSetting.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                    </div>
                    }
                    <i id="hideP" style={{ padding: "0.5%"}} ref={targetRef6} onClick={((e) => {
                      e.stopPropagation()
                      setHiddenPost(singlePost.id)
                      setHiddenbox(!hiddenBox)}
                      )} class="fi fi-rr-menu-dots">
                      {hiddenBox && hiddenPost == singlePost.id && <div id="hp">
                        <span onClick={(() => {
                            if (!user) setModalContent(<SignupFormModal />)
                            window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                            })}><i class="fi fi-rr-volume-mute"></i>Mute l/help</span>
                        {singlePost.PostSetting?.hidden ?
                            <span onClick={(() => {
                            if (!user) setModalContent(<SignupFormModal />)
                            handleUnhide(singlePost.PostSetting.id)
                            })} ><i class="fi fi-rr-eye-crossed"></i>Unhide</span> :
                            <span onClick={(() => {
                            if (!user) setModalContent(<SignupFormModal />)
                            singlePost.PostSetting ? handleHide2(singlePost.id) : handleHide(singlePost.id)
                            })} ><i class="fi fi-rr-eye-crossed"></i>Hide</span> }
                        <span onClick={(() => {
                            if (!user) setModalContent(<SignupFormModal />)
                            window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                            })}><i class="fi fi-rr-flag"></i>Report</span>
                      </div>}
                    </i>
            </div>
             :
             <div id="post-extras1">
                <div style={{ backgroundColor: "transparent"}} id="comment5">
                <i class="fa-regular fa-message"></i>
                <p>{comments && comments.length ? Object.values(postsReplies).length : "0"}</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-shield"></i>
                </div>
                <div id="comment4">
                    <i class="fa-brands fa-reddit-alien"></i>
                </div>
                <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots">
                <div id="post-menu25">
                <div className="menu">
                <div ref={targetRef5} id={editMenu}>
                   {singlePost.PostImages.length && singlePost.PostImages[0].imgURL ? null : <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                   {singlePost.PostSetting?.saved && singlePost.PostSetting?.userId == user?.id ? <p onClick={((e) => {
                        e.stopPropagation()
                         handleUnsaved(singlePost.PostSetting.id)
                    })}><i class="fi fi-rr-bookmark-slash"></i>Unsave</p> :
                    <p onClick={((e) => {
                        e.stopPropagation()
                        singlePost.PostSetting ? handleSaved2(singlePost.id) : handleSaved2(singlePost.id)
                    })}><i class="fi fi-rr-bookmark"></i>Save</p>}
                   { singlePost.PostSetting?.hidden && singlePost.PostSetting?.userId == user?.id ? <p onClick={((e) => {
                        handleUnhide(singlePost.PostSetting.id)
                    })}><i class="fi fi-rr-eye-crossed"></i>Unhide</p> :
                    <p onClick={((e) => {
                        e.stopPropagation()
                        if (!user) setModalContent(<SignupFormModal />)
                        singlePost.PostSetting ? handleHide2(singlePost.id) : handleHide(singlePost.id)
                    })}><i class="fi fi-rr-eye-crossed"></i>Hide</p>}
                    <p onClick={(() => {
                        setModalContent2(<div> <DeletePost id={singlePost.id} /></div>)
                        setIsVisible(false)
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
                </i>
            </div> }
            <div id="insights">
                <p>Post Insights</p>
                <p>Check back later to see views, shares, and more. <span onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}}>Share your post</span> to spread the word!</p>
            </div>
            <div className="comment-input">
               {user ? <p>Comment as <span style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}} >{user.username}</span></p> : "Please login"}
                <textarea onFocus={(() => setFocus(true))} onBlur={(() => setFocus(false))} value={comment} onChange={((e) => setComment(e.target.value))} placeholder="What are your thoughts?"></textarea>
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
                <div style={{ color: `${singlePost.Community.CommunityStyle.highlight}`}} id="sort-comments">
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
                    <div id="divider16"></div>
                    <div>
                    <i id="searchI" class="fi fi-rs-search-heart"></i>
                    <input onChange={((e) => setSComments(e.target.value))} type="text" placeholder='Search comments'></input>
                    </div>
                </div>
                    <div id="go-to-c"></div>
                { !comments || !comments.length ? <div id="any-comments">
                    <i style={{ color: `${singlePost.Community.CommunityStyle.base}`}} class="fi fi-rr-comment-heart"></i>
                    <p>No Comments Yet</p>
                    <span>Be the first to share what you think</span>
                </div> :
                    <Comments replyId={replyId} />
                 }
            </div>
            </div>
            </div>
            <div className="side-community2">
                { singlePost.Community.type === "Profile" ? <CommunitiesProfile community={singlePost.Community} /> :
                 <div onClick={(() => {
                    history.push(`/communities/${singlePost.Community.id}/:page`)
                    closeModal()
                     })} id="your-community-profile">
                     {!isURLOrFile(singlePost.Community?.CommunityStyle.banner) ? <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} id="header-profile-comm4">
                    </div> : <div className="header-postC"><img id="header-profile-comm10" src={singlePost.Community.CommunityStyle.banner} ></img></div> }
                    <div id="profile-content">
                        <span id="profile-comm-title7"> { singlePost.Community?.CommunityStyle.icon ? <img id="pfp10" src={singlePost.Community.CommunityStyle.icon}></img> : <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}}id="pfp10">l/</div>} {singlePost.Community?.name}</span>
                        <span id="profile-about7">{singlePost.Community?.about}</span>
                        <span id="when-created"><i class="fi fi-rr-cake-birthday"></i>Created {formattedDate}</span>
                        <div id="line"></div>
                        <div id="cs-side9">
                        <span><div>{singlePost.Community?.CommunityMembers}</div>Members</span>
                         <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                        </div>
                        {user && <div id="line"></div> }
                        {user && myMemberships.length && joined && !button ? <button  onMouseEnter={(() => setButton(true))} style={{ color: `${singlePost.Community.CommunityStyle.highlight}`, border: `1px solid ${singlePost.Community.CommunityStyle.highlight}`, width: "100%"}} onClick={handleUnjoinClick} id="joined">Joined</button> : null }
                        {user && myMemberships.length && joined && button ? <button  onMouseLeave={(() => setButton(false))} style={{ backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle.highlight, 0.1)}`, color: `${singlePost.Community.CommunityStyle.highlight}`, border: `1px solid ${singlePost.Community.CommunityStyle.highlight}`, width: "100%"}} onClick={handleUnjoinClick} id="joined">Leave</button> : null }
                        {user && !myMemberships.length && !joined ? <button style={{ backgroundColor: `${singlePost.Community.CommunityStyle.highlight}`, border: `1px solid ${singlePost.Community.CommunityStyle.highlight}`, width: "100%"}} onClick={handleJoinClick} id="join">Join</button> : null }
                        <div id="line"></div>
                        <div id="cs-side5">
                        <span>COMMUNITY OPTIONS</span>
                        <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                </div> }
                { singlePost.Community.type !== "Profile" && <div id="side-bar7">
                <div style={{ backgroundColor: `${singlePost.Community.CommunityStyle.base}`}} id="cs-background7">
                <p>Moderators</p>
                </div>
                <div id="home-section7">
                { singlePost.Community.id === 10 && !message && <button onClick={(() => openEmailClient())} onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${singlePost.Community?.CommunityStyle?.highlight}`, color: `${singlePost.Community?.CommunityStyle?.highlight}`}} id="but4"><i class="fi fi-rr-envelope"></i> Message the creator</button>}
                { singlePost.Community.id === 10 && message && <button  onClick={(() => openEmailClient())} onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(singlePost.Community?.CommunityStyle?.highlight, 0.1)}`, borderColor: `${singlePost.Community?.CommunityStyle?.highlight}`, color: `${singlePost.Community?.CommunityStyle?.highlight}`}} id="but4"><i class="fi fi-rr-envelope"></i> Message the creator</button>}
                { singlePost.Community.id !== 10 && !message && <button onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${singlePost.Community?.CommunityStyle?.highlight}`, color: `${singlePost.Community.CommunityStyle?.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
                { singlePost.Community.id !== 10 && message && <button onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle?.highlight, 0.1)}`, borderColor: `${singlePost.Community?.CommunityStyle?.highlight}`, color: `${singlePost.Community?.CommunityStyle?.highlight}`}} onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
                <div id="cs-side7">
                    {user?.id !== singlePost.User?.id ? <span style={{ color: `${singlePost.Community.CommunityStyle?.highlight}`}} onClick={(() => {
                        history.push(`/profile2/${singlePost.User?.id}/:page`)
                        closeModal()
                        })}> {singlePost.User?.username}</span> : "" }
                    {user?.id === singlePost.User?.id ? <span style={{ color: `${singlePost.Community?.CommunityStyle?.highlight}`}} onClick={(() => {
                        history.push(`/profile/:page`)
                        closeModal()
                        })}> {singlePost.User?.username}</span> : "" }
                    <span style={{ color: `${singlePost.Community?.CommunityStyle?.highlight}`}} >VIEW ALL MODERATORS</span>
                </div>
                </div>
                </div> }
                { !scrollH && <button onMouseEnter={(() => setScrollH(true))} style={{ backgroundColor: `${singlePost.Community.CommunityStyle?.base}`}} className="top2" onClick={scrollToTop}>Back to Top</button>}
                { scrollH && <button onMouseLeave={(() => setScrollH(false))} style={{ backgroundColor: `${reduceOpacity(singlePost.Community.CommunityStyle?.base, 0.5)}`}} className="top2" onClick={scrollToTop}>Back to Top</button>}
                </div>
                </div>
                </div>
        </div>
        </div>
    )
}

export default PostPageModal
