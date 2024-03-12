const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post, Comments, Community, User, PostImages, CommunityMembers, Votes, CommunityStyle, PostSetting, CommentSetting } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const multer = require('multer');
const { singleMulterUpload, singlePublicFileUpload, multiplePublicFileUpload, multipleMulterUpload } = require('../../aws3');
//const upload = multer({dest: 'uploads/'});
const router = express.Router();

const storage = multer.memoryStorage(); // You can change this storage configuration as needed

const upload = multer({
    dest: 'uploads/',
    storage: storage,
    limits: {
      fileSize: 100 * 1024 * 1024, // 10MB limit (adjust as needed)
    },
});



router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let communityId = await Community.findAll({
        attributes: ['id'],
        where: {
            type: 'Private'
        },
    })



    communityId = communityId.map(community => community.dataValues.id);
    let posts = await Post.findAll({
            order: [['id', 'DESC']],
            where: {
                communityId: {
                    [Op.notIn]: communityId
                },

            },
            include: [
                {
                    model: Comments,
                    include: [
                        { model: CommentSetting}
                    ]
                 },
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
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

router.get("/best", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let communityId = await Community.findAll({
        attributes: ['id'],
        where: {
            type: 'Private'
        },
    })

    let posts = await Post.findAll({
        where: {
            communityId: {
                [Op.notIn]: communityId
            },

        },
        include: [
            {
                model: Comments,
                include: [
                    { model: CommentSetting}
                ]
             },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            {
                model: Votes,
            } ,
            { model: PostSetting }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize

    });

    posts = posts.sort((a, b) => b.dataValues.Comments.length - a.dataValues.Comments.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

    // let posts = await Votes.findAll({
    //     order: [['upVote', 'DESC']],
    //     include: [
    //         { model: Post,
    //             where: {
    //                 communityId: {
    //                     [Op.notIn]: communityId
    //                 },

    //             },
    //             include: [
    //                 { model: Comments },
    //                 {
    //                     model: Community,
    //                     include: [
    //                         { model: CommunityStyle }
    //                     ]
    //                 },
    //                 { model: User},
    //                 { model: PostImages},
    //                 {
    //                     model: Votes,

    //                 } ,
    //                 { model: PostSetting }
    //             ],

    //         }
    //     ],
    //     limit: pageSize, // Limit the number of results per page
    //     offset: (page - 1) * pageSize
    // })

    return res.json(posts)
})


router.get("/hot", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let communityId = await Community.findAll({
        attributes: ['id'],
        where: {
            type: 'Private'
        },
    })

    let posts = await Post.findAll({
        where: {
            communityId: {
                [Op.notIn]: communityId
            },

        },

        include: [
            {
                model: Comments,
                include: [
                    { model: CommentSetting}
                ]
             },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            {
                model: Votes,
            } ,
            { model: PostSetting }
        ],


    });

    posts = posts.sort((a, b) => b.dataValues.Votes.length - a.dataValues.Votes.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
})



router.get("/top", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let communityId = await Community.findAll({
        attributes: ['id'],
        where: {
            type: 'Private'
        },
    })


    let posts = await Post.findAll({
        where: {
            communityId: {
                [Op.notIn]: communityId
            },

        },
        include: [
            {
                model: Comments,
                include: [
                    { model: CommentSetting}
                ]
             },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            {
                model: Votes,
               // order: [['upVote', 'DESC']],

            } ,
            { model: PostSetting }
        ],
        // limit: pageSize, // Limit the number of results per page
        // offset: (page - 1) * pageSize

    });

    posts = posts.sort((a, b) => b.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length - a.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
})


router.get("/history", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    const userId = user.dataValues.id

    let posts = await PostSetting.findAll({
        order: [['history', 'DESC']],
        where: {
            userId,

        },
        include: [
            {
                model: Post,
                include: [
                    { model: Comments },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });


    posts = posts.filter((p) => p.dataValues.history)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);



    return res.json(paginatedPosts)
})

router.get("/saved", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    const userId = user.dataValues.id

    let comments = await CommentSetting.findAll({
        order: [['saved', 'DESC']],
        where: {
            userId
        },
        include:
            { model: Comments,
                include: [
            { model: User },
            { model: CommentSetting },
            {
                model: Post,
                include: [
                    {
                        model: Comments,

                    },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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
         ]},
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    let posts = await PostSetting.findAll({
        order: [['saved', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Post,
                include: [
                    { model: Comments },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    // console.log(posts)
    // console.log(comments)

    posts = posts.concat(comments)

    posts = posts.filter((p) => p.dataValues.saved).sort((a, b) => a.dataValues.saved - b.dataValues.saved)

    let paginated = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginated)
})

router.get("/hidden", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    const userId = user.dataValues.id

    let posts = await PostSetting.findAll({
        order: [['hidden', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Post,
                include: [
                    { model: Comments },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    posts = posts.filter((p) => p.dataValues.saved)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
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
                model: Post,
                include: [
                    { model: Comments },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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

    // router.get("/best", async (req, res) => {
    //     const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    //     const pageSize = 10; // Number of posts per page

    //     const { user } = req
    //     let userId = user.dataValues.id

    //     let posts = await Votes.findAll({
    //         order: [['upVote', 'ASC']],
    //         where: {
    //             userId
    //         },
    //         include: [
    //             {
    //                 model: Post,
    //                 include: [
    //                     { model: Comments },
    //                     {
    //                         model: Community,
    //                         include: [
    //                             { model: CommunityStyle }
    //                         ]
    //                     },
    //                     { model: User},
    //                     { model: PostImages},
    //                     {
    //                         model: Votes,
    //                         order: [['createdAt', 'DESC']],
    //                         where: {
    //                             userId
    //                         },
    //                      },
    //                     { model: PostSetting }
    //                 ]
    //             }
    //          ],
    //          limit: pageSize, // Limit the number of results per page
    //          offset: (page - 1) * pageSize
    //     });


    //     return res.json(posts)
    //     })


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

    router.get("/search", async (req, res) => {
        const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
        const search = req.query.search

        const pageSize = 10; // Number of posts per page

        let communityId = await Community.findAll({
            attributes: ['id'],
            where: {
                type: 'Private'
            },
        })

        communityId = communityId.map(community => community.dataValues.id);
        let posts = await Post.findAll({
            order: [['id', 'DESC']],
            where: {
                communityId: {
                    [Op.notIn]: communityId
                },
                title: {
                    [Op.substring]: search

                }
            },
            include: [
                { model: Comments },
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
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



router.get("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Post.findByPk(postId);

    if (!postExist) {

        res.status(404).json({"message": "Post couldn't be found"});

    }

    let post = await Post.findByPk(postId, {
        include: [
            {
                model: Comments,
                include: [
                { model: CommentSetting},
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
                { model: Votes }
            ]
            },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            {
                model: User,
            },
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


    for (let c of post.dataValues.Comments) {
        let profile = await Community.findOne({
            where: {
                userId: c.dataValues.userId,
                type: "Profile"
            },
            include: [
                  { model: CommunityStyle }
            ]
        })

        c.dataValues.Profile = profile

    }

    post.dataValues.Community.dataValues.CommunityMembers = members.length

    return res.json(post)
})


router.get("/hot", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let userId = req.params.id


    let posts = await Post.findAll({
        where: {
            userId

        },
        include: [
            { model: Comments },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            {
                model: Votes,
               // order: [['upVote', 'DESC']],

            } ,
            { model: PostSetting }
        ],
        // limit: pageSize, // Limit the number of results per page
        // offset: (page - 1) * pageSize

    });

    posts = posts.sort((a, b) => b.dataValues.Votes.length - a.dataValues.Votes.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

    return res.json(paginatedPosts)
})


router.get("/:id/top", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let userId = req.params.id


    let posts = await Post.findAll({
        where: {
            userId

        },
        include: [
            { model: Comments },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            {
                model: Votes,
               // order: [['upVote', 'DESC']],

            } ,
            { model: PostSetting }
        ],
        // limit: pageSize, // Limit the number of results per page
        // offset: (page - 1) * pageSize

    });

    posts = posts.sort((a, b) => b.dataValues.Votes.length - a.dataValues.Votes.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);




    return res.json(paginatedPosts)
})


router.get('/:id/overview', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 5; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    const [posts, comments] = await Promise.all([
        Post.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                userId
            },
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    include: [
                    { model: CommentSetting},
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
                    { model: Votes }
                    ]

                 },
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
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
        Post.findAll({
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    },
                    include: [
                    { model: CommentSetting},
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
                ]
                },
                {
                    model: Community,
                    include: [
                        { model: CommunityStyle }
                    ]
                },
                { model: User},
                { model: PostImages},
                { model: Votes } ,
                { model: PostSetting }
            ],
            order: [
                ['updatedAt', 'DESC'],
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

router.get('/:id/overview/top', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 5; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    const [posts, comments] = await Promise.all([
        Post.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                userId
            },
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    },
                    include: [
                    { model: CommentSetting},
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
                { model: PostSetting }
            ],
        }),
        Post.findAll({
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    }
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
                { model: PostSetting }
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize
        }),
    ]);

    // Sort posts by the number of comments
    const sortedPosts = posts.sort((a, b) => b.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length - a.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length);

    // Sort comments by updatedAt if needed
    const sortedComments = comments.sort((a, b) => b.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length - a.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length);

    // Paginate the sorted posts and comments
    const paginatedPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);
    const paginatedComments = sortedComments.slice((page - 1) * pageSize, page * pageSize);

    return res.json({
        posts: paginatedPosts,
        comments: paginatedComments
    });

})

router.get('/:id/overview/hot', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 5; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    const [posts, comments] = await Promise.all([
        Post.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                userId
            },
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    },
                    include: [
                    { model: CommentSetting},
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
                { model: PostSetting }
            ],
        }),
        Post.findAll({
            include: [
                {
                    model: Comments,
                    order: [['updatedAt', 'DESC']],
                    where: {
                        userId
                    }
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
                { model: PostSetting }
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize
        }),
    ]);

    // Sort posts by the number of comments
    const sortedPosts = posts.sort((a, b) => b.Votes.length - a.Votes.length);

    // Sort comments by updatedAt if needed
    const sortedComments = comments.sort((a, b) => b.Votes.length - a.Votes.length);;

    // Paginate the sorted posts and comments
    const paginatedPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);
    const paginatedComments = sortedComments.slice((page - 1) * pageSize, page * pageSize);

    return res.json({
        posts: paginatedPosts,
        comments: paginatedComments
    });

})

router.get("/:id/current", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    let posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            { model: Comments },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
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

router.get("/:id/current/top", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    let posts = await Post.findAll({
        where: {
            userId
        },
        include: [
            { model: Comments },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes } ,
            { model: PostSetting }
         ],
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    posts = posts.sort((a, b) => b.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length - a.dataValues.Votes.filter((v) => v.dataValues.upVote === 1).length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

    return res.json(paginatedPosts)
})

router.get("/:id/current/hot", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    const { user } = req
    let userId = req.params.id;

    let posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            { model: Comments },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]
            },
            { model: User},
            { model: PostImages},
            { model: Votes } ,
            { model: PostSetting }
         ],
        //  limit: pageSize, // Limit the number of results per page
        //  offset: (page - 1) * pageSize
    });

    posts = posts.sort((a, b) => b.dataValues.Votes.length - a.dataValues.Votes.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
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
                model: Post,
                include: [
                    {
                        model: Comments,
                        order: [['createdAt', 'DESC']],
                        where: {
                            userId
                        },
                        include: [
                            { model: CommentSetting }
                        ]
                    },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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

router.get("/:id/comments/hot", async (req, res) => {
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
                model: Post,
                include: [
                    {
                        model: Comments,
                        order: [['createdAt', 'DESC']],
                        where: {
                            userId
                        },
                    },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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

    posts = posts.sort((a, b) => b.dataValues.Votes?.length - a.dataValues.Votes?.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
})

router.get("/:id/comments/top", async (req, res) => {
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
                model: Post,
                include: [
                    {
                        model: Comments,
                        order: [['createdAt', 'DESC']],
                        where: {
                            userId
                        },
                    },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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

    posts = posts.sort((a, b) => b.dataValues.Votes?.filter((v) => v.dataValues.upVote === 1)?.length - a.dataValues.Votes?.filter((v) => v.dataValues.upVote === 1)?.length)

    let paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);


    return res.json(paginatedPosts)
})


router.get("/:id/communities", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

   // const { user } = req
    let communityId = req.params.id;

    let posts = await Post.findAll({
        order: [['id', 'DESC']],
        where : {
            communityId
        },
        include: [
            {
                model: Comments,

            },
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
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
    let postExist = await Post.findByPk(postId);

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
    let postExist = await Post.findByPk(postId);
    const { description, tags } = req.body

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    postExist.set({
        description,
        tags
    })
    await postExist.save()

    let post = await Post.findByPk(postId, {
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
    let postExist = await Post.findOne({
        where: {
          id: postId
        }
    });

    if (!postExist) {

    return res.status(404).json({"message": "Post couldn't be found"});

    }

    await postExist.destroy()

    return res.json({
        message: "Successfully deleted"
    })

})

router.post(
    '/:id/images',
    multipleMulterUpload("image"),
    async (req, res) => {
        let postId = req.params.id;
        let postExist = await Post.findByPk(postId);
        //const { imgURL } = req.body
        // const imgURL = await multiplePublicFileUpload(req.file);
        if (!postExist) {
          res.status(404).json({ "message": "Post couldn't be found" });
          return; // Return early if post doesn't exist
        }
        // console.log(imgURL)
        const imgURLs = await multiplePublicFileUpload(req.files);

        // if (!postExist) {

        // res.status(404).json({"message": "Post couldn't be found"});

        // }

        // let image = await PostImages.create({
        //     imgURL,
        //     postId
        // })
        const postImages = [];

        for (const file of imgURLs) {


            const image = await PostImages.create({
              imgURL: file,
              postId
            });

            postImages.push(image); // Store the created image in an array

        }


        return res.json(postImages)

})

router.post('/:id/history', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Post.findByPk(postId);
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
    })

    return res.json(
        history2
    )

})

router.post('/:id/saved', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Post.findByPk(postId);
    const { user } = req
    const userId = user.dataValues.id


    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

        setting = await PostSetting.create({
            postId,
            userId,
            saved: new Date()
        })


    let saved2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
    })

    return res.json(
        saved2
    )

})

router.post('/:id/hidden', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Post.findByPk(postId);
    const { user } = req
    const userId = user.dataValues.id


    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

        setting = await PostSetting.create({
            postId,
            userId,
            hidden: new Date()
        })


    let hidden2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
    })

    return res.json(
        hidden2
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
                    { model: PostSetting }
                 ]
            }
        ]
    })

    return res.json(history2)

})

router.put('/:id/saved', async (req, res) => {
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
        saved: new Date()
    })

    await setting.save()

    let saved2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
                    { model: PostSetting }
                 ]
            }
        ]
    })

    return res.json(saved2)

})



router.put('/saved/:id', async (req, res) => {
    let savedId = req.params.id;
    let setting = await PostSetting.findByPk(savedId);

    if (!setting) {

    return res.json({"message": "Setting couldn't be found"});

    }

    setting.set({
        saved: null
    })

    await setting.save()

    //await historyExsist.destroy()

    let saved2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
                    { model: PostSetting }
                 ]
            }
        ]
    })

    return res.json(saved2)


})

