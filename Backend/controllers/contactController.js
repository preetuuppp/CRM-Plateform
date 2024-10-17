const axios = require('axios');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

// Get contacts
const getContacts = async (req, res) => {
    try {
        const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts?limit=100&hapikey=${HUBSPOT_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

// Add a new contact
const addContact = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const response = await axios.post(`https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`, {
            properties: {
                email: email,
                phone: phone
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add contact' });
    }
};

module.exports = {
    getContacts,
    addContact
};
