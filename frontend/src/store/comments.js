import { csrfFetch } from "./csrf";


const GET_POST_COMMENTS = 'comments/getPostComments';
const GET_SEARCHED_COMMENTS = 'comments/getSearchedComments';
const GET_DETAILS = 'comments/getDetails';
const GET_USER_COMMENTS = 'comments/getUserComments';
const REMOVE_COMMENT = 'comments/removeComment'


const getPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

const getSearchedComments = (comments) => {
    return {
        type: GET_SEARCHED_COMMENTS,
        comments
    }
}


const getDetails = (details) => {
    return {
        type: GET_DETAILS,
        details
    }
}

const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

const getUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    comments,
});

export const thunkGetPostComments = (id) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/posts/${id}/comments`)
    let data1 = await response1.json();
    dispatch(getPostComments(data1));
    return response1;
}

export const thunkGetComments = (page, search) => async (dispatch) => {

    const response2 = await csrfFetch(`/api/comments/search?page=${page}`)
    let data2 = await response2.json();
    dispatch(getPostComments(data2));
    return response2 ;

}

export const thunkGetSearchedComments = (page, search) => async (dispatch) => {
    let response1 = await csrfFetch(`/api/comments/search/comments?page=${page}&search=${search}`)
    let data1 = await response1.json();
    dispatch(getSearchedComments(data1));
    return data1
}



export const thunkGetUserComments = () => async (dispatch) => {
  const response1 = await csrfFetch(`/api/comments/current`)
  const data1 = await response1.json();
  dispatch(getUserComments(data1))
  return data1;
}


// export const thunkGetDetailsById = (id) => async (dispatch) => {
//     const response1 = await csrfFetch(`/api/posts/${id}`)
//     const data1 = await response1.json();
//     dispatch(getDetails(data1));
//     return data1;
// }

export const thunkCreateComment = (data, id) => async (dispatch) => {
    console.log(id)
    if (Object.values(data).length) {
        const response = await csrfFetch(`/api/posts/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })

        const data1 = await response.json()
        dispatch(getDetails(data1))
        return data1

    }
}

export const thunkUpdateComment = (data, id) => async (dispatch) => {
    if (Object.values(data).length) {
          const response = await csrfFetch(`/api/posts/${id}/comment`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(data)
          })

          const data1 = await response.json()
          // dispatch(getDetails(data1))
          return data1

      }
  }

  export const thunkRefreshSearch = (id) => async (dispatch) => {

    dispatch(getSearchedComments([]))
    return "succesfully refreshed"
  }


// export const thunkDeleteComment = (id) => async (dispatch) => {
//     console.log("THUNK:", id)
//     const response = await csrfFetch(`/api/comments/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//     })
//     let data = await response.json()
//     console.log("THUNK:", data)
//     dispatch(removeComment(id))
//     return data
// }

let initialState = {
    postComments: {},
    userComments: {},
    // singlePost: {},
    removedComment: {},
    searchComments: {}
};


const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POST_COMMENTS:
        newState = { ...state };
        action.comments.forEach(
          (comment) => (newState.postComments[comment.id] = comment)
        );
      return newState;
    case GET_SEARCHED_COMMENTS:
        newState = { ...state };
        if (!action.comments?.length) return newState
        action.comments.forEach(
          (comment) => (newState.searchComments[comment.id] = comment)
        );
    return newState;
    case GET_DETAILS:
        newState = { ...state };
        let comment = action.details;
        newState.postComments[comment.id] = comment
        newState.userComments[comment.id] = comment
        return newState
    case REMOVE_COMMENT: {
        newState = { ...state };
        newState.postComments = { ...newState.postComments };
        newState.userComments = { ...newState.userComments };
        delete newState.postComments[action.id];
        delete newState.userComments[action.id];
        return newState;
    }
    case GET_USER_COMMENTS: {
        newState = { ...state };
        newState.userComments = {};
        action.comments.forEach(
          (comment) => (newState.userComments[comment.id] = comment)
        );
        return newState;
    }
    default:
      return state;
  }
};

export default commentsReducer
