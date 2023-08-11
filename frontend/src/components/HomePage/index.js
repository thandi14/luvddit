import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import * as communitiesActions from "../../store/communities"


function HomePage() {
    const posts = useSelector((state) => state.posts.posts);
    const communities = useSelector((state) => state.communities.communities);
    const dispatch = useDispatch()

    let ePost = Object.values(posts)

    if (!ePost) return <h1>Loading...</h1>

    console.log(ePost)

    return (
        <div className="splashPage">
            <div>
                {ePost?.map((post) =>
                    <div className="post-content">
                    <p>l/{post.Community.name}</p>
                    <p>Posted by u/{post.User.username}</p>
                    <p>{post.description}</p>
                    <p>{post.Comments.length} Comments</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage
