import { csrfFetch } from "./csrf";


const GET_POSTS = 'posts/getPosts';
const GET_COMMUNITY_POSTS = 'posts/getCommunityPosts';
const GET_HISTORY = 'posts/getHistory';
const GET_OVERVIEW = 'posts/getOverview';
const GET_FAVORITES = 'posts/getFavorites';
const GET_COMMENTS = 'posts/getComments';
const ADD_HISTORY = 'posts/addHistory';
const UPDATE_HISTORY = 'posts/addHistory';
const GET_DETAILS = 'posts/getDetails';
const ADD_DETAILS = 'posts/addDetails';
const GET_UPDATES = 'posts/getUpdates';
const GET_COMMENT_DETAILS = 'posts/getCommentDetails';
const GET_COMMENT_UPDATES = 'posts/getCommentUpdates';
const GET_VOTE_DETAILS = 'posts/getVoteDetails';
const GET_VOTE_UPDATES = 'posts/getVoteUpdates';
const GET_VOTE_DETAILS2 = 'posts/getVoteDetails2';
const GET_USER_POSTS = 'posts/getUserPosts';
const GET_MORE_POSTS = 'posts/getMorePosts';
const REMOVE_POST = 'posts/removePosts'
// const REMOVE_HISTORY = 'posts/removeHistory'
const REMOVE_COMMENT = 'posts/removeComment'
const REMOVE_VOTE = 'posts/removeVote'
const REMOVE_VOTE2 = 'posts/removeVote2'

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const getCommunityPosts = (posts) => {
  return {
      type: GET_COMMUNITY_POSTS,
      posts
  }
}


const getHistory = (posts) => {
  return {
      type: GET_HISTORY,
      posts
  }
}

const getOverview = (posts) => {
  return {
      type: GET_OVERVIEW,
      posts
  }
}

const getFavorites = (posts) => {
  return {
      type: GET_FAVORITES,
      posts
  }
}

const getComments = (posts) => {
  return {
      type: GET_COMMENTS,
      posts
  }
}


const addHistory = (history) => {
  return {
      type: ADD_HISTORY,
      history
  }
}

const updateHistory = (history) => {
  return {
      type: UPDATE_HISTORY,
      history
  }
}


const getDetails = (details) => {
    return {
        type: GET_DETAILS,
        details
    }
}

const addDetails = (details) => {
  return {
      type: ADD_DETAILS,
      details
  }
}

const getUpdates = (updates) => {
  return {
      type: GET_UPDATES,
      updates
  }
}


const getCommentDetails = (details) => {
  return {
      type: GET_COMMENT_DETAILS,
      details
  }
}

const getCommentUpdates = (updates) => {
  return {
      type: GET_COMMENT_UPDATES,
      updates
  }
}

const getVoteDetails = (details) => {
  return {
      type: GET_VOTE_DETAILS,
      details
  }
}

const getVoteUpdates = (details) => {
  return {
      type: GET_VOTE_UPDATES,
      details
  }
}


const getVoteDetails2 = (details, commentId) => {
  return {
      type: GET_VOTE_DETAILS2,
      details,
      commentId
  }
}


const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

// const removeHistory = (postId) => {
//   return {
//       type: REMOVE_HISTORY,
//       postId
//   }
// }


const removeComment = (commentId) => {
  return {
      type: REMOVE_COMMENT,
      commentId
  }
}

const removeVote = (voteId, postId) => {
  return {
      type: REMOVE_VOTE,
      voteId,
      postId
  }
}

const removeVote2 = (voteId, commentId) => {
  return {
      type: REMOVE_VOTE2,
      voteId,
      commentId
  }
}



const getUserPosts = (posts) => ({
    type: GET_USER_POSTS,
    posts,
});


const loadMorePosts = (posts) => ({
  type: GET_MORE_POSTS,
  posts,
});



export const thunkGetAllPosts = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts?page=${page}`);
  let data1 = await response1.json();
  dispatch(getPosts(data1));
  return response1;

}

export const thunkGetUserPosts = (id, page) => async (dispatch) => {
    let response = await fetch(`/api/posts/${id}/current?page=${page}`)
    const data = await response.json();
    dispatch(getUserPosts(data));
    return data;
};


export const thunkGetHistory = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/history?page=${page}`)
  let data1 = await response1.json();
  dispatch(getHistory(data1));
  return response1;
}

