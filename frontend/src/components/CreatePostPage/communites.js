import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect } from "react"
import * as communityActions from "../../store/communities"


function CommunitiesMenu({ value }) {
    const { communities, singleCommunity } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) dispatch(communityActions.thunkGetDetailsById(id))

    }, [dispatch, id])

    let userCommunity = Object.values(communities)

    userCommunity = userCommunity.filter((c) => c.userId === user.id)

    console.log(userCommunity[0])

    return (
        <>
        <div id="your-comms">
            <p>Your Profile</p>
            <div onClick={((e) => setId(userCommunity[0].id))} id="user-community">
            <div id='uc-img'>
            <img src={avatar}></img>
            </div>
            <div id="uc-name">
            <p>l/{userCommunity[0]?.name}</p>
            </div>
            </div>
            <div id="div2"></div>
        </div>
        <div id="border5">

        </div>
        </>
    )
}

export default CommunitiesMenu
