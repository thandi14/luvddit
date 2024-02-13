import { csrfFetch } from "./csrf";


const GET_POSTS = 'posts/getPosts';
const GET_HOT_POSTS = 'posts/getHotPosts';
const GET_TOP_POSTS = 'posts/getTopPosts';
const GET_BEST_POSTS = 'posts/getBestPosts';
const GET_SEARCH = 'posts/getSearch';
const GET_COMMUNITY_POSTS = 'posts/getCommunityPosts';
const GET_HISTORY = 'posts/getHistory';
const GET_SAVED = 'posts/getSaved';
const GET_OVERVIEW = 'posts/getOverview';
const GET_HOT_OVERVIEW = 'posts/getHotOverview';
const GET_TOP_OVERVIEW = 'posts/getTopOverview';
const GET_FAVORITES = 'posts/getFavorites';
const GET_COMMENTS = 'posts/getComments';
const GET_HOT_COMMENTS = 'posts/getHotComments';
const GET_TOP_COMMENTS = 'posts/getTopComments';
const ADD_HISTORY = 'posts/addHistory';
const ADD_SAVED = 'posts/addSaved';
const UPDATE_HISTORY = 'posts/addHistory';
const UPDATE_SAVED = 'posts/addSaved';
const GET_DETAILS = 'posts/getDetails';
const ADD_DETAILS = 'posts/addDetails';
const GET_UPDATES = 'posts/getUpdates';
const GET_COMMENT_DETAILS = 'posts/getCommentDetails';
const GET_COMMENT_UPDATES = 'posts/getCommentUpdates';
const GET_VOTE_DETAILS = 'posts/getVoteDetails';
const GET_VOTE_UPDATES = 'posts/getVoteUpdates';
const GET_VOTE_DETAILS2 = 'posts/getVoteDetails2';
const GET_USER_POSTS = 'posts/getUserPosts';
const GET_USER_HOT_POSTS = 'posts/getUserHotPosts';
const GET_USER_TOP_POSTS = 'posts/getUserTopPosts';
const GET_MORE_POSTS = 'posts/getMorePosts';
const REMOVE_POST = 'posts/removePosts'
const REMOVE_COMMENT = 'posts/removeComment'
const REMOVE_VOTE = 'posts/removeVote'
const REMOVE_VOTE2 = 'posts/removeVote2'
const GET_HOT_COMMUNITY_POSTS = 'communities/getCommunityHotPosts';
const GET_TOP_COMMUNITY_POSTS = 'communities/getCommunityTopPosts';


const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

// const getPosts = (posts) => {
//   return {
//       type: GET_POSTS,
//       posts
//   }
// }

const getHotPosts = (posts) => {
  return {
      type: GET_HOT_POSTS,
      posts
  }
}

const getTopPosts = (posts) => {
  return {
      type: GET_TOP_POSTS,
      posts
  }
}

const getBestPosts = (posts) => {
  return {
      type: GET_BEST_POSTS,
      posts
  }
}

const getHotCommunityPosts = (communities) => {
  return {
      type: GET_HOT_COMMUNITY_POSTS,
      communities
  }
}

const getTopCommunityPosts = (communities) => {
  return {
      type: GET_TOP_COMMUNITY_POSTS,
      communities
  }
}


