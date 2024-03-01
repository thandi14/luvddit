const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comments, Post, User, Votes, Community, CommunityStyle, CommentSetting, PostImages, PostSetting } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
    const { comment2 } = req.body

    if (!commentExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    console.log(comment2)

    commentExist.set({
        comment: comment2
    })

    await commentExist.save()

    let comment = await Comments.findByPk(commentId, {
        include: [
            {
                model: User,
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
            { model: Votes }
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

    comment.dataValues.Profile = profile


    return res.json(comment)
})


router.delete("/:id", async (req, res) => {
    const { user } = req
   // const userId = user.dataValues.id
    const commentId = req.params.id

    let comment = await Comments.findByPk(commentId);

    console.log(commentId)

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
           {
                model: Post,
                include: [
                    {
                        model: Comments,
                        include: [
                            { model: User },
                            { model: Votes }
                        ]
                    },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
                        ]
                    },
                    { model: User },
                    { model: PostImages },
                    { model: Votes },
                    { model: PostSetting}
                 ]
            }
            ]
            }
        ]
    })

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



router.delete('/saved/:id', async (req, res) => {
    let savedId = req.params.id;
    let setting = await CommentSetting.findByPk(savedId);

    if (!setting) {

    return res.json({"message": "Setting couldn't be found"});

    }

    await setting.destroy()


    return res.json({ "message": "Setting sucessfully deleted"})


})




module.exports = router;
