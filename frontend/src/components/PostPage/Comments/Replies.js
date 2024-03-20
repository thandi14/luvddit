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

function Replies({ postId, scroll, cId, vis3, comments, level, id, par, replyId }) {
    const { communities, singleCommunity, communityMemberships, memberships, userCommunities } = useSelector((state) => state.communities);
    const { singlePost, postsHistory } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);
    const  { setModalContent2, modalRef2 } = useModal2()
    const [isVisible2, setIsVisible2] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ data1, setData1 ] = useState({})
    const [ data2, setData2 ] = useState({})
    const [ data3, setData3 ] = useState({})
    const history = useHistory()
    const { closeModal, threadId } = useModal();
    const [ comment, setComment ] = useState("")
    const [ comment2, setComment2 ] = useState("")
    const [ comment3, setComment3 ] = useState("")
    const [ scrolling, setScrolling ] = useState(scroll)
    const [isVisible3, setIsVisible3] = useState(false);
    const [ commentId, setCommentId ] = useState(null);
    const [ c, setC ] = useState(null)
    const [ button, setButton ] = useState(false)
    const [ postH, setPostH ] = useState([])
    const [ sortComment, setSortComment ] = useState(false)
    const [ commentM, setCommentM ] = useState(vis3 ? true : false)
    const [ commentR, setCommentR ] = useState(threadId ? true : false)
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
    level++
    const [ c2, setC2 ] = useState(null)
    const [ focus5, setFocus5 ] = useState(false)
    const [ focus6, setFocus6 ] = useState(false)
    const [ length, setLength ] = useState(7)
    const [ parent, setParent ] = useState(threadId ? threadId : par)
    const [ more, setMore ] = useState(false)


    let joined = null

    useEffect(() => {

        if (scroll) setScrolling(true)
        if (!scroll) setScrolling(false)

    }, [scroll])

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


    const handleComment2 = (e) => {
        e.stopPropagation()

        if (!user) return setModalContent(<SignupFormModal />)

        setData3({
            comment: comment2
        })

        setCommentM(false)

    }

    // let comments
    // if (singlePost.Comments && singlePost.Comments.length) comments = Object.values(singlePost.Comments).sort((a, b) => a.createdAt - b.createdAt)

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(postActions.thunkCreateComment(data2, singlePost.id))
        }
        fetchData()

    }, [dispatch, data2, singlePost.id])

    useEffect( () => {

        async function fetchData() {
            let response = await dispatch(postActions.thunkUpdateComment(data3, c?.id))
        }
        fetchData()

    }, [dispatch, c, data3])

    let pHistory
    if (postsHistory) pHistory = Object.values(postsHistory)

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

        const scrollToTarget2 = () => {
            const handleScrollOrNavigate = () => {
                const targetElement = document.getElementById(`${threadId}`);
                if (targetElement && threadId) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else if (!targetElement && threadId) {
                    closeModal();
                    history.push(`/posts/${postId}/comments/${threadId}`);
                }
            };

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                handleScrollOrNavigate();
            } else {
                document.addEventListener('DOMContentLoaded', handleScrollOrNavigate);
            }
        };

        scrollToTarget2();

    }, [threadId, scroll]);

    console.log(data3, c, commentId2)

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

    // if (sComments2.length && comments?.length) {
    //     if (sComments2 === "Best") {
    //         comments = comments.sort((a, b) => b.Votes?.length - a.Votes?.length)
    //     }
    //     else if (sComments2 === "Top") {
    //         comments = comments.sort((a, b) => b.Votes?.filter((v) => v.upVote == 1).length - a.Votes?.filter((v) => v.upVote == 1).length)
    //     }
    //     else if (sComments2 === "New") {
    //         comments = comments.sort((a, b) => b.createdAt - a.createdAt)
    //     }
    //     else if (sComments2 === "Old") {
    //         comments = comments.sort((a, b) => b.createdAt - a.createdAt).reverse()
    //     }
    //     else if (sComments2 === "Controversial") {
    //         comments = comments.sort((a, b) => b.Votes?.filter((v) => v.downVote == 1).length - a.Votes?.filter((v) => v.downVote == 1).length)
    //     }
    //     else {
    //         comments = comments.sort((a, b) => b.Votes?.length - a.Votes?.length)
    //     }
    // }

    // if (sComments.length) comments = comments.filter((c) => c.comment.toLowerCase().includes(sComments.toLowerCase()))
   // let thread = comments



       // if (comments.length >= 3 ) comments = comments.splice(0, 3)

        // console.log(comments)

        const handleCommenting = (e) => {
            e.stopPropagation()

            if (!user) return setModalContent(<SignupFormModal />)

            setData3({
                comment: c2
            })

            setCommentM(false)

        }


        const handleReplying = (e) => {
            e.stopPropagation()

            if (!user) return setModalContent(<SignupFormModal />)

            setData2({
                comment: c,
                parent
            })

            setParent(null)
            setC("")

        }


        return (
            <>{level >= 7 ? null : <div style={{marginLeft: "-15px"}} id="if-comments">
            {comments.map((c, i) =>
                <div style={{ position: "relative" }}>
                {threadId == c.id ? <div id="replying"></div> : null}
               { i <= (!more ? 6 : comments.length )? <>
               <div onClick={(() => setC(c)
                    )} id={`${c.id}`} style={{ position: "relative", zIndex: "10", margin: "0px", marginTop: "5px", overflow: "hidden"}} className="a-comment">
                    <div id="left-csec">
                    { !c.Profile?.CommunityStyle ? <img id="avatar6" src={pfp}></img> : null}
                    { c.Profile?.CommunityStyle?.icon ? <img id="avatar6" src={c.Profile?.CommunityStyle.icon}></img> : null}
                    <div id="c-line"></div>
                    </div>
                    <div id="right-csec">
                        <>
                        <span><span onClick={(() => {
                            closeModal()
                            c.userId === user.id ? history.push('/profile/:page') : history.push(`/profile2/${c.userId}/:page`)})} id="username45">{c.User?.username}</span> { c.User && c.User.id === singlePost.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.createdAt)}</div></span>
                        { !(commentM && (commentId2 === c.id || cId == c.id)) ? <p>{c.comment}</p> :
                        <div className="comment-input">
                            <textarea onFocus={(() => setFocus5(true))} onBlur={(() => setFocus5(false))} defaultValue={c.comment} onChange={((e) => setComment2(e.target.value))}></textarea>
                        <div id={focus5 ? "my-comments2" : "my-comments"}>
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
                        { commentM && commentId2 === c.id ? null : <div id="comment-extras">
                            <div>
                                <CommentLikes comment={c} />
                            </div>
                            <div onClick={((e) => {
                                e.stopPropagation()
                                setParent(c.id)
                                setCommentR(!commentR)})}>
                                <i class="fa-regular fa-message"></i>
                                <p>Reply</p>
                            </div>
                            <div onClick={(() => window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")))}>
                                <i class="fi fi-rs-heart-arrow"></i>
                                <p>Share</p>
                            </div>
                            <i ref={commentId === c.id ? targetRef : null} onClick={(() => {
                                setIsVisible3(true)
                                setCommentId(c.id)
                               if (commentId === c.id) setIsVisible3(!isVisible3)
                            })} class="fi fi-rr-menu-dots">
                            { commentId === c.id ? <div className="menu">
                            <div id="comm-sec25">
                            <div onClick={((e) => e.stopPropagation())} id={editMenu2}>
                            {c.userId !== user.id ? null : <p onClick={(() => {
                                setCommentM(true)
                                setIsVisible3(false)
                                setCommentId2(c.id)
                                setC(c)
                               // if (commentId !== i) setCommentM(!commentM)
                                })}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                             {c.userId === user.id ? null : <p onClick={((e) => {
                                    e.stopPropagation()
                                    window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))
                                })}><i class="fi fi-rr-flag"></i>Report</p>}
                             {c.CommentSetting && c.CommentSetting.saved ? <p onClick={((e) => {
                                e.stopPropagation()
                                handleUnsaved2(c.CommentSetting.id)
                            })}><i class="fi fi-rr-bookmark-slash"></i>Unsave</p> : <p onClick={((e) => {
                                e.stopPropagation()
                                handleSaved2(c.id)
                            })}><i class="fi fi-rr-bookmark"></i>Save</p>}
                             {c.userId === user.id ? null : <p><i class="fi fi-rs-cowbell"></i>Follow</p>}
                             {c.userId !== user.id ? null : <p onClick={((e) => {
                                    e.stopPropagation()
                                    window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))
                                })}><i class="fi fi-rr-eye-crossed"></i>Hide</p>}
                             {c.userId !== user.id ? null : <p onClick={((e) => {
                                e.stopPropagation()
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
                { commentR && parent == c.id ? <div id="reply">
                <div id="r-line"></div>
                <div onClick={((e) => e.stopPropagation())} style={{ marginBottom: "40px" }} className="comment-input">
                            <textarea onFocus={(() => setFocus6(true))} onBlur={(() => setFocus6(false))} placeholder={"What are your thoughts?"} onChange={((e) => setC(e.target.value))}></textarea>
                        <div id={focus6 ? "my-comments2" : "my-comments"}>
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
                                setCommentR(false)
                                })}>Cancel</button>
                            <button id="submit-c2" onClick={handleReplying}>Reply</button>
                        </div>
                        </div>
                </div> : null}
                { level >= 6 && c.Replies?.length > 0 ? <div onClick={(() => {
                    closeModal()
                    history.push(`/posts/${c.postId}/comments/${c.id}`)
                    })} id="continue"><p>Continue this thread</p><i class="fi fi-rr-arrow-small-right"></i></div> : c.Replies?.length > 0 && level <= 6 ? <div onClick={((e) => e.stopPropagation())} id="replies">
                    <Replies comments={c.Replies} level={level} parent={c.parent} />
                </div> : null}
                        </>
                    </div>
                </div>
                </> : null}
                </div>
                )}
        </div>}
        {comments.length >= 6 && !more && <div onClick={(() =>setMore(true))} id="continue"><p style={{ color: `${singlePost.Community?.CommunityStyle?.base}`}}>{comments.slice(6).length - 1 < 0 ? 0 : comments.slice(6).length - 1} more replies</p></div>}
        </>
        )
    }



export default Replies
