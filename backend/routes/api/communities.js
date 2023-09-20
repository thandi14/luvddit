const express = require('express')
const bcrypt = require('bcryptjs');
const { Op, Sequelize } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Community, CommunityStyle, PostSetting, Votes, Post, User, CommunityMembers, Comments, PostImages } = require('../../db/models');
const multer = require('multer');
const { singleMulterUpload, singlePublicFileUpload, multiplePublicFileUpload, multipleMulterUpload } = require('../../aws3');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const storage = multer.memoryStorage(); // You can change this storage configuration as needed

const upload = multer({
    dest: 'uploads/',
    storage: storage,
    limits: {
      fileSize: 100 * 1024 * 1024, // 10MB limit (adjust as needed)
    },
});


const router = express.Router();

router.post('/:id/posts', async (req, res) => {
    const communityId = req.params.id
    const { description, title, tags } = req.body
    const { user } = req
    const userId = user.dataValues.id


    let post = await Post.create({
        communityId,
        userId,
        title,
        description,
        tags,
        votes: 0,
    })

    let post2 = await Post.findByPk(post.dataValues.id, {
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
            communityId: post2.dataValues.Community.dataValues.id
        }
        });

    post2.dataValues.Community.dataValues.CommunityMembers = members.length

    return res.json(post2)
})

router.get("/", async (req, res) => {
    let communities = await Community.findAll({
        include: [
            { model: Post },
            { model: User },
            { model: CommunityStyle }
         ]}
        );



        for (let i = 0; i < communities.length; i++) {
            let members = await CommunityMembers.findAll({
              where: {
                communityId: communities[i].id
              }
            });

            communities[i].dataValues.CommunityMembers = members.length

        }





    return  res.json(communities)
})

router.get("/search", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    let communities = await Community.findAll({
        where: {
            type: {
                [Op.notIn]: ["Private", "Restricted"]
            }
        },
        include: [
            { model: Post },
            { model: User },
            { model: CommunityStyle }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize
    });

    for (let i = 0; i < communities.length; i++) {
        let members = await CommunityMembers.findAll({
          where: {
            communityId: communities[i].id
          }
        });

        communities[i].dataValues.CommunityMembers = members.length

    }

    return res.json(communities)

})

router.get("/search2", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const pageSize = 10; // Number of posts per page

    let communities = await Community.findAll({
        where: {
            type: "Profile"
        },
        include: [
            { model: Post },
            { model: User },
            { model: CommunityStyle }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize
    });

    for (let i = 0; i < communities.length; i++) {
        let members = await CommunityMembers.findAll({
          where: {
            communityId: communities[i].id
          }
        });

        communities[i].dataValues.CommunityMembers = members.length

    }

    return res.json(communities)

})



router.get("/current", async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let communities = await Community.findAll({
       where: {
        userId,
       },
       include: [
        { model: Post },
        { model: User },
        { model: CommunityStyle }
     ]
    });

    for (let i = 0; i < communities.length; i++) {
        let members = await CommunityMembers.findAll({
          where: {
            communityId: communities[i].id
          }
        });

        communities[i].dataValues.CommunityMembers = members.length

    }

    return res.json(communities)
})

router.get("/other", async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let communitiesExist = await CommunityMembers.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Community,
                include: [
                        {
                            model: Post,
                            include: [
                                { model: PostImages },
                                { model: User},
                                { model: Comments }
                            ]
                         },
                        { model: User },
                        { model: CommunityStyle },
                ]

            }

        ]

    });

    // let communities = await Communities.findAll({
    //    where: {
    //     userId,
    //    },
    //    include: [
    //     { model: Posts },
    //     { model: User },
    //     { model: communityStyles },
    //  ]
    // });

    for (let i = 0; i < communitiesExist.length; i++) {
        let members = await CommunityMembers.findAll({
          where: {
            communityId: communitiesExist[i].Community.dataValues.id
          }
        });

        communitiesExist[i].Community.dataValues.CommunityMembers = members.length

    }

    return res.json(communitiesExist)
})

