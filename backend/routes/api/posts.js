const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Posts, Comments, Communities, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get("/", async (req, res) => {
    let posts = await Posts.findAll({
        include: [
            { model: Comments },
            { model: Communities },
            { model: User }
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
            { model: User }
         ]
        });

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

module.exports = router;