router.put('/:id/hidden', async (req, res) => {
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
        hidden: new Date()
    })

    await setting.save()

    let hidden2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
                    { model: PostSetting }
                 ]
            }
        ]
    })

    return res.json(hidden2)

})



router.put('/hidden/:id', async (req, res) => {
    let hiddenId = req.params.id;
    let setting = await PostSetting.findByPk(hiddenId);

    if (!setting) {
  let posts = await Votes.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            userId
        },
        include: [
            {
                model: Post,
                include: [
                    { model: Comments },
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
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
    return res.json({"message": "Setting couldn't be found"});

    }

    setting.set({
        hidden: null
    })

    await setting.save()

    //await historyExsist.destroy()

    let hidden2 = await PostSetting.findByPk(setting.dataValues.id, {
        include: [
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
                    { model: PostSetting }
                 ]
            }
        ]
    })

    return res.json(hidden2)


})


router.post('/:id/votes', async (req, res) => {
    let postId = req.params.id;
    let postExist = await Post.findByPk(postId);
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

    if (boolean == 0) downVote = await Votes.create({
        postId,
        userId,
        downVote: 1,
        upVote: 0
    })

    let vote = upVote ? upVote : downVote

    return res.json(vote)

})

router.put('/:id/votes', async (req, res) => {
    let voteId = req.params.id;
    let voteExist = await Votes.findByPk(voteId);
    const boolean = req.query.boolean;
    let post = await Post.findByPk(voteExist.dataValues.postId)

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

    if (boolean == 0) {
        downVote = voteExist.set({
                downVote: 1,
                upVote: 0
        })

        await downVote.save()

    }

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

    let post = await Post.findByPk(voteExist.dataValues.postId)

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
            userId: c.dataValues.userId,
            type: "Profile"
        },
        include: [
              { model: CommunityStyle }
        ]
    })

    comment2.dataValues.Profile = profile


    return res.json(comment2)
})



module.exports = router;
