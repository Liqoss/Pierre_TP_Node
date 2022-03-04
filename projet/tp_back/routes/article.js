const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, articleCtrl.new);
router.get('/', auth, articleCtrl.list);
router.get('/:id', auth, articleCtrl.findOne);

module.exports = router;
