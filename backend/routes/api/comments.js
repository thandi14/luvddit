const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comments, Post, User, Votes, Community, CommunityStyle, CommentSetting, PostImages, PostSetting, CommunityMembers } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get("/:id", async (req, res) => {
    let commentId = req.params.id;
    let commentExist = await Comments.findByPk(commentId);

    if (!commentExist) {

        res.status(404).json({"message": "Post couldn't be found"});

    }

    const includeReply = async function(replies) {

        for (let r of replies) {
            let profile = await Community.findOne({
                where: {
                    userId: r.dataValues.userId,
                    type: "Profile"
                },
                include: [
                      { model: CommunityStyle }
                ]
            })

            r.dataValues.Profile = profile

            let moreReplies = await Comments.findAll({
                where: {
                    parent: r.dataValues.id
                },
                include: [
                { model: CommentSetting},
                { model: User},
                { model: Votes }
                ]
            })


            moreReplies = await includeReply(moreReplies)
            r.dataValues.Replies = moreReplies


        }

        return replies

    }

    let comment = await Comments.findByPk(commentId, {
                include: [
                { model: CommentSetting},
                { model: User},
                { model: Votes }
            ]
    });

        let profile = await Community.findOne({
            where: {
                userId: comment.dataValues.userId,
                type: "Profile"
            },
            include: [
                  { model: CommunityStyle }
            ]
        })

        let replies = await Comments.findAll({
            where: {
                parent: comment.dataValues.id
            },
            include: [
            { model: CommentSetting},
            { model: User},
            { model: Votes }
            ]
        })

        replies = await includeReply(replies)

        console.log(replies)


        comment.dataValues.Replies = replies

        comment.dataValues.Profile = profile

    return res.json(comment)
})


router.get("/current", async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let posts = await Comments.findAll({
       where: {
        userId,
       },
       include: [
        { model: Post },
       ]

    });

    return res.json(posts)
})

router.get("/search", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10;
    const { user } = req
    const userId = user.dataValues.id

    let posts = await Comments.findAll({
        order: [['createdAt', 'DESC']],
       include: [
        {
            model: Post,
            include: [
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
                    ]
                 },
                { model: Votes },
                { model: Comments},
                { model: User }
            ]
        },
        {
            model: User,
            include: [
                {
                    model: Community,
                    where: {
                        type: "Profile",
                    },
                    include: [
                        { model: CommunityStyle }
                    ]
                 },
            ],

         },
         { model: Votes }
       ],
       limit: pageSize, // Limit the number of results per page
       offset: (page - 1) * pageSize

    });

    return res.json(posts)
})

router.get("/search/comments", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const search = req.query.search
    const { user } = req
    // const userId = user.dataValues.id

    const pageSize = 10; // Number of posts per page

    let posts = await Comments.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            comment: {
                [Op.substring]: search

            }
        },
       include: [
        {
            model: Post,
            include: [
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
                    ]
                 },
                { model: Votes },
                { model: Comments},
                { model: User }
            ]
        },
        {
            model: User,
            include: [
                {
                    model: Community,
                    where: {
                        type: "Profile",
                    },
                    include: [
                        { model: CommunityStyle }
                    ]
                 },
            ],

         },
         { model: Votes }
       ],
       limit: pageSize, // Limit the number of results per page
       offset: (page - 1) * pageSize

    });

    return res.json(posts)
})




router.put("/:id", async (req, res) => {
    let commentId = req.params.id;
    let commentExist = await Comments.findByPk(commentId);
    const { comment } = req.body

    if (!commentExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }


    commentExist.set({
        comment
    })

    await commentExist.save()

    let comment2 = await Comments.findByPk(commentId, {
        include: [
            {
                model: User,
             },
            { model: Votes }
        ]
    })

    let profile = await Community.findOne({
        where: {
            userId: comment2.dataValues.userId,
            type: "Profile"
        },
        include: [
              { model: CommunityStyle }
        ]
    })

    const includeReply = async function(replies) {

        for (let r of replies) {
            let profile = await Community.findOne({
                where: {
                    userId: r.dataValues.userId,
                    type: "Profile"
                },
                include: [
                      { model: CommunityStyle }
                ]
            })

            r.dataValues.Profile = profile

            let moreReplies = await Comments.findAll({
                where: {
                    parent: r.dataValues.id
                },
                include: [
                { model: CommentSetting},
                { model: User},
                { model: Votes }
                ]
            })


            moreReplies = await includeReply(moreReplies)
            r.dataValues.Replies = moreReplies


        }

        return replies

    }

    let replies = await Comments.findAll({
        where: {
            parent: comment2.dataValues.id
        },
        include: [
        { model: CommentSetting},
        { model: User},
        { model: Votes }
        ]
    })

    replies = await includeReply(replies)

    comment2.dataValues.Replies = replies

    comment2.dataValues.Profile = profile

    return res.json(comment2)
})


router.delete("/:id", async (req, res) => {
    const { user } = req
   // const userId = user.dataValues.id
    const commentId = req.params.id

    let comment = await Comments.findByPk(commentId);

    let replies = await Comments.findAll({
        where: {
            parent: commentId
        }
    })

    const deleteRe = async function(replies) {

        if (replies.length) {

            for (let reply of replies) {

                let moreReplies = await Comments.findAll({
                    where: {
                        parent: reply.dataValues.id
                    }
                })

                await deleteRe(moreReplies)

                await reply.destroy()
            }
        }

    }

    if (replies.length) await deleteRe(replies)

    if (!comment) return res.status(404).json({
        "message": "Comment not found"
    })

    await comment.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})

