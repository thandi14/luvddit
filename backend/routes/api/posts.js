const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Posts, Comments, Communities, User, PostImages, CommunityMembers, Votes, communityStyles } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    let posts = await Posts.findAll({
        include: [
            { model: Comments},
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes}
         ],
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    // console.log(posts[0])

    // for (let p of posts) {
    //    // console.log(p)
    //    votes = p.dataValues.Votes
    //    if (votes.length) {
    //         for (let v of votes) {
    //            if (v.dataValues.upVote === 1) p.dataValues.votes = p.dataValues.votes + 1
    //            if (v.dataValues.downVote === 1) p.dataValues.downVotes = p.dataValues.downVote + 1
    //         }
    //    }
    // }

    return res.json(posts)
})


router.get("/current", async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let posts = await Posts.findAll({
       where: {
        userId,
       },
       include: [
        { model: Comments },
        { model: Communities },
        { model: PostImages },
        { model: User }

        ]
    });

    return res.json(posts)
})

router.get("/votes/current", async (req, res) => {
    const { user } = req

    if (!user) return res.status(404).json({"message": "User couldnt be found"})

    const userId = user.dataValues.id

    let vote = await Votes.findAll({
        where: {
            userId,
        }
    });

    return res.json(vote)
})

// router.get(`/votes/${id}`, async (req, res) => {
//     const { id } = req.params.id

//     let vote = await Votes.findByPk(id)

//     return res.json(vote)

// })




router.get("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let post = await Posts.findByPk(postId, {
        include: [
            {
                model: Comments,
                include: [
                    { model: User }
                ]
            },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User },
            { model: PostImages},
            { model: Votes}
         ]
        });

        let members = await CommunityMembers.findAll({
            where: {
              communityId: post.dataValues.Community.dataValues.id
            }
          });

          console.log(members)

          post.dataValues.Community.dataValues.CommunityMembers = members.length

    return res.json(post)
})

router.get("/:id/comments", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);

    if (!postExist) {

    return res.status(404).json({"message": "Post couldn't be found"});

    }

    let comments = await Comments.findAll({
        where: {
            postId,
        },
        include: [
            { model: User}
        ]
    })

    console.log(comments)

    return res.json(comments)
})

router.put("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);
    const { description } = req.body

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    postExist.set({
        description
    })
    await postExist.save()

    return res.json(postExist)
})

router.delete("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    await postExist.destroy()

    res.json({
        message: "Successfully deleted"
    })

})

router.post('/:id/images', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);
    const { imgURL } = req.body

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let image = await PostImages.create({
        imgURL,
        postId
    })

    return res.json(image)

})

router.post('/:id/votes', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);
    const boolean = req.query.boolean;

    // console.log(boolean)
    const { user } = req
    const userId = user.dataValues.id

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let upVote
    let downVote

    if (boolean == 1) upVote = await Votes.create({
        postId,
        userId,
        upVote: 1,
        downVote: 0
    })

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    if (upVote) {
        postExist.set({
            votes: postExist.votes + 1
        })
        await postExist.save()

    }


    if (boolean == 0) downVote = await Votes.create({
        postId,
        userId,
        downVote: 1,
        upVote: 0
    })

    if (downVote) {
        postExist.set({
            downVotes: postExist.downVotes + 1
        })
        await postExist.save()

    }


    let vote = upVote ? upVote : downVote

    return res.json(vote)

})

router.delete('/votes/:id', async (req, res) => {
    let voteId = req.params.id;
    let voteExist = await Votes.findByPk(voteId);

    if (!voteExist) {

    res.status(404).json({"message": "Vote couldn't be found"});

    }

    let post = await Posts.findByPk(voteExist.dataValues.postId)

    if (voteExist.dataValues.upVote === 1) {
        post.set({
            votes: post.dataValues.votes - 1
        })

        await post.save()
    }

    if (voteExist.dataValues.downVote === 1) {
        post.set({
            downVotes: post.dataValues.downVotes - 1
        })

        await post.save()


    }

    await voteExist.destroy()



    res.json({
        message: "Successfully deleted"
    })

})

router.post("/:id/comment", async (req, res) => {
    const { comment } = req.body
    const postId = req.params.id
    const { user } = req
    const userId = user.dataValues.id

    let c = await Comments.create({
        userId,
        comment,
        postId

    });

    return res.json(c)
})



module.exports = router;
