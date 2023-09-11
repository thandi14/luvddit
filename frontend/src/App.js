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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const { user, other } = useSelector((state) => state.session)
  const { singleCommunity } = useSelector((state) => state.communities)
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [threshold, setThreshold] = useState(450);
  const location = useLocation();
  const { id } = useParams()

  console.log('APP:', singleCommunity)

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(communitiesActions.thunkGetAllCommunities())
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
      const storedCurrentPage = localStorage.getItem("currentPage");

      setCurrentPage(currentPage + 1);
      setThreshold(threshold + 200);
      dispatch(postsActions.thunkGetAllPosts(currentPage));
      dispatch(postsActions.thunkGetHistory(currentPage))
      dispatch(postsActions.thunkGetFavorites(currentPage))
      dispatch(postsActions.thunkGetComments(currentPage))

      if (location.pathname.includes("/profile2/") && other.id) {
        dispatch(postsActions.thunkGetUserPosts(other.id, currentPage)) // Fetch next page
        dispatch(postsActions.thunkGetComments(other.id, currentPage))
        dispatch(postsActions.thunkGetOverview(other.id, currentPage)) // Fetch next page

      }
      else if (singleCommunity && singleCommunity.id) {
        dispatch(postsActions.thunkGetCommunityPosts(singleCommunity.id, currentPage))
      }
      else if (user && user.id) {
        dispatch(postsActions.thunkGetUserPosts(user.id, currentPage)) // Fetch next page
        dispatch(postsActions.thunkGetComments(user.id, currentPage))
        dispatch(postsActions.thunkGetOverview(user.id, currentPage)) // Fetch next page
      }

  };
  }


  return (
    <>
      {!location.pathname.includes("/communities2/") ? <Navigation isLoaded={isLoaded} /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/profile/:page">
          {user ? <YourProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/posts/:page">
          {user ? <UsersPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/upvoted/:page">
          {user ? <UpvotedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/downvoted/:page">
          {user ? <DownvotedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/history/:page">
          {user ? <HistoryPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/comments/:page">
          {user ? <CommentedPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/posts/new/">
           {user ? <CreatePost /> : <HomePage />}
          </Route>
          <Route exact path="/posts/new/:button">
           {user ? <CreatePost /> : <HomePage />}
           </Route>
          <Route exact path="/profile2/:id/:page">
          {user ? <OtherProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/:id/comments/:page">
          {user ? <Commented2Posts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/:id/posts/:page">
          {user ? <OthersPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/posts/:id/">
            <PostPage />
          </Route>
          <Route exact path="/communities/:id/mod/">
            { user ? <ModTools /> : <HomePage /> }
          </Route>
          <Route exact path="/communities/:id/:page">
            <CommunityPage />
          </Route>
          <Route exact path="/communities2/:id/:page">
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
