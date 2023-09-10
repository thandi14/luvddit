import PostLikes from "../HomePage/likes"




function NoPosts({ name }) {

    let filterdPosts = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]

    return (
        <div id="rele">
        <div></div>
        <span id="hmmm">Hmm... looks like you haven't {name} yet</span>
        {filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
            <div id="omg2">
            <div  className="post-content4">
            <div id="pc-side9">
            <i id="upvote" class="fi fi-rs-heart"></i>
            <div id="height"></div>
            <i id="downvote" class="fi fi-rs-heart-crack"></i>
            </div>
            <div id="what-cont">
            </div>
            <div id="pc-side2">
            {/* <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
            <div id="finishing4">
              {post.description}
              </div>
            </div> */}
            </div>
            </div>
            </div>
        )}
        </div>
    )
}

export default NoPosts
