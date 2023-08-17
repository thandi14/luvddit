import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"


function CommunitiesMenu({ value }) {
    const { communities, singleCommunity, userCommunities } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) dispatch(communityActions.thunkGetDetailsById(id))

    }, [dispatch, id])

    let community = Object.values(communities)

    community = community.filter((c) => c.userId === user.id)

    let users = Object.values(userCommunities);
    
    users = users.slice(1, users.length)

    return (
        <>
        <div id="your-comms">
            <p>Your Profile</p>
            <div onClick={((e) => setId(community[0].id))} id="user-community">
            <div id='uc-img'>
            <img src={avatar}></img>
            </div>
            <div id="uc-name">
            <p>l/{community[0]?.name}</p>
            </div>
            </div>
            <div id="div2"></div>
            <div id="your-comms5">
                <p>Your communities<span>Create New</span></p>
                {users.map((u) =>
                     <div onClick={((e) => setId(u.id))} id="all-user-comms">
                        <div id="all-comms-pfp">l/</div>
                        <p>u/{u?.name}</p>
                    </div>
                )}
            </div>
        </div>
        <div id="border5">

        </div>
        </>
    )
}

export default CommunitiesMenu
