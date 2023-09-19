// backend/routes/api/session.js
const express = require('express')
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Community, CommunityStyle } = require('../../db/models');
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
    async (req, res) => {
      const { user } = req;

      let profile

      if (user) {
        profile = await Community.findOne({
          where: {
            userId: user.id,
            type: "Profile"
          },
          include: [
            { model: CommunityStyle }
          ]
        })

      }
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          karma: user.karma,
          Community: profile
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


  router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    let user = await User.findByPk(userId, {
        // include: [
        //     {
        //         model: Community,
        //         where: {
        //             userId,
        //         },
        //         include: [
        //             { model: CommunityStyle }
        //         ]
        //     }
        // ]
    });

    console.log(user)

    if (!user) return res.status(404).json({
        "message": "User not found"
    })

    let profile = await Community.findOne({
        where: {
            userId,
            type: "Profile"
        },
        include: [
              { model: CommunityStyle }
        ]
    })

    user.dataValues.profile = profile

    return res.json({ user: user })
})




module.exports = router;
