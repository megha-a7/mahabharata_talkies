const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.post('/question', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engine/davinci-codex/completions', {
      prompt: `Question: ${question}\nAnswer:`,
      max_tokens: 1024,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const answer = response.data.choices[0].text.trim();

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch answer' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
