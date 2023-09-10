// backend/routes/api/session.js
const express = require('express')
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Communities, communityStyles } = require('../../db/models');
const router = express.Router();


router.use(restoreUser);

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
);


// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          karma: user.karma
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


  router.get("/:id", async (req, res) => {
   // const userId = user.dataValues.id
    const userId = req.params.id

    let user = await User.findByPk(userId, {
        include: [
          {
            model: Communities,
            where: {
              userId,
            },
            include: [
              { model: communityStyles }
            ]
          }
        ]

    });

    let profile = await Communities.findOne({
      where: {
        userId,
        type: "Profile"
      }
    })

    // for (let i = 0; i < user.dataValues.Communities?.length; i++) {
    //   let community = user.dataValues.Communities[i]
    //   let members = await CommunityMembers.findAll({
    //     where: {
    //       communityId: community.dataValues.id
    //     }
    //   });

    //   community.dataValues.members = members.length

    // }

    user.dataValues.profile = profile


    if (!user) return res.status(404).json({
        "message": "User not found"
    })

    return res.json({ user: user })

})




module.exports = router;