export const thunkGetFavorites = (page) => async (dispatch) => {
  console.log("HELLO????:", page)
  const response1 = await csrfFetch(`/api/posts/votes?page=${page}`)
  let data1 = await response1.json();
  dispatch(getFavorites(data1));
  return response1;
}

export const thunkGetComments = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/comments?page=${page}`)
  let data1 = await response1.json();
  dispatch(getComments(data1));
  return response1;
}

export const thunkGetOverview = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/overview?page=${page}`)
  let data1 = await response1.json();
  dispatch(getOverview(data1));
  return response1;
}

export const thunkGetCommunityPosts = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/communities?page=${page}`)
  let data1 = await response1.json();
  dispatch(getCommunityPosts(data1));
  return response1;
}


export const thunkGetHistoryDetails = (id) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/history`)
  let data1 = await response1.json();
  return data1;
}




export const thunkGetUserVotes = () => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/votes/current`)
  const data1 = await response1.json();
  return data1;
}


export const thunkGetDetailsById = (id) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/posts/${id}`)
    const data1 = await response1.json();
    dispatch(getDetails(data1));
    return data1;
}


export const thunkCreatePost = (data, id, img) => async (dispatch) => {
  if (Object.values(data).length) {
        const response = await csrfFetch(`/api/communities/${id}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })

        const data1 = await response.json()
        const postId = data1.id

        if (Object.values(img).length) {
        const response2 = await csrfFetch(`/api/posts/${postId}/images`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(img)
        })
        }

        dispatch(getDetails(data1))
        return data1

    }
}

export const thunkUpdatePosts = (id, data) => async (dispatch) => {
    if (Object.values(data).length) {
        const response = await csrfFetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const data1 = await response.json()
        dispatch(getUpdates(data1))
       // console.log("REDUCER", data1)
        return response
    }
}

export const thunkDeletePosts = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    let data = await response.json()
    dispatch(removePost(id))
    return data
}

export const thunkCreateHistory = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/history`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(addHistory(data))
  return data
}

export const thunkUpdateHistory = (id) => async (dispatch) => {
  console.log("REDUCER", id)
  const response = await csrfFetch(`/api/posts/${id}/history`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(updateHistory(data))
  return data
}


// export const thunkRemoveHistory = (historyId, postId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/posts/history/${historyId}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type': 'application/json'
//         },
//   })
//   let data = await response.json()
//   console.log("IS THIS WORKING?", data)
//   dispatch(removeHistory(postId))
//   return data
// }



export const thunkDeleteVote = (id, postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/votes/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeVote(id, postId))
  return data
}

export const thunkCreateVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/votes?boolean=${boolean}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteDetails(data))
  return data
}

export const thunkUpdateVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/votes?boolean=${boolean}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteUpdates(data))
  return data
}


export const thunkCreateCommentVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/comment/${id}/votes?boolean=${boolean}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteDetails2(data, id))
  return data
}

export const thunkDeleteCommentVote = (id, commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/votes/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeVote2(id, commentId))
  return data
}


export const thunkCreateComment = (data, id) => async (dispatch) => {
  if (Object.values(data).length) {
      const response = await csrfFetch(`/api/posts/${id}/comment`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      })

      const data1 = await response.json()
      dispatch(getCommentDetails(data1))
      return data1

  }
}

