const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Communities, Posts, User, CommunityMembers, Comments, PostImages } = require('../../db/models');

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

    return res.json(post)
})

router.get("/", async (req, res) => {
    let communities = await Communities.findAll({
        include: [
            { model: Posts },
            { model: User },
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
        { model: User }
     ]
    });

    return res.json(communities)
})

router.get('/memberships', async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    let communitiesExist = await CommunityMembers.findAll({
        where: {
            userId
        },
        include: Communities
    });

    if (!communitiesExist.length) {

        res.status(404).json({"message": "Memberships couldn't be found"});

    }

    res.json(communitiesExist)

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
                    { model: PostImages}
                 ]
            },
            { model: User }
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
    const { name, about } = req.body
    const { user } = req
    const userId = user.dataValues.id

    let community = await Communities.create({
        userId,
        name,
        about
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

router.get('/:id/members', async (req, res) => {
    let communityId = req.params.id;
    let communityExist = await Posts.findByPk(communityId);
    if (!communityExist) {

        res.status(404).json({"message": "Community couldn't be found"});

    }

    let members = await CommunityMembers.findAll({
       where: { communityId },
       include: User
    })

    res.json(members)

})

router.post('/:id/memberships', async (req, res) => {
    const { id } = req.params.id
    const { user } = req
    const userId = user.dataValues.id

    let member = await CommunityMembers.create({
        userId,
        communityId: id
    })

    return res.json(member)
})

router.delete('/:id/memberships', async (req, res) => {
    const { id } = req.params.id
    const { user } = req
    const userId = user.dataValues.id

    let member = await CommunityMembers.findOne({
        userId,
        communityId: id
    })

    if (!member) {

        res.status(404).json({"message": "Member couldn't be found"});

    }


    await member.destroy()

    return res.json({"message": "succesfully deleted"})
})




module.exports = router;