router.post('/:id/saved', async (req, res) => {
    let commentId = req.params.id;
    let commentExist = await Comments.findByPk(commentId);
    const { user } = req
    const userId = user.dataValues.id


    if (!commentExist) {

    res.status(404).json({"message": "Comment couldn't be found"});

    }

        setting = await CommentSetting.create({
            commentId,
            userId,
            saved: new Date()
        })


    let saved2 = await CommentSetting.findByPk(setting.dataValues.id, {
        include: [
            {
            model: Comments,
            include:[
            { model: CommentSetting} ,
            { model: User,
                // include: [
                //     {
                //         model: Community,
                //         where: {
                //             type: "Profile"
                //         },
                //         include: [
                //             { model: CommunityStyle }
                //         ]
                //     },
                // ]
            },
            { model: Votes },
        //    {
        //         model: Post,
        //         include: [
        //             {
        //                 model: Comments,
        //                 include: [
        //                     { model: User },
        //                     { model: Votes }
        //                 ]
        //             },
        //             {
        //                 model: Community,
        //                 include: [
        //                     { model: CommunityStyle }
        //                 ]
        //             },
        //             { model: User },
        //             { model: PostImages },
        //             { model: Votes },
        //             { model: PostSetting}
        //          ]
        //     }
            ]
             }
        ]
    })


    let profile = await Community.findOne({
        where: {
            userId: saved2.dataValues.Comment.dataValues.userId,
            type: "Profile"
        },
        include: [
                { model: CommunityStyle }
        ]
    })

    const includeReply = async function(replies) {

        for (let r of replies) {
            let profile = await Community.findOne({
                where: {
                    userId: r.dataValues.userId,
                    type: "Profile"
                },
                include: [
                      { model: CommunityStyle }
                ]
            })

            r.dataValues.Profile = profile

            let moreReplies = await Comments.findAll({
                where: {
                    parent: r.dataValues.id
                },
                include: [
                { model: CommentSetting},
                { model: User},
                { model: Votes }
                ]
            })


            moreReplies = await includeReply(moreReplies)
            r.dataValues.Replies = moreReplies


        }

        return replies

    }

    let moreReplies = await Comments.findAll({
        where: {
            parent: saved2.dataValues.commentId
        },
        include: [
        { model: CommentSetting},
        { model: User},
        { model: Votes }
        ]
    })


    moreReplies = await includeReply(moreReplies)

    saved2.dataValues.Comment.dataValues.Replies = moreReplies

    saved2.dataValues.Comment.dataValues.Profile = profile


    return res.json(
        saved2
    )

})

// router.get("/saved", async (req, res) => {
//     const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
//     const pageSize = 10; // Number of posts per page

//     const { user } = req
//     const userId = user.dataValues.id

//     let comments = await CommentSetting.findAll({
//         order: [['saved', 'DESC']],
//         where: {
//             userId
//         },
//         include: [
//             {
//             model: Comments,
//             include:[

//             {
//                 model: Post,
//                 include: [
//                     {
//                         model: Comments,
//                         include: [
//                             { model: User },
//                             { model: Votes }
//                         ]
//                     },
//                     {
//                         model: Community,
//                         include: [
//                             { model: CommunityStyle }
//                         ]
//                     },
//                     { model: User },
//                     { model: PostImages },
//                     { model: Votes },
//                     { model: PostSetting}
//                  ]
//             }
//             ]
//             }
//         ]
//         //  limit: pageSize, // Limit the number of results per page
//         //  offset: (page - 1) * pageSize
//     });

//     comments = comments.filter((p) => p.dataValues.saved)

//     let paginatedComments = comments.slice((page - 1) * pageSize, page * pageSize);


//     return res.json(paginatedComments)
// })



router.put('/saved/:id', async (req, res) => {
    let savedId = req.params.id;
    let setting = await CommentSetting.findByPk(savedId);

    if (!setting) {

    return res.json({"message": "Setting couldn't be found"});

    }

    setting.set({
        saved: null
    })

    await setting.save()

    let comment = await Comments.findByPk(setting.dataValues.commentId, {
        include:[
             { model: CommentSetting },
             { model: User},
             { model: Votes },
             ]

    })

    let profile = await Community.findOne({
        where: {
            userId: comment.dataValues.userId,
            type: "Profile"
        },
        include: [
                { model: CommunityStyle }
        ]
    })

    const includeReply = async function(replies) {

        for (let r of replies) {
            let profile = await Community.findOne({
                where: {
                    userId: r.dataValues.userId,
                    type: "Profile"
                },
                include: [
                      { model: CommunityStyle }
                ]
            })

            r.dataValues.Profile = profile

            let moreReplies = await Comments.findAll({
                where: {
                    parent: r.dataValues.id
                },
                include: [
                { model: CommentSetting},
                { model: User},
                { model: Votes }
                ]
            })


            moreReplies = await includeReply(moreReplies)
            r.dataValues.Replies = moreReplies


        }

        return replies

    }

    let moreReplies = await Comments.findAll({
        where: {
            parent: comment.dataValues.id
        },
        include: [
        { model: CommentSetting},
        { model: User},
        { model: Votes }
        ]
    })


    moreReplies = await includeReply(moreReplies)

    comment.dataValues.Replies = moreReplies

    comment.dataValues.Profile = profile


    return res.json(comment)


})




module.exports = router;
