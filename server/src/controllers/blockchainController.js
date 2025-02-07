const blockchainService = require('../services/blockchainService');

exports.sendTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const result = await blockchainService.sendTransaction(transactionData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error sending transaction' });
    }
};

exports.getBlock = async (req, res) => {
    try {
        const block = await blockchainService.getLatestBlock();
        res.json(block);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching block data' });
    }
};
