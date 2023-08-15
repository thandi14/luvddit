import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function CommunitiesProfile({ page }) {
    const { communities, singleCommunity } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    let userCommunity = Object.values(singleCommunity)


    let createdAt
    if (userCommunity.length) createdAt = new Date(singleCommunity.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    return (
        <>
        <div className="your-community">
        <div id="profile-header"></div>
        <div id="your-community">
        <div id="yc-avatar">
        <img src={avatar}></img>
        </div>
        <div id="user-community2">
        <span>l/{userCommunity[2]}</span>
        <i class="fi fi-rr-settings"></i>
        </div>
        <button id="user-button"><p>Create Avatar</p><i class="fi fi-rr-angle-small-right"></i></button>
        <div id="community-info">
            <div>
            <span id="ci-name">Karma</span>
            <span id="ci-icon"><i class="fi fi-rr-star-christmas"></i>{user.karma}</span>
            </div>
            <div>
            <span id="ci-name">Cake day</span>
            <span id="ci-icon"><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
            </div>
        </div>
        <button id="social-button"><i class="fi fi-rr-plus"></i>Add social link</button>
        {page === "/postId" ? <button onClick={(e) => history.push('/posts/new')} id="another">New Post</button> : null}
        <div id="options-link">
        <span>More Options</span>
        </div>
        </div>
        </div>
        </>
    )
}

export default CommunitiesProfile
