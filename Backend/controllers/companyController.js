const axios = require('axios');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

const getCompanies = async (req, res) => {
    try {
        const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/companies?limit=100&hapikey=${HUBSPOT_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};

module.exports = {
    getCompanies
};
