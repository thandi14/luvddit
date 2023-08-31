const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comments, Posts } = require('../../db/models');

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
        { model: Posts },
       ]
    });

    return res.json(posts)
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
