import { csrfFetch } from "./csrf";


const GET_POST_COMMENTS = 'posts/getPostComments';
// const GET_DETAILS = 'posts/getDetails';
const GET_USER_COMMENTS = 'posts/getUserComments';
const REMOVE_COMMENT = 'posts/removeComment'


const getPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

// const getDetails = (details) => {
//     return {
//         type: GET_DETAILS,
//         details
//     }
// }

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
        // dispatch(getDetails(data1))
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

let initialState = {
    postComments: {},
    userComments: {},
    // singlePost: {},
    removedComment: {},
};


const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POST_COMMENTS:{
        newState = { ...state };
        const comments = action.comments;
        newState.postComments = { ...comments };
        return newState;
    }
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