router.get("/:id/hot", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter

    const pageSize = 10; // Number of posts per page

    let communityId = req.params.id

    let posts = await Post.findAll({
        where: {
            communityId

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

    let communityId = req.params.id

    let posts = await Post.findAll({
        where: {
            communityId

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


router.get("/search/community", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const search = req.query.search

    const pageSize = 10; // Number of posts per page

    let communities = await Community.findAll({
        where: {
            type: {
                [Op.notIn]: ["Private", "Profile"]
            },
            name: {
                [Op.substring]: search

            }
        },
        include: [
            { model: Post },
            { model: User },
            { model: CommunityStyle }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize
    });

    for (let i = 0; i < communities.length; i++) {
        let members = await CommunityMembers.findAll({
            where: {
                communityId: communities[i].id
            }
        });

        communities[i].dataValues.CommunityMembers = members.length

    };

    return res.json(communities)
})


router.get("/search/community2", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const search = req.query.search

    const pageSize = 10; // Number of posts per page

    let communities = await Community.findAll({
        where: {
            type: "Profile",
            name: {
                [Op.substring]: search
            }
        },
        include: [
            { model: Post },
            { model: User },
            { model: CommunityStyle }
        ],
        limit: pageSize, // Limit the number of results per page
        offset: (page - 1) * pageSize
    });

    for (let i = 0; i < communities.length; i++) {
        let members = await CommunityMembers.findAll({
          where: {
            communityId: communities[i].id
          }
        });

        communities[i].dataValues.CommunityMembers = members.length

    };

    return res.json(communities)
})




router.get("/:id", async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Community.findByPk(communityId);

    if (!communityExist) {
        res.status(404).json({"message": "Community couldn't be found"});
    }

    let community = await Community.findByPk(communityId, {
        include: [
            {
                model: Post,
                include: [
                    { model: Comments},
                    { model: Community},
                    { model: User},
                    { model: PostImages},
                ]
            },
            { model: User },
            { model: CommunityStyle }
        ]
    });

    let members = await CommunityMembers.findAll({
        where: {
            communityId
        }
    });


    community.dataValues.CommunityMembers = members.length

    return res.json(community)


})

router.get("/:id/posts", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const search = req.query.search
    let communityId = req.params.id;
    let communityExist = await Post.findByPk(communityId);

    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    const pageSize = 10; // Number of posts per page

    let posts = await Post.findAll({
        order: [['id', 'DESC']],
        where: {
            communityId,
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


router.post('/', async (req, res) => {
    const { name, about, type } = req.body
    const { user } = req
    const userId = user.dataValues.id

    let community = await Community.create({
        userId,
        name,
        about,
        type
    })

    let member = await CommunityMembers.create({
        userId,
        communityId: community.dataValues.id
    })

    let style = await CommunityStyle.create({
        communityId: community.dataValues.id
    })

    let community2 = await Community.findByPk(community.dataValues.id, {
        include: [
            { model: CommunityStyle }
        ]
    })

    return res.json(community2)
})

router.put("/:id", async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Community.findByPk(communityId, {
        include: [
            {
                model: Post,
                include: [
                    { model: Comments},
                    { model: Community},
                    { model: User},
                    { model: PostImages},
                ]
            },
            { model: User },
            { model: CommunityStyle }
        ]
    });    const { name, about } = req.body

    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    communityExist.set({
        name,
        about
    })
    await communityExist.save()

    return res.json(communityExist)
})

router.delete("/:id", async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Post.findByPk(communityId);

    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    await communityExist.destroy()

    res.json({
        message: "Successfully deleted"
    })

})

router.get("/:id/comments", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const search = req.query.search
    const { user } = req
    let communityId = req.params.id;

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
            where: {
                communityId
            },
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

router.put("/:id/style",
async (req, res) => {
    let communityId = req.params.id;
    let i = req.query.i
    let ban = req.query.ban
    let bg = req.query.bg
    const { base, highlight, background, icon, banner } = req.body
    console.log("!!!!!!!!!!!!!!!!!!!!!!", i, ban, bg)
    console.log("!!!!!!!!!!!!!!!!!!!!!!", icon, banner, background)

    let communityExist = await Community.findByPk(communityId, {
        include: [
            {
                model: Post,
                include: [
                    { model: Comments},
                    { model: Community},
                    { model: User},
                    { model: PostImages},
                ]
            },
            { model: User },
            { model: CommunityStyle }
        ]
    });

    let members = await CommunityMembers.findAll({
        where: {
            communityId
        }
    });

    communityExist.dataValues.CommunityMembers = members.length



    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    let styleExist

    styleExist = await CommunityStyle.findOne({
        where: {
            communityId

        },


    });

    if (styleExist) {
        if (i) {
            styleExist.set({
                base,
                highlight,
                icon
            })

            await styleExist.save()

        }
        if (ban) {
            styleExist.set({
                base,
                highlight,
                banner,
            })

            await styleExist.save()

        }
        if (bg) {
            styleExist.set({
                base,
                highlight,
                background,
            })

            await styleExist.save()

        }
    }


    if (!styleExist) {
        if (i) {
            const style = await CommunityStyle.create({
            communityId,
            base,
            highlight,
            icon,
            });

        }
        if (ban) {
            const style = await CommunityStyle.create({
            communityId,
            base,
            highlight,
            banner,
            });

        }
        if (bg) {
            const style = await CommunityStyle.create({
            communityId,
            base,
            highlight,
            background,
            });

        }

    }


    return res.json(communityExist)


})



router.put("/:id/style/images",
multipleMulterUpload("image"),
async (req, res) => {
    let communityId = req.params.id;
    const banner = req.query.banner
    const icon = req.query.icon
    const bg = req.query.bg


    let communityExist = await Community.findByPk(communityId, {
        include: [
            {
                model: Post,
                include: [
                    { model: Comments},
                    { model: Community},
                    { model: User},
                    { model: PostImages},
                ]
            },
            { model: User },
            { model: CommunityStyle }
        ]
    });

    let members = await CommunityMembers.findAll({
        where: {
            communityId
        }
    });

    communityExist.dataValues.CommunityMembers = members.length

    const imgURLs = await multiplePublicFileUpload(req.files);
    console.log("!!!!!!!!!!!!!!!!!", imgURLs, icon, banner, bg)

    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    let styleExist

    if (communityExist) {
         styleExist = await CommunityStyle.findOne({
            where: {
             communityId

            },


        });

    }

    if (styleExist) {
        console.log("!!!!!!!!!!!!!!!!!!!!!")

        if (banner) {
            console.log("!!!!!!!!!1!!!!!!!!!!!!")
            styleExist.set({
                banner: imgURLs[0]
            })
            await styleExist.save()

        }
        else if (icon) {
            console.log("!!!!!!!!!2!!!!!!!!!!!!")

            styleExist.set({
                icon: imgURLs[0],
            })
            await styleExist.save()

        }
        else if (bg) {
            console.log("!!!!!!!!!3!!!!!!!!!!!!")

            styleExist.set({
                background: imgURLs[0],
            })
            await styleExist.save()

        }

    }
    else if (!styleExist) {
        if (banner) {
            const image = await CommunityStyle.create({
                communityId,
                banner: imgURLs[0]
                });
                await styleExist.save()

        }
        else if (icon) {
            console.log("!!!!!!!!!!!!!!!hello?")
            const image = await CommunityStyle.create({
                communityId,
                icon: imgURLs[0],
                });
                await styleExist.save()

        }
        else if (bg) {
            const image = await CommunityStyle.create({
                communityId,
                background: imgURLs[0],
                });
                await styleExist.save()

        }

        return res.json(communityExist)

    }



    return res.json(communityExist)
})


router.get('/:id/memberships', async (req, res) => {
    const communityId = req.params.id
    const { user } = req
    const userId = user.dataValues.id

    let communitiesExist = await CommunityMembers.findAll({
        where: {
            communityId
        },
        include: [
            {
                model: User
            },

        ]
    });


    for (let i = 0; i < communitiesExist.length; i++) {
        let community = await Community.findOne({
          where: {
            userId,
            type: "Profile"
          },
          include: [
            { model: CommunityStyle }
          ]
        });

        communitiesExist[i].dataValues.Community = community

    }


    if (!communitiesExist) {

        res.status(404).json({"message": "Memberships couldn't be found"});

    }

    return res.json(communitiesExist)

})

router.get('/memberships', async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let communitiesExist = await CommunityMembers.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
            },
            {
                model: Communities,
                include: [
                    { model: CommunityStyle }
                ]

            }

        ]
    });



    if (!communitiesExist.length) {

        res.status(404).json({"message": "Memberships couldn't be found"});

    }

    res.json(communitiesExist)

})

router.get('/:id/members', async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Post.findByPk(communityId);
    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    let members = await CommunityMembers.findAll({
       where: { communityId },
       include: [
            {
                model: User,
            }
        ]
    })

    res.json(members)

})

router.get('/:id/membership', async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Community.findByPk(communityId);
    const { user } = req
    const userId = user.dataValues.id

    if (!communityExist) {
    res.status(404).json({"message": "Community couldn't be found"});
    }


    let communitiesExist = await CommunityMembers.findAll({
        where: {
            communityId
        },
        include: [
            {
                model: User,
                include: [
                    {
                        model: Community,
                        include: [
                            { model: CommunityStyle }
                        ]

                    }
                ]
            }

        ]
    });

    if (!communitiesExist.length) {

        res.status(404).json({"message": "Memberships couldn't be found"});

    }

    res.json(communitiesExist)

})



router.post('/:id/memberships', async (req, res) => {
    const id = req.params.id
    const { status } = req.body
    const { user } = req
    const userId = user.dataValues.id

    console.log(status)

    let member = await CommunityMembers.create({
        userId,
        communityId: id,
        status

    })


    let communitiesExist = await CommunityMembers.findOne({
        where: {
            communityId: id,
            userId
        },
        include: [
            {
                model: Community,
                include: [
                    { model: CommunityStyle }
                ]

            },

        ]
    });

    return res.json(communitiesExist)

})

router.put('/:id/member/:userId', async (req, res) => {
    const id = req.params.id
    const userId = req.params.userId
    const { status } = req.body

    // let communitiesExist2 = await CommunityMembers.findOne({
    //     where: {
    //         communityId: id,
    //         userId
    //     },
    // })

    let communitiesExist = await CommunityMembers.findOne({
        where: {
            communityId: id,
            userId
        },
        include: [
            {
                model: User
            },

        ]
    });

    let community = await Community.findOne({
        where: {
          userId,
          type: "Profile"
        },
        include: [
          { model: CommunityStyle }
        ]
      });

    communitiesExist.dataValues.Community = community

    communitiesExist.set({
        status

    })


    await communitiesExist.save()

    return res.json(communitiesExist)

})

router.delete('/:id/memberships', async (req, res) => {
    const id = req.params.id
    const { user } = req
    const userId = user.dataValues.id


    let member = await CommunityMembers.findOne({
        where: {
            communityId: id,
            userId: userId
        }
    });

    if (!member) {

        res.status(404).json({"message": "Member couldn't be found"});

    }

    await member.destroy()

    return res.json({"message": "succesfully deleted"})
})

router.post('/:id/member/:userId', async (req, res) => {
    const userId = req.params.userId
    const id = req.params.id


    let member = await CommunityMembers.create({
        userId,
        communityId: id
    })


    let communitiesExist = await CommunityMembers.findOne({
        where: {
            communityId: id,
            userId
        },
        include: [
            {
                model: User
            },

        ]
    });

    let community = await Community.findOne({
        where: {
          userId,
          type: "Profile"
        },
        include: [
          { model: CommunityStyle }
        ]
      });

      communitiesExist.dataValues.Community = community

    return res.json(communitiesExist)

})

// router.delete('/:id/member/:userId', async (req, res) => {
//     const userId = req.params.userId
//     const id = req.params.id

//     console.log("USER", userId)

//     let member = await CommunityMembers.findOne({
//         userId,
//         communityId: id
//     });

//     console.log(member)

//     if (!member) {

//         res.status(404).json({"message": "Member couldn't be found"});

//     }

//     await member.destroy()

//     return res.json({"message": "succesfully deleted"})
// })

router.put('/:id/member2/:userId', async (req, res) => {
    const id = req.params.id
    const userId = req.params.userId

    // let communitiesExist = await CommunityMembers.findOne({
    //     where: {
    //         communityId: id,
    //         userId
    //     },
    // })

    let communitiesExist = await CommunityMembers.findOne({
        where: {
            communityId: id,
            userId
        },
        include: [
            {
                model: Communities,
                include: [
                    { model: CommunityStyle }
                ]

            },

        ]
    });

    communitiesExist.set({
        status: "Unapproved"

    })

    await communitiesExist.save()

    return res.json(communitiesExist)

})



module.exports = router;
