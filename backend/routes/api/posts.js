const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Posts, Comments, Communities, User, PostImages, CommunityMembers, Votes, communityStyles, postsHistories, PostSetting } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page


    let posts = await Posts.findAll({
        order: [['id', 'DESC']],
        include: [
            { model: Comments },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes } ,
            { model: PostSetting }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize
    });

    return res.json(posts)
})




router.get("/history", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    const userId = user.dataValues.id

    let posts = await PostSetting.findAll({
        order: [['history', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Posts,
                include: [
                    { model: Comments },
                    {
                        model: Communities,
                        include: [
                            { model: communityStyles }
                        ]
                    },
                    { model: User},
                    { model: PostImages},
                    {
                        model: Votes,
                    },
                    {
                        model: PostSetting,
                     }
                ]
            }
         ],
         limit: pageSize, // Limit the number of results per page
         offset: (page - 1) * pageSize
    });



    return res.json(posts)
})

router.get("/votes", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    let userId = user.dataValues.id

    let posts = await Votes.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Posts,
                include: [
                    { model: Comments },
                    {
                        model: Communities,
                        include: [
                            { model: communityStyles }
                        ]
                    },
                    { model: User},
                    { model: PostImages},
                    {
                        model: Votes,
                        order: [['createdAt', 'DESC']],
                        where: {
                            userId
                        },
                     },
                    { model: PostSetting }
                ]
            }
         ],
         limit: pageSize, // Limit the number of results per page
         offset: (page - 1) * pageSize
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
                { model: User },
                { model: Votes }
            ]
            },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User },
            { model: PostImages },
            { model: Votes },
            { model: PostSetting }
        ]
    });

    let members = await CommunityMembers.findAll({
    where: {
        communityId: post.dataValues.Community.dataValues.id
    }
    });

    post.dataValues.Community.dataValues.CommunityMembers = members.length

    return res.json(post)
})

router.get('/:id/overview', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 5; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    const [posts, comments] = await Promise.all([
        Posts.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                userId
            },
            include: [
                {
                  model: Comments,
                  order: [['updatedAt', 'DESC']],

                 },
                {
                    model: Communities,
                    include: [
                        { model: communityStyles }
                    ]
                },
                { model: User},
                { model: PostImages},
                { model: Votes } ,
                { model: PostSetting }
            ],
            limit: pageSize, // Limit the number of results per page
            offset: (page - 1) * pageSize // Optional: Order the results
        }),
        Posts.findAll({
            order: [['updatedAt', 'DESC']],
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    }
                },
                {
                    model: Communities,
                    include: [
                        { model: communityStyles }
                    ]
                },
                { model: User},
                { model: PostImages},
                { model: Votes } ,
                { model: PostSetting }
            ],
            limit: pageSize, // Limit the number of results per page
            offset: (page - 1) * pageSize // Optional: Order the results
        }),
    ]);

    return res.json({
        posts,
        comments
    })

})

router.get("/:id/current", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    let posts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            { model: Comments },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes } ,
            { model: PostSetting }
         ],
         limit: pageSize, // Limit the number of results per page
         offset: (page - 1) * pageSize
    });


    return res.json(posts)
})

router.get("/:id/comments", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

   // const { user } = req
    let userId = req.params.id;

    let posts = await Comments.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Posts,
                include: [
                    {
                        model: Comments,
                        order: [['createdAt', 'DESC']],
                        where: {
                            userId
                        },
                    },
                    {
                        model: Communities,
                        include: [
                            { model: communityStyles }
                        ]
                    },
                    { model: User},
                    { model: PostImages},
                    { model: Votes } ,
                    { model: PostSetting }
                ]
            }
         ],
         limit: pageSize, // Limit the number of results per page
         offset: (page - 1) * pageSize
    });


    return res.json(posts)
})



router.get("/:id/communities", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

   // const { user } = req
    let communityId = req.params.id;

    let posts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        where : {
            communityId
        },
        include: [
            {
                model: Comments,

            },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes } ,
            { model: PostSetting }
         ],
         limit: pageSize, // Limit the number of results per page
         offset: (page - 1) * pageSize
    });


    return res.json(posts)
})


// router.get('/:id/history', async (req, res) => {
    //     const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    //     const pageSize = 10; // Number of posts per page

//     const { user } = req
//     const userId = user.dataValues.id

//     let posts = await Posts.findAll({
//         where: {
//             userId
//         },
//         include: [
//             { model: Comments },
//             {
//                 model: Communities,
//                 include: [
//                     { model: communityStyles }
//                 ]
//             },
//             { model: User},
//             { model: PostImages},
//             { model: Votes } ,
//             {
//                 model: PostSetting,
//              }
//          ],
//          limit: pageSize, // Limit the number of results per page
//          offset: (page - 1) * pageSize
//     });


//     return res.json(posts)

