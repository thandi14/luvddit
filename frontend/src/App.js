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
import UsersPosts from "./components/YourProfilePage/posts";
import UpvotedPosts from "./components/YourProfilePage/upvoted";
import DownvotedPosts from "./components/YourProfilePage/downvoted";
import HistoryPosts from "./components/YourProfilePage/history";
import CommentedPosts from "./components/YourProfilePage/comments";
import ModTools from "./components/CommunityPage/mod";
import OtherProfilePage from "./components/YourProfilePage/index2";
import OthersPosts from "./components/YourProfilePage/posts2";
import Commented2Posts from "./components/YourProfilePage/comments2";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session)
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [threshold, setThreshold] = useState(450);
  const location = useLocation();


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(communitiesActions.thunkGetAllCommunities())
    dispatch(postsActions.thunkGetHistory())
    if (user && user.id) dispatch(communitiesActions.thunkGetMemberships())
    if (user && user.id) dispatch(communitiesActions.thunkGetUserCommunities())
  }, [dispatch, isLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop >= documentHeight - threshold) {
      setCurrentPage(currentPage + 1);
      setThreshold(threshold + 200);
      dispatch(postsActions.thunkGetAllPosts(currentPage))
      console.log("bottom of page")


    }
  };

  console.log("CURRENT PAGE", currentPage)





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
          <Route exact path="/profile/posts">
          {user ? <UsersPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/upvoted">
          {user ? <UpvotedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/downvoted">
          {user ? <DownvotedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/history">
          {user ? <HistoryPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/comments">
          {user ? <CommentedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/posts/new/">
           {user ? <CreatePost /> : <HomePage />}
          </Route>
          <Route exact path="/posts/new/:button">
           {user ? <CreatePost /> : <HomePage />}
           </Route>
          <Route exact path="/profile2/:id">
          {user ? <OtherProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/:id/comments">
          {user ? <Commented2Posts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/:id/posts">
          {user ? <OthersPosts /> : <HomePage /> }
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
          <Route exact path="/communities/:id/mod">
            { user ? <ModTools /> : <HomePage /> }
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
