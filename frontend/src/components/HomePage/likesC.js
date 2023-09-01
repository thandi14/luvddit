import * as postsActions from '../../store/posts'
const { useState, useEffect } = require("react")
const { useDispatch, useSelector } = require("react-redux")




function CommentLikes({ post, vote, downVote }) {
    const { user } = useSelector((state) => state.session)
    const [ userVotes, setUserVotes ] = useState([])
    const [ boolean, setBoolean ] = useState(vote)
    const [ boolean2, setBoolean2 ] = useState(downVote)
    const [ voted, setVoted ] = useState([])
    const [ voted1, setVoted1 ] = useState([])
    const [ data1, setData1 ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ add, setAdd ] = useState(null)
    const [ sub, setSub] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {

        async function fetchData() {
          let data
          if (user) data = await dispatch(postsActions.thunkGetUserVotes())
          setUserVotes(data)

        }

          fetchData()


        }, [dispatch, post])

        useEffect(() => {
            if (userVotes && userVotes.length) setVoted(userVotes.filter((l) => l.postId === post.id && l.upVote === 1))
            if (userVotes && userVotes.length) setVoted1(userVotes.filter((l) => l.postId === post.id && l.downVote === 1))
        }, [userVotes, vote, downVote, post])



        const handleFavoriteClick = async () => {
                if ((vote && voted.length) || boolean && !downVote) {
                    setBoolean(false)
                    setBoolean2(false)
                    setAdd(0)
                    let response
                    if (data && data.id) response = await dispatch(postsActions.thunkDeleteVote(data.id))
                    setData({})
                    if (voted[0]) await dispatch(postsActions.thunkDeleteVote(voted[0].id))
                    setVoted([])

                }
                else if (downVote || boolean2) {
                    let response
                    setBoolean2(false)
                    if (voted1[0]) await dispatch(postsActions.thunkDeleteVote(voted1[0].id))
                    setVoted1(false)
                    downVote = []
                    if (data1 && data1.id) response = await dispatch(postsActions.thunkDeleteVote(data1.id))
                    setData1({})
                    let data2 = await dispatch(postsActions.thunkCreateVote(post.id, 1))
                    setData(data2)
                    setBoolean(true)
                }
                else {
                    if (voted || !voted.length) {
                        setAdd(1)
                        setBoolean(true)
                        let data2 = await dispatch(postsActions.thunkCreateVote(post.id, 1))
                        setData(data2)
                    }
                }
        };

        const handleFavoriteClick2 = async () => {
            if ((downVote && voted1.length) || boolean2 && !vote) {
                setBoolean2(false)
                setBoolean(false)
                setAdd(0)
                let response
                if (data1 && data1.id) response = await dispatch(postsActions.thunkDeleteVote(data1.id))
                setData1({})
                if (voted1[0]) await dispatch(postsActions.thunkDeleteVote(voted1[0].id))
                setVoted1([])

            }
            else if (vote || boolean) {
                let response
                setBoolean(false)
                vote = []
                if (data && data.id) response = await dispatch(postsActions.thunkDeleteVote(data.id))
                setData({})
                if (voted[0]) response = await dispatch(postsActions.thunkDeleteVote(voted[0].id))
                setVoted([])
                let data2 = await dispatch(postsActions.thunkCreateVote(post.id, 0))
                setData1(data2)
                setBoolean2(true)
            }
            else {
                if (!voted || !voted1.length) {
                    let data2 = await dispatch(postsActions.thunkCreateVote(post.id, 0))
                    setData1(data2)
                    setAdd(1)
                    setBoolean2(true)

                }
            }
    };



    return (
        <>
         <div id={h ? "upvote2" : "upvote"} onClick={((e) => e.stopPropagation())} >
        { (data && boolean) && (!boolean2) || (voted.length && !data) ? <i id={h ? "upvoted2" : "upvoted"}
        onClick={handleFavoriteClick}
        class="fi fi-rs-heart"></i>
        :
        <i id={h ? "upvote2" : "upvote"}
        onClick={handleFavoriteClick}
        class="fi fi-rs-heart"></i>}
        </div>
        {add ? <span>{ post.votes + post.downVotes + 1 }</span> : null }
        { !add && post.downVotes + post.votes !== 0 ? <span>{post.votes + post.downVotes}</span> : null}
        {post.votes + post.downVotes === 0 && !add ? <span>{p === "post" ? 0 : "Vote"}</span> : null }
        <div id={h ? "downvote2" : "downvote"} onClick={((e) => e.stopPropagation())} >
        { (boolean2 && data1) && (!boolean) || (voted1.length && !data1)? <i
        id={h ? "downvoted2" : "downvoted"}
        onClick={handleFavoriteClick2}
        class="fi fi-rs-heart-crack"></i> :
        <i
        id={h ? "downvote2" : "downvote"}
        onClick={handleFavoriteClick2}
        class="fi fi-rs-heart-crack"></i>}
        </div>

        </>
    )
}

export default CommentLikes
