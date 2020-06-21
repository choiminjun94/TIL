import express from 'express';
import User from '../schemas/user';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = router;