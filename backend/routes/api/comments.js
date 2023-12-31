const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comments, Post, User, Votes, Community, CommunityStyle } = require('../../db/models');
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



module.exports = router;
