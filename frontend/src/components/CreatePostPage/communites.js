import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"
import CreateCommunity from "../CreateCommunityModel"
import { useModal } from "../../context/Modal"


function CommunitiesMenu({ value }) {
    const { communities, singleCommunity, userCommunities, communityMemberships } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const { setModalContent } = useModal()

    useEffect(() => {
        if (id) dispatch(communityActions.thunkGetDetailsById(id))

    }, [dispatch, id])

    let community = Object.values(communities)
    let community2 = Object.values(communityMemberships)
    let community3 = Object.values(userCommunities)

    community2 = community2.map((c) => c.Community)
    let style
    if (singleCommunity.communityStyles?.length) style = singleCommunity.communityStyles[0]

    console.log("COMPONENT", community2)

    return (
        <>
        <div id="your-comms">
            <p>Your Profile</p>
            <div onClick={((e) => setId(community3[0].id))} id="user-community">
            <div id='uc-img'>
            <img src={avatar}></img>
            </div>
            <div id="uc-name">
            <p>l/{community[0]?.name}</p>
            </div>
            </div>
            <div id="div2"></div>
            <div id="your-comms5">
                <p>Your communities<span onClick={(() => setModalContent(<CreateCommunity />))}>Create New</span></p>
                {community2.map((u) =>
                     <div onClick={((e) => setId(u.id))} id="all-user-comms">
                        {u.communityStyles && u.communityStyles.length ? <img id="PFP34" src={u.communityStyles[0].profile}></img> : <div id="all-comms-pfp">l/</div>}
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
