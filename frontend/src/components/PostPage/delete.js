import { useModal } from "../../context/Modal";
import "./PostPage.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as postsActions from '../../store/posts';
import { useParams } from "react-router-dom";
import DeletedPost from "./index2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeletePost({ id, deleted }){
    const { closeModal } = useModal();
    const { singlePost } = useSelector((state) => state.posts)
    const { userCommunities } = useSelector((state) => state.communities)
    const dispatch = useDispatch()
    const history = useHistory()
    let communities = Object.values(userCommunities)
    console.log(communities[0].id)
    console.log(singlePost.communityId)
    console.log(id)

    const handleClick = () => {
        dispatch(postsActions.thunkDeletePosts(id, deleted))
        if (singlePost.communityId !== communities[0].id) history.push(`/communities/${singlePost.communityId}`)
        if (singlePost.communityId === communities[0].id) history.push(`/deleted/:${deleted.title}`)
    }


    return (
        <div className="deletePost">
            <h2>Delete Post?<i onClick={(() => closeModal())} class="fi fi-rr-cross-small"></i></h2>
            <p>Are you sure you want to delete your post? You can't undo this.</p>
            <div id="delete-buttons">
            <button onClick={(() => closeModal())}>Cancel</button>
            <button onClick={(() => {
                closeModal()
                handleClick()
            })}>Delete Post</button>
            </div>
        </div>
    )
}

export default DeletePost
