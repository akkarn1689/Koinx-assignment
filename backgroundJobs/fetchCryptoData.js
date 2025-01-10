const axios = require("axios");
const Crypto = require('../models/crypto');

const fetchCryptoData = async () => {
    try {
        const coins = ["bitcoin", "matic-network", "ethereum"];
        const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids: coins.join(","),
                vs_currencies: "usd",
                include_market_cap: "true",
                include_24hr_change: "true"
            }
        });

        for (const coin of coins) {
            const coinData = data[coin];
            const record = new Crypto({
                coin,
                price: coinData.usd,
                marketCap: coinData.usd_market_cap,
                change24h: coinData.usd_24h_change
            });
            await record.save();
        }
        console.log("Crypto data saved successfully.");
        console.log("Crypto data fetched at:", new Date().toISOString());
        console.log("Crypto data fetched:", data);
    } catch (error) {
        console.error("Error fetching crypto data:", error.message);
    }
};

module.exports = fetchCryptoData;
