const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Posts, Comments, Communities, User, PostImages, CommunityMembers } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get("/", async (req, res) => {
    let posts = await Posts.findAll({
        include: [
            { model: Comments},
            { model: Communities},
            { model: User},
            { model: PostImages}
         ]}
        );
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
        { model: Communities }
        ]
    });

    return res.json(posts)
})



router.get("/:id", async (req, res) => {
    let postId = req.params.id;
    let postExist = await Posts.findByPk(postId);

    if (!postExist) {

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let post = await Posts.findByPk(postId, {
        include: [
            { model: Comments },
            { model: Communities },
            { model: User },
            { model: PostImages}
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

    res.status(404).json({"message": "Post couldn't be found"});

    }

    let comments = await Comments.findAll({
        where: {
            postId,
        }
    })

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

module.exports = router;
