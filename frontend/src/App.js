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
import CommunityPageEdit2 from "./components/CommunityPage/edit";
import SearchPage from "./components/SearchPage";
import SearchCommunities from "./components/SearchPage/communities";
import SearchProfiles from "./components/SearchPage/profiles";
import SearchComments from "./components/SearchPage/comments";
import * as commentActions from './store/comments'
import { useSearch } from "./context/search";
import { useFilter } from "./context/filter";
import SearchCommunityPage from "./components/SearchPage/community";
import SearchCommunityComments from "./components/SearchPage/community2";
import BestPage from "./components/HomePage/best";
import HotPage from "./components/HomePage/hot";
import TopPage from "./components/HomePage/top";
import TopCommunityPage from "./components/CommunityPage/top";
import HotCommunityPage from "./components/CommunityPage/hot";
import YourHotProfilePage from "./components/YourProfilePage/hot";
import YourTopProfilePage from "./components/YourProfilePage/top";
import OtherTopProfilePage from "./components/YourProfilePage/top2";
import OtherHotProfilePage from "./components/YourProfilePage/hot2";
import Commented2HotPosts from "./components/YourProfilePage/hotComments2";
import OthersHotPosts from "./components/YourProfilePage/hotPosts2";
import Commented2TopPosts from "./components/YourProfilePage/topComments2";
import OthersTopPosts from "./components/YourProfilePage/topPosts2";
import UsersHotPosts from "./components/YourProfilePage/hotPosts";
import UsersTopPosts from "./components/YourProfilePage/topPosts";
import CommentedHotPosts from "./components/YourProfilePage/hotComments";
import CommentedTopPosts from "./components/YourProfilePage/topComments";

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
  const { search }= useSearch()
  const { filter } = useFilter()

  console.log(search)

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
        dispatch(postsActions.thunkGetHotPosts(currentPage))
        dispatch(postsActions.thunkGetBestPosts(currentPage))
        dispatch(postsActions.thunkGetAllPosts(currentPage))
        dispatch(postsActions.thunkGetTopPosts(currentPage))
        dispatch(postsActions.thunkGetHotCommunityPosts(currentPage))
        dispatch(postsActions.thunkGetTopCommunityPosts(currentPage))

  };
  }


  return (
    <>
      {!location.pathname.includes("/communities2/") ? <Navigation isLoaded={isLoaded} /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <BestPage />
          </Route>
          <Route exact path="/hot">
            <HotPage />
          </Route>
          <Route exact path="/recent">
            <HomePage />
          </Route>
          <Route exact path="/top">
            <TopPage />
          </Route>
          <Route exact path="/search/:page/:search">
          <SearchPage />
          </Route>
          <Route exact path="/profile/:page">
          {user ? <YourProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/hot/:page">
          {user ? <YourHotProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/top/:page">
          {user ? <YourTopProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/search/communities/:page/:search">
          <SearchCommunities />
          </Route>
          <Route exact path="/search2/community/:id/:page/:search">
            <SearchCommunityPage />
          </Route>
          <Route exact path="/search2/comments/:id/:page/:search">
            <SearchCommunityComments />
          </Route>
          <Route exact path="/search/profiles/:page/:search">
          <SearchProfiles />
          </Route>
          <Route exact path="/search/comments/:page/:search">
          <SearchComments />
          </Route>
          <Route exact path="/profile/posts/:page">
          {user ? <UsersPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/posts/hot/:page">
          {user ? <UsersHotPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/posts/top/:page">
          {user ? <UsersTopPosts /> : <HomePage /> }
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
          <Route exact path="/profile/comments/hot/:page">
          {user ? <CommentedHotPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/profile/comments/top/:page">
          {user ? <CommentedTopPosts /> : <HomePage /> }
          </Route>
          <Route exact path="/posts/new/">
           {user ? <CreatePost /> : <HomePage />}
          </Route>
          <Route exact path="/posts/new/:button">
           {user ? <CreatePost /> : <HomePage />}
           </Route>
          <Route exact path="/profile2/:id/:page">
          <OtherProfilePage />
          </Route>
          <Route exact path="/profile2/top/:id/:page">
          {user ? <OtherTopProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/hot/:id/:page">
          {user ? <OtherHotProfilePage /> : <HomePage /> }
          </Route>
          <Route exact path="/profile2/:id/comments/:page">
           <Commented2Posts />
          </Route>
          <Route exact path="/profile2/:id/posts/:page">
          <OthersPosts />
          </Route>
          <Route exact path="/profile2/:id/comments/hot/:page">
          <Commented2HotPosts />
          </Route>
          <Route exact path="/profile2/:id/posts/hot/:page">
          <OthersHotPosts />
          </Route>
          <Route exact path="/profile2/:id/comments/top/:page">
           <Commented2TopPosts />
          </Route>
          <Route exact path="/profile2/:id/posts/top/:page">
          <OthersTopPosts />
          </Route>
          <Route exact path="/posts/:id/">
            <PostPage />
          </Route>
          <Route exact path="/communities/top/:id/:page">
            <TopCommunityPage />
          </Route>
          <Route exact path="/communities/recent/:id/:page">
            <CommunityPage />
          </Route>
          <Route exact path="/communities/:id/mod/">
            { user ? <ModTools /> : <HomePage /> }
          </Route>
          <Route exact path="/communities/:id/:page">
            <HotCommunityPage />
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
