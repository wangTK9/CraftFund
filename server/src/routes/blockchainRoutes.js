const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.get('/get-block', blockchainController.getBlock);
router.post('/send-transaction', blockchainController.sendTransaction);

module.exports = router;