const getSearch = (search, result) => {
  return {
      type: GET_SEARCH,
      search,
      result
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

const getSaved = (posts) => {
  return {
      type: GET_SAVED,
      posts
  }
}

const getOverview = (posts) => {
  return {
      type: GET_OVERVIEW,
      posts
  }
}

const getHotOverview = (posts) => {
  return {
      type: GET_HOT_OVERVIEW,
      posts
  }
}

const getTopOverview = (posts) => {
  return {
      type: GET_TOP_OVERVIEW,
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

const getHotComments = (posts) => {
  return {
      type: GET_HOT_COMMENTS,
      posts
  }
}

const getTopComments = (posts) => {
  return {
      type: GET_TOP_COMMENTS,
      posts
  }
}


const addHistory = (history) => {
  return {
      type: ADD_HISTORY,
      history
  }
}

const addSaved = (saved) => {
  return {
      type: ADD_SAVED,
      saved
  }
}

const updateHistory = (history) => {
  return {
      type: UPDATE_HISTORY,
      history
  }
}

const updateSaved = (saved) => {
  return {
      type: UPDATE_SAVED,
      saved
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

const getUserHotPosts = (posts) => ({
  type: GET_USER_HOT_POSTS,
  posts,
});

const getUserTopPosts = (posts) => ({
  type: GET_USER_TOP_POSTS,
  posts,
});


export const thunkGetAllPosts = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts?page=${page}`);
  let data1 = await response1.json();
  dispatch(getPosts(data1));
  return response1;

}

// export const thunkGetRecentPosts = (page) => async (dispatch) => {
//   const response1 = await csrfFetch(`/api/posts?page=${page}`);
//   let data1 = await response1.json();
//   dispatch(getPosts(data1));
//   return response1;

// }

export const thunkGetAllSearchedPosts = (page, search) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/search?page=${page}&search=${search}`);
  let data1 = await response1.json();
  dispatch(getSearch(data1, search));
  return response1;

}

export const thunkGetHotPosts = (page) => async (dispatch) => {
  // console.log("HELLO!!!!!!!")
  const response1 = await csrfFetch(`/api/posts/hot?page=${page}`);
  let data1 = await response1.json();
  dispatch(getHotPosts(data1));
  return response1;

}

export const thunkGetTopPosts = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/top?page=${page}`);
  let data1 = await response1.json();
  dispatch(getTopPosts(data1));
  return response1;

}

export const thunkGetBestPosts = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/best?page=${page}`);
  let data1 = await response1.json();
  dispatch(getBestPosts(data1));
  return response1;

}

export const thunkGetHotCommunityPosts = (id, page) => async (dispatch) => {
  // console.log("HELLO!!!!!!!")
  const response1 = await csrfFetch(`/api/communities/${id}/hot?page=${page}`);
  let data1 = await response1.json();
  dispatch(getHotCommunityPosts(data1));
  return response1;

}

export const thunkGetTopCommunityPosts = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/communities/${id}/top?page=${page}`);
  let data1 = await response1.json();
  dispatch(getTopCommunityPosts(data1));
  return response1;

}


export const thunkRefreshCommunities = () => async (dispatch) => {
  let data = {}
  dispatch(getCommunityPosts(data))
}

export const thunkRefreshPosts = () => async (dispatch) => {
  // console.log("HELLLOKJQENVJ")
  let data = null
  dispatch(getSearch(data))

}


export const thunkGetUserPosts = (id, page) => async (dispatch) => {
    let response = await fetch(`/api/posts/${id}/current?page=${page}`)
    const data = await response.json();
    dispatch(getUserPosts(data));
    return data;
};

export const thunkGetUserHotPosts = (id, page) => async (dispatch) => {
  let response = await fetch(`/api/posts/${id}/current/hot?page=${page}`)
  const data = await response.json();
  dispatch(getUserHotPosts(data));
  return data;
};

export const thunkGetUserTopPosts = (id, page) => async (dispatch) => {
  let response = await fetch(`/api/posts/${id}/current/top?page=${page}`)
  const data = await response.json();
  dispatch(getUserTopPosts(data));
  return data;
};



export const thunkGetHistory = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/history?page=${page}`)
  let data1 = await response1.json();
  dispatch(getHistory(data1));
  return response1;
}

export const thunkGetSaved = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/saved?page=${page}`)
  let data1 = await response1.json();
  dispatch(getSaved(data1));
  return response1;
}

export const thunkGetFavorites = (page) => async (dispatch) => {
  // console.log("HELLO????:", page)
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

export const thunkGetHotComments = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/comments/hot?page=${page}`)
  let data1 = await response1.json();
  dispatch(getHotComments(data1));
  return response1;
}

export const thunkGetTopComments = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/comments/top?page=${page}`)
  let data1 = await response1.json();
  dispatch(getTopComments(data1));
  return response1;
}

export const thunkGetOverview = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/overview?page=${page}`)
  let data1 = await response1.json();
  dispatch(getOverview(data1));
  return response1;
}

export const thunkGetHotOverview = (id, page) => async (dispatch) => {
  // console.log(id, page)
  const response1 = await csrfFetch(`/api/posts/${id}/overview/hot?page=${page}`)
  let data1 = await response1.json();
  dispatch(getHotOverview(data1));
  return response1;
}

