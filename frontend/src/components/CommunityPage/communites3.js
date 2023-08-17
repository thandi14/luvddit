import './CommunityPage.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function YourCommunitesProfile() {
    const { communities, singleCommunity } = useSelector((state) => state.communities);
    const { posts } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.session);
    const history = useHistory()

    const randomNum = Math.floor(Math.random() * 101)

    let createdAt
    if (Object.values(singleCommunity).length) createdAt = new Date(singleCommunity.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    return (
            <div className="home-section">
                <div id="cs-background">
                    <p>About Community</p>
                    <p><i class="fi fi-rs-shield"></i>MOD TOOLS<i class="fi fi-rr-menu-dots"></i></p>
                </div>
                <div id="home-section">
                <div id="cs-side1">
                    <span>{singleCommunity.about}</span>
                    <span><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
                </div>
                <div id="line"></div>
                <div id="cs-side2">
                    <span><div>{singleCommunity.CommunityMembers}</div>Members</span>
                    <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                </div>
                <div id="line"></div>
                <div id="cs-side3">
                    <span><div>NEW</div>Community topics<i class="fi fi-rr-circle-i"></i></span>
                    <span>Add a Primary Topic<i class="fa-solid fa-chevron-down"></i></span>
                </div>
                <div id="line"></div>
                <button onClick={(() => history.push('/posts/new'))} id="but3">Create Post</button>
                <div id="line"></div>
                <div id="cs-side5">
                    <span>COMMUNITY OPTIONS</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>

                </div>
    )
}

export default YourCommunitesProfile
