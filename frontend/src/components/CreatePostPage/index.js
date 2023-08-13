import "./CreatePostPage.css"


function CreatePost() {
    return (
        <div className="create-post-page">
            <div className="create-post">
                <div id="cp-title">
                <h3>Create Post</h3>
                <p>Draft</p>
                </div>
                <div id='border2'></div>
                <input text="type" placeholder="Search communities"></input>
                <div className="form">
                    <div id="type-of-post">
                    <p>post</p>
                    </div>
                    <input type="text" placeholder="title"></input>
                    <textarea placeholder="Text">

                    </textarea>
                    <div id="tags">
                        <button>OC</button>
                        <button>Spolier</button>
                        <button>NSFW</button>
                        <button>Flair</button>
                    </div>
                    <div id="submit-buttons">
                        <button>Save Draft</button>
                        <button>Post</button>
                    </div>
                    <label>
                    <input type="checkbox" />
                    Send me post reply notifications
                    </label>
                    <p>Connect accounts to share your post</p>
                    </div>
            </div>
                <div className="posting-on-l">
                    <div id="posting-on-l">
                    <h3>Posting to luvddit</h3>
                    <p>1. Remember the human </p>
                    <p>2. Behave like you would in real life</p>
                    <p>3. Look for the original source of content</p>
                    <p>4. Search for duplicates before posting</p>
                    <p>5. Read the communities rules</p>
                    </div>
                    <p>Please be mindful of luvddit's content policy and practice good reddiquette.</p>
                </div>
        </div>
    )
}

export default CreatePost
