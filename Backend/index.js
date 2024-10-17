require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const acccessToken=process.env.ACCESS_TOKEN

app.get("/", async (req, res) => {
    res.json("server is running")
})
app.get("/contacts", async (req, res) => {
  const { offset = 0 } = req.query;
  try {
    const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts?limit=100&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/contacts", async (req, res) => {
  const { email, phone } = req.body;
  try {
    const response = await axios.post(`https://api.hubapi.com/crm/v3/objects/contacts`, {
      properties: { email, phone },
    }, {
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/companies", async (req, res) => {
  const { offset = 0 } = req.query; 
  try {
    const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/companies?limit=100&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${acccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT =8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
