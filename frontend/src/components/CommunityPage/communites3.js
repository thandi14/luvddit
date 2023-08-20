import { useState, useEffect } from 'react';
import './CommunityPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as communityActions from '../../store/communities'



function YourCommunitesProfile() {
    const { communities, singleCommunity, communityMemberships } = useSelector((state) => state.communities);
    const { posts } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.session);
    const history = useHistory()
    const [isVisible, setIsVisible] = useState(false)
    const [ about, setAbout ] = useState("");
    const [ data1, setData1 ] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = async () => {

        if (about) {
            setData1({
                about,
             })

        }


    }

    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 101));

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const newRandomNum = Math.floor(Math.random() * 101);
        setRandomNum(newRandomNum);
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    console.log(singleCommunity)

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(communityActions.thunkUpdateCommunities(singleCommunity.id, data1))
            if (response) {
                history.push(`/communities/${response.id}`)
                setIsVisible(!isVisible)
                // window.location.reload();
            }

        }
        fetchData()

    }, [dispatch, data1])

    // let randomNum = 0

    // setTimeout(() => {
    //     randomNum = Math.floor(Math.random() * 101)

    // }, 10000)

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
                    {singleCommunity.userId === user.id ? <p id="seven"><span id="tools"><i class="fi fi-rs-shield"></i>MOD TOOLS</span><i class="fi fi-rr-menu-dots"></i></p> : <i id="comm-sets" class="fi fi-rr-menu-dots"></i>}
                </div>
                <div id="home-section">
                <div id="cs-side1">
                    {!singleCommunity.about && !isVisible ? <button onClick={(() => setIsVisible(!isVisible))} id="add-about">Add description</button> : null}
                    {isVisible ? <div className="about-edit">
                    <input maxLength={500} defaultValue={singleCommunity?.about} onChange={((e) => setAbout(e.target.value))} placeholder="Tell us about your community" id="input-about" type="text"></input>
                    <div id="edit-about"><span>{500 - about.length} Characters remaining</span><div><span onClick={(() => setIsVisible(!isVisible))}>Cancel</span><span onClick={handleSubmit}>Save</span></div></div>
                    </div> : null}
                    {singleCommunity.about && !isVisible ? <span id={user.id === singleCommunity.userId ? "can-you-edit" : ""} onClick={(() => setIsVisible(!isVisible))}>{singleCommunity.about}{user.id === singleCommunity.userId ? <i id="edit-icon4" class="fi fi-rr-magic-wand"></i> : null} </span> : null}
                    <span><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
                </div>
                <div id="line"></div>
                <div id="cs-side2">
                    <span><div id="online">{singleCommunity.CommunityMembers}</div>Members</span>
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
