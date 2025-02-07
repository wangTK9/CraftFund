const axios = require('axios');
const config = require('../config/config');

const celestiaApiUrl = config.celestiaApiUrl;

exports.getLatestBlock = async () => {
    const response = await axios.get(`${celestiaApiUrl}/blocks/latest`);
    return response.data;
};

exports.sendTransaction = async (transactionData) => {
    const response = await axios.post(`${celestiaApiUrl}/send-transaction`, transactionData);
    return response.data;
};
