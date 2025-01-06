const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../backend/utils/validation');
const { setTokenCookie, restoreUser } = require('../../../backend/utils/auth');
const { User } = require('../../../backend/db/models');

const router = express.Router();

const validateLogin = [
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide a password.'),
  // handleValidationErrors
];


router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          email: credential
        }
      }
    });

    // if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    //   const err = new Error('Login failed');
    //   err.status = 401;
    //   err.title = 'Login failed';
    //   err.errors = { credential: 'The provided credentials were invalid.' };
    //   return next(err);
    // }

    if (!user) {
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

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          state: user.state,
          zipCode: user.zipCode,
          city: user.city
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


module.exports = router;
