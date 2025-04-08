const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/shorten', urlController.createShortUrl);
router.get('/:shortId', urlController.redirectUrl);

module.exports = router;
