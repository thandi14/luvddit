import * as postsActions from '../../store/posts'
const { useState, useEffect } = require("react")
const { useDispatch, useSelector } = require("react-redux")




function PostLikes({ post, p, h }) {
    const { user } = useSelector((state) => state.session)
    const [ userVotes, setUserVotes ] = useState(false)
    const [ boolean, setBoolean ] = useState(null)
    const [ boolean2, setBoolean2 ] = useState(null)
    const [ data1, setData1 ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ add, setAdd ] = useState(null)
    const [ sub, setSub] = useState(null)
    const dispatch = useDispatch()


    let vote

    if (post.Votes) vote = Object.values(post.Votes)



    useEffect(() => {

      async function fetchData() {
        let data
        if (user) data = await dispatch(postsActions.thunkGetUserVotes())
        setUserVotes(data)

      }

      fetchData()


    }, [dispatch, post])


    let voted

    if (vote && vote.length) voted = vote.filter((v) => v.userId === user?.id )

    let upVoted

    let downVoted

    if (voted && voted.length && voted.filter((v) => v.upVote === 1).length) {
      upVoted = true
    }
    else if (voted && voted.length && voted.filter((v) => v.downVote === 1).length) {
      downVoted = true
    }


        const handleFavoriteClick = async () => {
            if (!user) return window.alert('Please login')
            if (upVoted) {
              await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
            }
            else if (downVoted) {
              await dispatch(postsActions.thunkUpdateVote(voted[0].id, 1))
            }
            else await dispatch(postsActions.thunkCreateVote(post?.id, 1))
        }

        const handleFavoriteClick2 = async () => {
          if (!user) return window.alert('Please login')
          if (downVoted) {
            await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
          }
          else if (upVoted) {
            await dispatch(postsActions.thunkUpdateVote(voted[0].id, 0))
          }
          else await dispatch(postsActions.thunkCreateVote(post?.id, 0))
      }

    return (
        <>
        <div id={ h ? "upvote2" : "upvote"} onClick={((e) => {
            e.stopPropagation()
            handleFavoriteClick()
            })} >
        {upVoted ? <i id={ h ? "upvoted2" : "upvoted"}
       class="fi fi-rs-heart"></i> : <i id={ h ? "upvote2" : "upvote"}
       class="fi fi-rs-heart"></i> }
       </div>
       <span>{ vote && vote.length === 0 ? "Love" : vote && vote.length }</span>
       <div id={ h ? "downvote2" : "downvote"} onClick={((e) => {
          e.stopPropagation()
          handleFavoriteClick2()
        })} >
       { downVoted ? <i
       id={ h ? "downvoted2" : "downvoted"}
       class="fi fi-rs-heart-crack"></i> : <i
       id={ h ? "downvote2" : "downvote"}
       class="fi fi-rs-heart-crack"></i> }
       </div>
       </>
    )
}

export default PostLikes
