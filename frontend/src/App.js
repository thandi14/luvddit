import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import * as postsActions from './store/posts';
import * as communitiesActions from "./store/communities"
import CreatePost from "./components/CreatePostPage";
import PostPage from "./components/PostPage";
import CommunityPage from "./components/CommunityPage";
import PostPageModal from "./components/PostPage/PostPageModal";
import CommunityPageEdit from "./components/CommunityPage/index2";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import YourProfilePage from "./components/YourProfilePage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session)
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(postsActions.thunkGetAllPosts())
    dispatch(communitiesActions.thunkGetAllCommunities())
   if (user) dispatch(communitiesActions.thunkGetCommunityMemberships())
   if (user) dispatch(communitiesActions.thunkGetUserCommunities())
  }, [dispatch, isLoaded]);

  console.log(location.pathname)


  return (
    <>
      {!location.pathname.includes("/communities2/") ? <Navigation isLoaded={isLoaded} /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/profile">
          {user ? <YourProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/posts/new/">
           {user ? <CreatePost /> : <HomePage />}
          </Route>
          <Route exact path="/posts/new/:button">
           {user ? <CreatePost /> : <HomePage />}
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path="/communities/:id">
            <CommunityPage />
          </Route>
          <Route exact path="/communities2/:id">
            { user ? <CommunityPageEdit /> : <HomePage /> }
          </Route>
          <Route exact path="/posts-modal/:id">
            <PostPageModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
