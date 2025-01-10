const Crypto = require('../models/crypto');

// Controller to fetch cryptocurrency stats
const getCryptoStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin is required.' });
    }

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the requested coin.' });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
};

// Controller to calculate deviation for a cryptocurrency
const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin is required.' });
    }

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length === 0) {
            return res.status(404).json({ error: 'No data found for the requested coin.' });
        }

        const prices = records.map(record => record.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        res.json({ "deviation": deviation });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
};

module.exports = {
    getCryptoStats,
    getCryptoDeviation
};
