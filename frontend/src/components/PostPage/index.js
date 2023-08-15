import './PostPage.css'
import '../CreatePostPage/CreatePostPage.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import * as postActions from '../../store/posts'
import '../CreatePostPage/CreatePostPage.css'
import CommunitiesProfile from '../CreatePostPage/communites2';
import * as communityActions from '../../store/communities'


function PostPage() {
    const { singlePost } = useSelector((state) => state.posts)
    const { singleCommunity } = useSelector((state) => state.communities)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };



    useEffect(() => {

        const handleDocumentClick = (event) => {
            console.log(isVisible)
            if (isVisible && targetRef.current && !targetRef.current.contains(event.target)) {
                setIsVisible(false);

            }

        };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
        };

    }, [isVisible]);

    useEffect( async () => {
        let data
        if (id) data = await dispatch(postActions.thunkGetDetailsById(id))
        if (data) dispatch(communityActions.thunkGetDetailsById(data.communityId))
        console.log(data)
    }, [dispatch, id])

    if (!Object.values(singlePost).length) return <h2>Loading...</h2>

    let editMenu = isVisible ? "edit-menu" : "hidden";

    console.log(singleCommunity)

    return (

    <>
    <div id="comm-head">
        <img src="https://external-preview.redd.it/2ha9O240cGSUZZ0mCk6FYku61NmKUDgoOAJHMCpMjOM.png?auto=webp&s=3decd6c3ec58dc0a850933af089fb3ad12d3a505"></img>
        <h1>l/{singleCommunity.name}</h1>
    </div>
    <div className="whole-post-page">
        <div className="post-page">
        <div id="vote-side">
            <i class="fi fi-rs-heart"></i>
            <span>{singlePost.votes + singlePost.downVotes}</span>
            <i class="fi fi-rs-heart-crack"></i>
        </div>
        <div id="details-side">
        <p>Posted by l/{singlePost?.User?.username} just now<i class="fi fi-rs-cowbell"></i></p>
        <h1>{singlePost?.title}</h1>
        <div id="post-info1">
        {singlePost.description ? <p>{singlePost?.description}</p> : null}
        {singlePost.PostImages.length ? <img id="post-image1" src={singlePost.PostImages[0].imgURL} alt="postimg"></img> : null}
        </div>
        <div id="post-extras1">
            <div id="comment5">
            <i class="fa-regular fa-message"></i>
            <p>{singlePost.Comments.length}</p>
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
            <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots"></i>
            <div className="menu">
            <div ref={targetRef} id={editMenu}>
                <p><i class="fi fi-rr-magic-wand"></i>Edit</p>
                <p><i class="fi fi-rr-bookmark"></i>Save</p>
                <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                <p><i class="fi fi-rr-trash-xmark"></i>Delete</p>
                <label>
                <input type="checkbox" />
                Mark as OC
                </label>
                <label>
                <input type="checkbox" />
                Mark as Spolier
                </label>
                <label>
                <input type="checkbox" />
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
            <p>Check back later to see views, shares, and more. <span>Share your post</span> to spread the word!</p>
        </div>
        <div className="comment-input">
            <p>Comment as <span>{singlePost?.User?.username}</span></p>
            <textarea onChange={((e) => "hello")} placeholder="What are your thoughts?"></textarea>
        <div id="my-comments">
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
        </div>
        <div className="comments-for-post">
            <div id="sort-comments">
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
            <div id="any-comments">
                <i class="fi fi-rr-comment-heart"></i>
                <p>No Comments Yet</p>
                <span>Be the first to share what you think</span>
            </div>
        </div>
        </div>
        </div>
        <div className="side-community">
        <CommunitiesProfile page={"/postId"}/>
        <button className="top2" onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button>
        </div>
    </div>
    </>
    )
}

export default PostPage