export const thunkUpdateComment = (data, id) => async (dispatch) => {
  if (Object.values(data).length) {
      const response = await csrfFetch(`/api/comments/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      })

      const data1 = await response.json()
      dispatch(getCommentUpdates(data1))
      return data1

  }
}

export const thunkDeleteComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeComment(id))
  return data
}




// export const addPostImages = (id, data) => async (dispatch) => {
//     const response = await csrfFetch(`/api/posts/${id}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     return response
// }


let initialState = {
    posts: {},
    userPosts: {},
    singlePost: {},
    communityPosts: {},
    removedPost: {},
    postsHistory: {},
    postsFavorites: {},
    postsComments: {},
    postsOverview: {}
};


const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state };
      action.posts.forEach(
        (post) => (newState.posts[post.id] = { ...post})
      );
      return newState;
    case GET_COMMUNITY_POSTS:
        newState = { ...state };
        action.posts.forEach(
          (post) => (newState.communityPosts[post.id] = { ...post})
        );
    return newState;
    case GET_USER_POSTS: {
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.userPosts[post.id] = { ...post})
      );
      return newState;
    }
    case GET_OVERVIEW: {
      newState = { ...state };
      let posts1 = action.posts.posts
      let comments = action.posts.comments
      let posts = posts1.concat(comments)
      posts.forEach(
        (post) => (newState.postsOverview[post.id] = { ...post})
      );
      return newState;
    }
    case GET_HISTORY: {
      newState = { ...state };
      action.posts.forEach(
        (history) => (newState.postsHistory[history.Post.id] = { ...history.Post })
      );
      return newState;
    }
    case GET_FAVORITES: {
      newState = { ...state };
      console.log(action.posts)
      action.posts.forEach(
        (favorite) => (newState.postsFavorites[favorite.Post.id] = { ...favorite.Post })
      );
      return newState;
    }
    case GET_COMMENTS: {
      newState = { ...state };
      action.posts.forEach(
        (comment) => (newState.postsComments[comment.Post.id] = { ...comment.Post })
      );
      return newState;
    }
    case ADD_DETAILS: {
      newState = { ...state };
      const post = action.details;
      newState.singlePost = { ...post };
      ///newState.posts = { ...post };
      return newState;
    }
    case ADD_HISTORY: {
      newState = { ...state };
      const history = action.history;
      newState.postsHistory[history.Post?.id] = { ...history.Post };
      ///newState.posts = { ...post };
      return newState;
    }
    case UPDATE_HISTORY: {
      newState = { ...state };
      const history = action.history;
      newState.postsHistory = newState.postsHistory.filter((h) => h.Post.id !== history.Post.id)
      newState.postsHistory[history.Post?.id] = { ...history.Post };
      ///newState.posts = { ...post };
      return newState;
    }
    case GET_DETAILS: {
        newState = { ...state };
        const post = action.details;
        newState.singlePost = { ...post };
       // newState.posts.push(post)
        return newState;
    }
    case GET_VOTE_DETAILS: {
      newState = { ...state };
      const vote = action.details;
      if (Object.values(newState.singlePost).length) newState.singlePost.Votes.push(vote);
       //newState.posts[vote.postId].Votes.push(vote)
       if (newState.userPosts[vote.postId]) {
        newState.userPosts[vote.postId].Votes.push(vote)
      }
      if (newState.postsFavorites[vote.postId]) {
        newState.postsFavorites[vote.postId].Votes.push(vote)
      }
      if (newState.postsComments[vote.postId]) {
        newState.postsComments[vote.postId].Votes.push(vote)
      }
      if (newState.postsOverview[vote.postId]) {
        newState.postsOverview[vote.postId].Votes.push(vote)
      }
      if (newState.communityPosts[vote.postId]) {
        newState.communityPosts[vote.postId].Votes.push(vote)
      }
      if (newState.postsHistory[vote.postId]) {
        newState.postsHistory[vote.postId].Votes.push(vote)
      }
      console.log("REDUCER", newState.posts)
      return newState;
    }
    case GET_VOTE_UPDATES: {
      newState = { ...state };
      const vote = action.details;
      let votes = newState.singlePost.Votes
      let votes2 = newState.posts[vote.postId]?.Votes ? newState.posts[vote.postId].Votes : false
      let votes3 = newState.userPosts[vote.postId]?.Votes
      let votes4 = newState.postsFavorites[vote.postId]?.Votes
      let votes5 = newState.postsComments[vote.postId]?.Votes
      let votes6 = newState.postsOverview[vote.postId]?.Votes
      let votes7 = newState.communityPosts[vote.postId]?.Votes
      let votes8 = newState.postsHistory[vote.postId]?.Votes
      if (votes) newState.singlePost.Votes = votes.filter((v) => v.id !== vote.id)
      if (Object.values(newState.singlePost).length) newState.singlePost.Votes.push(vote);
      if (votes2) newState.posts[vote.postId].Votes = votes2.filter((v) => v.id !== vote.id)
      if (votes2) newState.posts[vote.postId].Votes.push(vote)
      if (votes3) {
        newState.userPosts[vote.postId].Votes = votes3.filter((v) => v.id !== vote.id)
        newState.userPosts[vote.postId].Votes.push(vote)
      }
      if (votes4) {
        newState.postsFavorites[vote.postId].Votes = votes4.filter((v) => v.id !== vote.id)
        newState.postsFavorites[vote.postId].Votes.push(vote)
      }
      if (votes5) {
        newState.postsComments[vote.postId].Votes = votes5.filter((v) => v.id !== vote.id)
        newState.postsComments[vote.postId].Votes.push(vote)
      }
      if (votes6) {
        newState.postsOverview[vote.postId].Votes = votes6.filter((v) => v.id !== vote.id)
        newState.postsOverview[vote.postId].Votes.push(vote)
      }
      if (votes7) {
        newState.communityPosts[vote.postId].Votes = votes7.filter((v) => v.id !== vote.id)
        newState.communityPosts[vote.postId].Votes.push(vote)
      }
      if (votes8) {
        newState.postsHistory[vote.postId].Votes = votes8.filter((v) => v.id !== vote.id)
        newState.postsHistory[vote.postId].Votes.push(vote)
      }
      console.log("REDUCER", newState.posts)
      return newState;
    }
    case GET_VOTE_DETAILS2: {
      newState = { ...state };
      const vote = action.details;
      if (Object.values(newState.singlePost.Comments).length) newState.singlePost.Comments.filter((c) => c.id === action.commentId)[0].Votes[vote.id] = { ...vote };
      return newState;
    }
    case REMOVE_VOTE: {
      newState = { ...state };
      let votes = newState.singlePost.Votes
      let votes2
      if (newState.posts[action.postId].Votes.length) votes2 = newState.posts[action.postId].Votes
      let votes3 = newState.userPosts[action.postId]?.Votes
      let votes4 = newState.postsFavorites[action.postId]?.Votes
      let votes5 = newState.postsComments[action.postId]?.Votes
      let votes6
      if (newState.postsOverview[action.postId].Votes.length) votes6 = newState.postsOverview[action.postId].Votes
      let votes7 = newState.communityPosts[action.postId]?.Votes
      let votes8 = newState.postsHistory[action.postId]?.Votes
      if (votes) newState.singlePost.Votes = votes.filter((v) => v.id !== action.voteId)
      newState.posts[action.postId].Votes = votes2.filter((v) => v.id !== action.voteId)
      if (votes3) newState.userPosts[action.postId].Votes = votes3.filter((v) => v.id !== action.voteId)
      if (votes4) newState.postsFavorites[action.postId].Votes = votes4.filter((v) => v.id !== action.voteId)
      if (votes5) newState.postsComments[action.postId].Votes = votes5.filter((v) => v.id !== action.voteId)
      if (votes6) newState.postsOverview[action.postId].Votes = votes6.filter((v) => v.id !== action.voteId)
      if (votes7) newState.communityPosts[action.postId].Votes = votes7.filter((v) => v.id !== action.voteId)
      if (votes8) newState.postsHistory[action.postId].Votes = votes8.filter((v) => v.id !== action.voteId)
      return newState;
    }
    case REMOVE_VOTE2: {
      newState = { ...state };
      let votes = newState.singlePost.Votes
      if (Object.values(newState.singlePost.Comments).length) newState.singlePost.Comments.filter((c) => c.id === action.commentId)[0].Votes = votes.filter((v) => v.id !== action.voteId)
      return newState;
    }
    case GET_UPDATES: {
      newState = { ...state };
      const post = action.updates;
      newState.singlePost = { ...post };
      newState.posts[post.id] = { ...post }
      return newState;
    }
    case GET_COMMENT_DETAILS: {
      newState = { ...state };
      let comment = action.details;
      newState.singlePost.Comments[comment.id] = comment
      let post = newState.posts[comment.postId]
      if (post && post.Comments) post.Comments[comment.id] = comment
      return newState
    }
    case GET_COMMENT_UPDATES: {
      newState = { ...state };
      let comment = action.updates;
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== comment.id)
      newState.singlePost.Comments[comment.id] = comment
      let post = newState.posts[comment.postId]
      if (post && post.Comments) post.Comments[comment.id] = comment
      return newState
    }
    case REMOVE_POST: {
        newState = { ...state };
        newState.posts = { ...newState.posts };
        newState.userPosts = { ...newState.userPosts };
        newState.communities = { ...newState.communities };
        newState.singlePost = {};
        delete newState.posts[action.id];
        delete newState.postsHistory[action.id];
        return newState;
    }
    case REMOVE_COMMENT: {
      newState = { ...state };
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== action.commentId);
      let post = newState.posts[newState.singlePost.id]
      post.Comments = post.Comments.filter((c) => c.id !== action.commentId)
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer
