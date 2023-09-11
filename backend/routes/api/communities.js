const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Communities, postsHistories, PostSetting, Votes, Posts, User, CommunityMembers, Comments, PostImages, communityStyles } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/:id/posts', async (req, res) => {
    const communityId = req.params.id
    const { description, title, tags } = req.body
    const { user } = req
    const userId = user.dataValues.id


    let post = await Posts.create({
        communityId,
        userId,
        title,
        description,
        tags,
        votes: 0,
    })

    console.log(post)

    let post2 = await Posts.findByPk(post.dataValues.id, {
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
            { model: postsHistories },
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
    let communities = await Communities.findAll({
        include: [
            { model: Posts },
            { model: User },
            { model: communityStyles}
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

router.get("/current", async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let communities = await Communities.findAll({
       where: {
        userId,
       },
       include: [
        { model: Posts },
        { model: User },
        { model: communityStyles },
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
                model: Communities,
                include: [
                        {
                            model: Posts,
                            include: [
                                { model: PostImages },
                                { model: User},
                                { model: Comments }
                            ]
                         },
                        { model: User },
                        { model: communityStyles },
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




router.get("/:id", async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Communities.findByPk(communityId);

    if (!communityExist) {
        res.status(404).json({"message": "Community couldn't be found"});
    }

    let community = await Communities.findByPk(communityId, {
        include: [
            {
                model: Posts,
                include: [
                    { model: Comments},
                    { model: Communities},
                    { model: User},
                    { model: PostImages},
                ]
            },
            { model: User },
            { model: communityStyles }
        ]
    });

    let members = await CommunityMembers.findAll({
        where: {
            communityId: community.id
        }
    });

    community.dataValues.CommunityMembers = members.length




    return res.json(community)
})

router.post('/', async (req, res) => {
    const { name, about, type } = req.body
    const { user } = req
    const userId = user.dataValues.id

    let community = await Communities.create({
        userId,
        name,
        about,
        type
    })

    let member = await CommunityMembers.create({
        userId,
        communityId: community.dataValues.id
    })

    return res.json(community)
})

router.put("/:id", async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Communities.findByPk(communityId);
    const { name, about } = req.body

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
    let communityExist = await Posts.findByPk(communityId);

    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    await communityExist.destroy()

    res.json({
        message: "Successfully deleted"
    })

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
        let community = await Communities.findOne({
          where: {
            userId,
            type: "Profile"
          },
          include: [
            { model: communityStyles }
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
                    { model: communityStyles }
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
    let communityExist = await Posts.findByPk(communityId);
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
    let communityExist = await Communities.findByPk(communityId);
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
                        model: Communities,
                        include: [
                            { model: communityStyles }
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
                model: Communities,
                include: [
                    { model: communityStyles }
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

    let community = await Communities.findOne({
        where: {
          userId,
          type: "Profile"
        },
        include: [
          { model: communityStyles }
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

    let community = await Communities.findOne({
        where: {
          userId,
          type: "Profile"
        },
        include: [
          { model: communityStyles }
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
                    { model: communityStyles }
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
