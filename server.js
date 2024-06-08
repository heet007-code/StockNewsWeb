const express = require('express');
const axios = require('axios'); // Declare axios a single time at the top
const fs = require('fs');
const cron = require('node-cron');
const app = express();
const PORT = 3000;


// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Endpoint to fetch stock market news
app.get('/getStockNews', async (req, res) => {
    const apiKey = '31ac672c40da4e728ea5e99adb8ea9d1'; // Replace this with your actual NewsAPI key
    const url = `https://newsapi.org/v2/everything?q=stock%20market&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock market news:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch news', details: error.message });
    }
});

// Let's pretend we have a function that gets the latest GPT suggestions
const getLatestGptSuggestions = () => {
    return [
        { ticker: "GPTX", advice: "Showing potential for significant gains in the next quarter." },
        { ticker: "AIYF", advice: "Expected to outperform the market with innovative tech releases." },
    ];
};

app.get('/getGptSuggestions', (req, res) => {
    const suggestions = getLatestGptSuggestions();
    res.json(suggestions);
});

// Function to fetch new GPT suggestions
async function fetchGptSuggestions() {
    try {
        const response = await axios.get('YOUR_GPT_MODEL_ENDPOINT'); // Ensure this points to your GPT model's API
        // Assuming the response directly contains the suggestions data
        fs.writeFileSync('gptSuggestions.json', JSON.stringify(response.data));
    } catch (error) {
        console.error('Failed to fetch GPT suggestions:', error);
    }
}

// Schedule the task to run every day at 7:00 AM
cron.schedule('0 7 * * *', () => {
    console.log('Fetching new GPT suggestions...');
    fetchGptSuggestions();
});


// Starting the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