// })


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
    const { description, tags } = req.body

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    postExist.set({
        description,
        tags
    })
    await postExist.save()

    let post = await Posts.findByPk(postId, {
        include: [
            {
                model: Comments,
                include: [
                    { model: User },
                    { model: Votes }
                ]
            },
            {
                model: Communities,
                include: [
                    { model: communityStyles }
                ]
            },
            { model: User },
            { model: PostImages },
            { model: Votes },
            { model: PostSetting }
         ]
        });

        let members = await CommunityMembers.findAll({
            where: {
              communityId: post.dataValues.Community.dataValues.id
            }
        });

        post.dataValues.Community.dataValues.CommunityMembers = members.length


    return res.json(post)
})

router.delete("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);

    if (!postExist) {

    return res.status(404).json({"message": "Post couldn't be found"});

    }

    await postExist.destroy()

    return res.json({
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

router.post('/:id/history', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);
    const { user } = req
    const userId = user.dataValues.id


    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let setting = await PostSetting.create({
        postId,
        userId,
        history: new Date()
    })

    let history2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
            {
                model: Posts,
                include: [
                    {
                        model: Comments,
                        include: [
                            { model: User },
                            { model: Votes }
                        ]
                    },
                    {
                        model: Communities,
                        include: [
                            { model: communityStyles }
                        ]
                    },
                    { model: User },
                    { model: PostImages },
                    { model: Votes },
                 ]
            }
        ]
    })

    return res.json(
        history2
    )

})

router.put('/:id/history', async (req, res) => {
    let postId = req.params.id;
    const { user } = req
    const userId = user.dataValues.id

    let setting = await PostSetting.findOne({
        where: {
            postId,
            userId
        }
    });

    if (!setting) {

    return res.json({"message": "Setting couldn't be found"});

    }

    setting.set({
        history: new Date()
    })

    await setting.save()

    let history2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
            {
                model: Posts,
                include: [
                    {
                        model: Comments,
                        include: [
                            { model: User },
                            { model: Votes }
                        ]
                    },
                    {
                        model: Communities,
                        include: [
                            { model: communityStyles }
                        ]
                    },
                    { model: User },
                    { model: PostImages },
                    { model: Votes },
                 ]
            }
        ]
    })

    return res.json(history2)

})


router.delete('/history/:id', async (req, res) => {
    let historyId = req.params.id;
    let historyExsist = await postsHistories.findByPk(historyId);

    if (!historyExsist) {

    return res.json({"message": "History couldn't be found"});

    }

    await historyExsist.destroy()

    return res.json({
        message: "Successfully deleted"
    })


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

    // if (upVote) {
    //     postExist.set({
    //         votes: postExist.votes + 1
    //     })
    //     await postExist.save()

    // }


    if (boolean == 0) downVote = await Votes.create({
        postId,
        userId,
        downVote: 1,
        upVote: 0
    })

    // if (downVote) {
    //     postExist.set({
    //         downVotes: postExist.downVotes + 1
    //     })
    //     await postExist.save()

    // }


    let vote = upVote ? upVote : downVote

    return res.json(vote)

})

router.put('/:id/votes', async (req, res) => {
    let voteId = req.params.id;
    let voteExist = await Votes.findByPk(voteId);
    const boolean = req.query.boolean;
    let post = await Posts.findByPk(voteExist.dataValues.postId)

    console.log(boolean)
    const { user } = req
    const userId = user.dataValues.id

    if (!voteExist) {

    res.status(404).json({"message": "Vote couldn't be found"});

    }

    let upVote
    let downVote

    if (boolean == 1) {
        upVote = voteExist.set({
                    upVote: 1,
                    downVote: 0
                })
        await upVote.save()
    }


    // if (upVote) {
    //     post.set({
    //         votes: post.votes + 1,
    //         downVotes: post.downVotes - 1,
    //     })
    //     await post.save()

    // }


    if (boolean == 0) {
        downVote = voteExist.set({
                downVote: 1,
                upVote: 0
        })

        await downVote.save()

    }

    // if (downVote) {
    //     post.set({
    //         downVotes: post.downVotes + 1,
    //         votes: post.votes - 1
    //     })
    //     await post.save()

    // }


    let vote = upVote ? upVote : downVote

    return res.json(vote)

})

router.post('/comment/:id/votes', async (req, res) => {
    let commentId = req.params.id;
    let commentExist = await Comments.findByPk(commentId);
    const boolean = req.query.boolean;

    // console.log(boolean)
    const { user } = req
    const userId = user.dataValues.id

    if (!commentExist) {

    res.status(404).json({"message": "Comment couldn't be found"});

    }

    let upVote
    let downVote

    if (boolean == 1) upVote = await Votes.create({
        commentId,
        userId,
        upVote: 1,
        downVote: 0
    })

    if (boolean == 0) downVote = await Votes.create({
        commentId,
        userId,
        downVote: 1,
        upVote: 0
    })

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

    if (post && voteExist.dataValues.upVote === 1) {
        post.set({
            votes: post.dataValues.votes - 1
        })

        await post.save()
    }

    if (post && voteExist.dataValues.downVote === 1) {
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

    let comment2 = await Comments.findByPk(c.dataValues.id, {
        include: [
            { model: User },
            { model: Votes }
        ]
    })


    return res.json(comment2)
})



module.exports = router;