export const thunkGetTopOverview = (id, page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/overview/top?page=${page}`)
  let data1 = await response1.json();
  dispatch(getTopOverview(data1));
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


export const thunkCreatePost = (data, id, images) => async (dispatch) => {
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


    const formData = new FormData();
    // if (!images) formData.append("image", image);

    if (images && images.length !== 0) {
      for (var i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
    }

    if (images && images.length) {
      const response2 = await csrfFetch(`/api/posts/${postId}/images`, {
        method: 'POST',
        headers: {
                "Content-Type": "multipart/form-data",
              },
              body: formData
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

export const thunkCreateSaved = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/saved`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(addSaved(data))
  return data
}

export const thunkUpdateHistory = (id) => async (dispatch) => {
  // console.log("REDUCER", id)
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

export const thunkUpdateSaved = (id) => async (dispatch) => {
  // console.log("REDUCER", id)
  const response = await csrfFetch(`/api/posts/${id}/saved`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(updateSaved(data))
  return data
}

export const thunkUpdateSaved2 = (id) => async (dispatch) => {
  // console.log("REDUCER", id)
  const response = await csrfFetch(`/api/posts/saved/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(updateSaved(data))
  return data
}

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

export const thunkRefreshSearch = (id) => async (dispatch) => {

  dispatch(getSearch([]))
  return "succesfully refreshed"
}


let initialState = {
    posts: {},
    hotPosts: {},
    topPosts: {},
    bestPosts: {},
    userPosts: {},
    userHotPosts: {},
    userTopPosts: {},
    singlePost: {},
    communityPosts: {},
    removedPost: {},
    postsHistory: {},
    postsSaved: {},
    postsFavorites: {},
    postsComments: {},
    postsHotComments: {},
    postsTopComments: {},
    postsOverview: {},
    postsHotOverview: {},
    postsTopOverview: {},
    searchs: {},
    hotCommunityPosts: {},
    topCommunityPosts: {}
};


const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.posts[post.id] = { ...post})
      );
      return newState;
    case GET_HOT_COMMUNITY_POSTS:
      newState = { ...state };
      action.communities.forEach(
        (community) => (newState.hotCommunityPosts[community.id] = community)
      );
    return newState;
    case GET_TOP_COMMUNITY_POSTS:
      newState = { ...state };
      action.communities.forEach(
        (community) => (newState.topCommunityPosts[community.id] = community)
      );
    case GET_HOT_POSTS:
      newState = { ...state };
      if (action.posts?.length) action.posts.forEach(
        (post) => (newState.hotPosts[post.id] = { ...post})
      );
      return newState;
    case GET_TOP_POSTS:
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.topPosts[post.id] = { ...post})
      );
      return newState;
    case GET_BEST_POSTS:
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.bestPosts[post.id] = { ...post})
      );
    return newState;
    case GET_SEARCH:
    newState = { ...state };
    action.search?.forEach(
          (post) => (newState.searchs[post.id] = { ...post})
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
    case GET_USER_HOT_POSTS: {
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.userHotPosts[post.id] = { ...post})
      );
      return newState;
    }
    case GET_USER_TOP_POSTS: {
      newState = { ...state };
      if (action.posts.length) action.posts.forEach(
        (post) => (newState.userTopPosts[post.id] = { ...post})
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
    case GET_HOT_OVERVIEW: {
      newState = { ...state };
      let posts1 = action.posts.posts
      let comments = action.posts.comments
      let posts = posts1.concat(comments)
      posts.forEach(
        (post) => (newState.postsHotOverview[post.id] = { ...post})
      );
      return newState;
    }
    case GET_TOP_OVERVIEW: {
      newState = { ...state };
      let posts1 = action.posts.posts
      let comments = action.posts.comments
      let posts = posts1.concat(comments)
      posts.forEach(
        (post) => (newState.postsTopOverview[post.id] = { ...post})
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
    case GET_SAVED: {
      newState = { ...state };
      action.posts.forEach(
        (saved) => (newState.postsSaved[saved.Post.id] = { ...saved.Post })
      );
      return newState;
    }
    case GET_FAVORITES: {
      newState = { ...state };
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
    case GET_HOT_COMMENTS: {
      newState = { ...state };
      action.posts.forEach(
        (comment) => (newState.postsHotComments[comment.Post.id] = { ...comment.Post })
      );
      return newState;
    }
    case GET_TOP_COMMENTS: {
      newState = { ...state };
      action.posts.forEach(
        (comment) => (newState.postsTopComments[comment.Post.id] = { ...comment.Post })
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
      // const data = Object.entries(newState.postsHistory);
      // data.sort((a, b) => b[1].history - a[1].history);
      // newState.postsHistory = Object.fromEntries(data);
     //newState.postsHistory.shift(history.Post);
      ///newState.posts = { ...post };
      return newState;
    }
    case ADD_SAVED: {
      newState = { ...state };
      const saved = action.saved;
      newState.postsSaved[saved.Post?.id] = { ...saved.Post };
      newState.posts[saved.Post?.id] = { ...saved.Post };
      newState.hotPosts[saved.Post?.id] = { ...saved.Post };
      newState.topPosts[saved.Post?.id] = { ...saved.Post };
      newState.bestPosts[saved.Post?.id] = { ...saved.Post };
      newState.userPosts[saved.Post?.id] = { ...saved.Post };
      newState.bestPosts[saved.Post?.id] = { ...saved.Post };
      newState.userHotPosts[saved.Post?.id] = { ...saved.Post };
      newState.userTopPosts[saved.Post?.id] = { ...saved.Post };
      newState.singlePost = { ...saved.Post };
      newState.communityPosts[saved.Post?.id] = { ...saved.Post };
      newState.removedPost[saved.Post?.id] = { ...saved.Post };
      newState.postsHistory[saved.Post?.id] = { ...saved.Post };
      newState.postsFavorites[saved.Post?.id] = { ...saved.Post };
      newState.postsComments[saved.Post?.id] = { ...saved.Post };
      newState.postsHotComments[saved.Post?.id] = { ...saved.Post };
      newState.postsTopComments[saved.Post?.id] = { ...saved.Post };
      newState.postsOverview[saved.Post?.id] = { ...saved.Post };
      newState.postsHotOverview[saved.Post?.id] = { ...saved.Post };
      newState.postsTopOverview[saved.Post?.id] = { ...saved.Post };
      newState.hotCommunityPosts[saved.Post?.id] = { ...saved.Post };
      newState.topCommunityPosts[saved.Post?.id] = { ...saved.Post };
      return newState;
    }
    case UPDATE_HISTORY: {
      newState = { ...state };
      const history = action.history;
      if (newState.singlePost) newState.singlePost.PostSetting = { ...history }
      newState.postsHistory = newState.postsHistory.filter((h) => h.Post.id !== history.Post.id)
      newState.postsHistory[history.Post?.id] = { ...history.Post };
      ///newState.posts = { ...post };
      return newState;
    }
    case UPDATE_SAVED: {
      newState = { ...state };
      const saved = action.saved;
      if (newState.singlePost) newState.singlePost.PostSetting = { ...saved }
      newState.postsSaved = newState.postsSaved.filter((s) => s.Post.id !== saved.Post.id)
      newState.postsSaved[saved.Post?.id] = { ...saved.Post };
      newState.posts[saved.Post?.id] = { ...saved.Post };
      newState.hotPosts[saved.Post?.id] = { ...saved.Post };
      newState.topPosts[saved.Post?.id] = { ...saved.Post };
      newState.bestPosts[saved.Post?.id] = { ...saved.Post };
      newState.userPosts[saved.Post?.id] = { ...saved.Post };
      newState.bestPosts[saved.Post?.id] = { ...saved.Post };
      newState.userHotPosts[saved.Post?.id] = { ...saved.Post };
      newState.userTopPosts[saved.Post?.id] = { ...saved.Post };
      newState.singlePost = { ...saved.Post };
      newState.communityPosts[saved.Post?.id] = { ...saved.Post };
      newState.removedPost[saved.Post?.id] = { ...saved.Post };
      newState.postsHistory[saved.Post?.id] = { ...saved.Post };
      newState.postsFavorites[saved.Post?.id] = { ...saved.Post };
      newState.postsComments[saved.Post?.id] = { ...saved.Post };
      newState.postsHotComments[saved.Post?.id] = { ...saved.Post };
      newState.postsTopComments[saved.Post?.id] = { ...saved.Post };
      newState.postsOverview[saved.Post?.id] = { ...saved.Post };
      newState.postsHotOverview[saved.Post?.id] = { ...saved.Post };
      newState.postsTopOverview[saved.Post?.id] = { ...saved.Post };
      newState.hotCommunityPosts[saved.Post?.id] = { ...saved.Post };
      newState.topCommunityPosts[saved.Post?.id] = { ...saved.Post };
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
      if (newState.posts[vote.postId]) {
         newState.posts[vote.postId].Votes.push(vote)
      }
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
      if (newState.bestPosts[vote.postId]) {
        newState.bestPosts[vote.postId].Votes.push(vote);
      }
      if (newState.topPosts[vote.postId]) {
        newState.topPosts[vote.postId].Votes.push(vote);
      }
      if (newState.topPosts[vote.postId]) {
        newState.hotPosts[vote.postId].Votes.push(vote);
      }
      if (newState.userHotPosts[vote.postId]) {
        newState.userHotPosts[vote.postId].Votes.push(vote);
      }
      if (newState.userTopPosts[vote.postId]) {
        newState.userTopPosts[vote.postId].Votes.push(vote);
      }
      if (newState.postsHotComments[vote.postId]) {
        newState.postsHotComments[vote.postId].Votes.push(vote);
      }
      if (newState.postsTopComments[vote.postId]) {
        newState.postsTopComments[vote.postId].Votes.push(vote);
      }
      if (newState.postsHotOverview[vote.postId]) {
        newState.postsHotOverview[vote.postId].Votes.push(vote);
      }
      if (newState.postsTopOverview[vote.postId]) {
        newState.postsTopOverview[vote.postId].Votes.push(vote);
      }
      if (newState.searchs[vote.postId]) {
        newState.searchs[vote.postId].Votes.push(vote);
      }
      if (newState.hotCommunityPosts[vote.postId]) {
        newState.hotCommunityPosts[vote.postId].Votes.push(vote);
      }
      if (newState.topCommunityPosts[vote.postId]) {
        newState.topCommunityPosts[vote.postId].Votes.push(vote);
      }
      if (newState.postsFavorites[vote.postId]) {
        newState.postsFavorites[vote.postId].Votes.push(vote);
      }
      if (newState.postsSaved[vote.postId]) {
        newState.postsSaved[vote.postId].Votes.push(vote);
      }
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
      let votes9 = newState.bestPosts[vote.postId]?.Votes;
      let votes10 = newState.topPosts[vote.postId]?.Votes;
      let votes11 = newState.userHotPosts[vote.postId]?.Votes;
      let votes12 = newState.userTopPosts[vote.postId]?.Votes;
      let votes13 = newState.postsHotComments[vote.postId]?.Votes;
      let votes14 = newState.postsTopComments[vote.postId]?.Votes;
      let votes15 = newState.postsHotOverview[vote.postId]?.Votes;
      let votes16 = newState.postsTopOverview[vote.postId]?.Votes;
      let votes17 = newState.searchs[vote.postId]?.Votes;
      let votes18 = newState.hotCommunityPosts[vote.postId]?.Votes;
      let votes19 = newState.topCommunityPosts[vote.postId]?.Votes;
      let votes20 = newState.postsFavorites[vote.postId]?.Votes;
      let votes21 = newState.hotPosts[vote.postId]?.Votes;
      let votes22 = newState.postsSaved[vote.postId]?.Votes;
      if (votes21) {
        newState.hotPosts[vote.postId].Votes = votes21.filter((v) => v.id !== vote.id);
        newState.hotPosts[vote.postId].Votes.push(vote);
        }
      if (votes9) {
      newState.bestPosts[vote.postId].Votes = votes9.filter((v) => v.id !== vote.id);
      newState.bestPosts[vote.postId].Votes.push(vote);
      }
      if (votes10) {
      newState.topPosts[vote.postId].Votes = votes10.filter((v) => v.id !== vote.id);
      newState.topPosts[vote.postId].Votes.push(vote);
      }
      if (votes11) {
      newState.userHotPosts[vote.postId].Votes = votes11.filter((v) => v.id !== vote.id);
      newState.userHotPosts[vote.postId].Votes.push(vote);
      }
      if (votes12) {
      newState.userTopPosts[vote.postId].Votes = votes12.filter((v) => v.id !== vote.id);
      newState.userTopPosts[vote.postId].Votes.push(vote);
      }
      if (votes13) {
      newState.postsHotComments[vote.postId].Votes = votes13.filter((v) => v.id !== vote.id);
      newState.postsHotComments[vote.postId].Votes.push(vote);
      }
      if (votes14) {
      newState.postsTopComments[vote.postId].Votes = votes14.filter((v) => v.id !== vote.id);
      newState.postsTopComments[vote.postId].Votes.push(vote);
      }
      if (votes15) {
      newState.postsHotOverview[vote.postId].Votes = votes15.filter((v) => v.id !== vote.id);
      newState.postsHotOverview[vote.postId].Votes.push(vote);
      }
      if (votes16) {
      newState.postsTopOverview[vote.postId].Votes = votes16.filter((v) => v.id !== vote.id);
      newState.postsTopOverview[vote.postId].Votes.push(vote);
      }
      if (votes17) {
      newState.searchs[vote.postId].Votes = votes17.filter((v) => v.id !== vote.id);
      newState.searchs[vote.postId].Votes.push(vote);
      }
      if (votes18) {
      newState.hotCommunityPosts[vote.postId].Votes = votes18.filter((v) => v.id !== vote.id);
      newState.hotCommunityPosts[vote.postId].Votes.push(vote);
      }
      if (votes19) {
      newState.topCommunityPosts[vote.postId].Votes = votes19.filter((v) => v.id !== vote.id);
      newState.topCommunityPosts[vote.postId].Votes.push(vote);
      }
      if (votes20) {
      newState.postsFavorites[vote.postId].Votes = votes20.filter((v) => v.id !== vote.id);
      newState.postsFavorites[vote.postId].Votes.push(vote);
      }
      if (votes21) {
        newState.hotPosts[vote.postId].Votes = votes21.filter((v) => v.id !== vote.id);
        newState.hotPosts[vote.postId].Votes.push(vote);
        }
      if (votes22) {
        newState.postsSaved[vote.postId].Votes = votes22.filter((v) => v.id !== vote.id);
        newState.postsSaved[vote.postId].Votes.push(vote);
      }
      // console.log("REDUCER", newState.posts)
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
      let votes9 = newState.bestPosts[action.postId]?.Votes;
      let votes10 = newState.topPosts[action.postId]?.Votes;
      let votes11 = newState.userHotPosts[action.postId]?.Votes;
      let votes12 = newState.userTopPosts[action.postId]?.Votes;
      let votes13 = newState.postsHotComments[action.postId]?.Votes;
      let votes14 = newState.postsTopComments[action.postId]?.Votes;
      let votes15 = newState.postsHotOverview[action.postId]?.Votes;
      let votes16 = newState.postsTopOverview[action.postId]?.Votes;
      let votes17 = newState.searchs[action.postId]?.Votes;
      let votes18 = newState.hotCommunityPosts[action.postId]?.Votes;
      let votes19 = newState.topCommunityPosts[action.postId]?.Votes;
      let votes20 = newState.postsFavorites[action.postId]?.Votes;
      let votes21 = newState.hotPosts[action.postId]?.Votes;
      let votes22 = newState.postsSaved[action.postId]?.Votes;

      if (votes9) newState.bestPosts[action.postId].Votes = votes9.filter((v) => v.id !== action.voteId);
      if (votes10) newState.topPosts[action.postId].Votes = votes10.filter((v) => v.id !== action.voteId);
      if (votes11) newState.userHotPosts[action.postId].Votes = votes11.filter((v) => v.id !== action.voteId);
      if (votes12) newState.userTopPosts[action.postId].Votes = votes12.filter((v) => v.id !== action.voteId);
      if (votes13) newState.postsHotComments[action.postId].Votes = votes13.filter((v) => v.id !== action.voteId);
      if (votes14) newState.postsTopComments[action.postId].Votes = votes14.filter((v) => v.id !== action.voteId);
      if (votes15) newState.postsHotOverview[action.postId].Votes = votes15.filter((v) => v.id !== action.voteId);
      if (votes16) newState.postsTopOverview[action.postId].Votes = votes16.filter((v) => v.id !== action.voteId);
      if (votes17) newState.searchs[action.postId].Votes = votes17.filter((v) => v.id !== action.voteId);
      if (votes18) newState.hotCommunityPosts[action.postId].Votes = votes18.filter((v) => v.id !== action.voteId);
      if (votes19) newState.topCommunityPosts[action.postId].Votes = votes19.filter((v) => v.id !== action.voteId);
      if (votes20) newState.postsFavorites[action.postId].Votes = votes20.filter((v) => v.id !== action.voteId);
      if (votes21) newState.hotPosts[action.postId].Votes = votes21.filter((v) => v.id !== action.voteId);
      if (votes22) newState.postsSaved[action.postId].Votes = votes22.filter((v) => v.id !== action.voteId);
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
      newState.posts[post.id] = { ...post };
      newState.communityPosts[post.id] = { ...post };
      newState.postsOverview[post.id] = { ...post };
      newState.postsComments[post.id] = { ...post };
      newState.userPosts[post.id] = { ...post };
      newState.postsFavorites[post.id] = { ...post };
      newState.userHotPosts[post.id] = { ...post };
      newState.userTopPosts[post.id] = { ...post };
      newState.postsHotComments[post.id] = { ...post };
      newState.postsTopComments[post.id] = { ...post };
      newState.postsHotOverview[post.id] = { ...post };
      newState.postsTopOverview[post.id] = { ...post };
      newState.searchs[post.id] = { ...post };
      newState.hotCommunityPosts[post.id] = { ...post };
      newState.topCommunityPosts[post.id] = { ...post };
      return newState;
    }
    case GET_COMMENT_DETAILS: {
      newState = { ...state };
      let comment = action.details;
      newState.singlePost.Comments.push(comment)
      let post = newState.posts[comment.postId]
      if (post && post.Comments) newState.posts[comment.postId].Comments.push(comment)
      let post2 = newState.communityPosts[comment.postId]
      if (post2 && post2.Comments) newState.communityPosts[comment.postId].Comments.push(comment)
      let post3 = newState.hotPosts[comment.postId]
      if (post3 && post3.Comments) newState.hotPosts[comment.postId].Comments.push(comment)
      let post4 = newState.topPosts[comment.postId]
      if (post4 && post4.Comments) newState.topPosts[comment.postId].Comments.push(comment)
      let post5 = newState.userPosts[comment.postId]
      if (post5 && post5.Comments) newState.userPosts[comment.postId].Comments.push(comment)
      let post6 = newState.userHotPosts[comment.postId]
      if (post6 && post6.Comments) newState.userHotPosts[comment.postId].Comments.push(comment)
      let post7 = newState.userTopPosts[comment.postId]
      if (post7 && post7.Comments) newState.userTopPosts[comment.postId].Comments.push(comment)
      let post8 = newState.postsOverview[comment.postId]
      if (post8 && post8.Comments) newState.postsOverview[comment.postId].Comments.push(comment)
      let post9 = newState.postsHotOverview[comment.postId]
      if (post9 && post9.Comments) newState.postsHotOverview[comment.postId].Comments.push(comment)
      let post10 = newState.postsTopOverview[comment.postId]
      if (post10 && post9.Comments) newState.postsTopOverview[comment.postId].Comments.push(comment)
      let post11 = newState.searchs[comment.postId]
      if (post11 && post11.Comments) newState.searchs[comment.postId].Comments.push(comment)
      let post12 = newState.hotCommunityPosts[comment.postId]
      if (post12 && post12.Comments) newState.hotCommunityPosts[comment.postId].Comments.push(comment)
      let post13 = newState.topCommunityPosts[comment.postId]
      if (post13 && post13.Comments) newState.topCommunityPosts[comment.postId].Comments.push(comment)
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
        delete newState.userPosts[action.id];
        delete newState.communityPosts[action.id];
        delete newState.postsFavorites[action.id];
        delete newState.postsComments[action.id];
        delete newState.postsOverview[action.id];
        delete newState.userHotPosts[action.id];
        delete newState.userTopPosts[action.id];
        delete newState.postsComments[action.id];
        delete newState.postsHotComments[action.id];
        delete newState.postsTopComments[action.id];
        delete newState.postsHotOverview[action.id];
        delete newState.postsTopOverview[action.id];
        delete newState.hotCommunityPosts[action.id];
        delete newState.topCommunityPosts[action.id];
        return newState;
    }
    case REMOVE_COMMENT: {
      newState = { ...state };
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== action.commentId);
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== action.commentId);

      let post = newState.posts[newState.singlePost.id];
      if (post && post.Comments) {
      newState.posts[newState.singlePost.id].Comments = post.Comments.filter((c) => c.id !== action.commentId);
      }

      let communityPost = newState.communityPosts[newState.singlePost.id];
      if (communityPost && communityPost.Comments) {
      newState.communityPosts[newState.singlePost.id].Comments = communityPost.Comments.filter((c) => c.id !== action.commentId);
      }

      let topPosts = newState.topPosts[newState.singlePost.id];
      if (topPosts && topPosts.Comments) {
      newState.topPosts[newState.singlePost.id].Comments = topPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let bestPosts = newState.bestPosts[newState.singlePost.id];
      if (bestPosts && bestPosts.Comments) {
      newState.bestPosts[newState.singlePost.id].Comments = bestPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let userPosts = newState.userPosts[newState.singlePost.id];
      if (userPosts && userPosts.Comments) {
      newState.userPosts[newState.singlePost.id].Comments = userPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let userHotPosts = newState.userHotPosts[newState.singlePost.id];
      if (userHotPosts && userHotPosts.Comments) {
      newState.userHotPosts[newState.singlePost.id].Comments = userHotPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let userTopPosts = newState.userTopPosts[newState.singlePost.id];
      if (userTopPosts && userTopPosts.Comments) {
      newState.userTopPosts[newState.singlePost.id].Comments = userTopPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsFavorites = newState.postsFavorites[newState.singlePost.id];
      if (postsFavorites && postsFavorites.Comments) {
      newState.postsFavorites[newState.singlePost.id].Comments = postsFavorites.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsComments = newState.postsComments[newState.singlePost.id];
      if (postsComments && postsComments.Comments) {
      newState.postsComments[newState.singlePost.id].Comments = postsComments.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsHotComments = newState.postsHotComments[newState.singlePost.id];
      if (postsHotComments && postsHotComments.Comments) {
      newState.postsHotComments[newState.singlePost.id].Comments = postsHotComments.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsTopComments = newState.postsTopComments[newState.singlePost.id];
      if (postsTopComments && postsTopComments.Comments) {
      newState.postsTopComments[newState.singlePost.id].Comments = postsTopComments.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsOverview = newState.postsOverview[newState.singlePost.id];
      if (postsOverview && postsOverview.Comments) {
      newState.postsOverview[newState.singlePost.id].Comments = postsOverview.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsHotOverview = newState.postsHotOverview[newState.singlePost.id];
      if (postsHotOverview && postsHotOverview.Comments) {
      newState.postsHotOverview[newState.singlePost.id].Comments = postsHotOverview.Comments.filter((c) => c.id !== action.commentId);
      }

      let postsTopOverview = newState.postsTopOverview[newState.singlePost.id];
      if (postsTopOverview && postsTopOverview.Comments) {
      newState.postsTopOverview[newState.singlePost.id].Comments = postsTopOverview.Comments.filter((c) => c.id !== action.commentId);
      }

      let searchs = newState.searchs[newState.singlePost.id];
      if (searchs && searchs.Comments) {
      newState.searchs[newState.singlePost.id].Comments = searchs.Comments.filter((c) => c.id !== action.commentId);
      }

      let hotCommunityPosts = newState.hotCommunityPosts[newState.singlePost.id];
      if (hotCommunityPosts && hotCommunityPosts.Comments) {
      newState.hotCommunityPosts[newState.singlePost.id].Comments = hotCommunityPosts.Comments.filter((c) => c.id !== action.commentId);
      }

      let topCommunityPosts = newState.topCommunityPosts[newState.singlePost.id];
      if (topCommunityPosts && topCommunityPosts.Comments) {
      newState.topCommunityPosts[newState.singlePost.id].Comments = topCommunityPosts.Comments.filter((c) => c.id !== action.commentId);
      }
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer
