const express = require("express");
const bodyParser = require("body-parser");
const openai = require("openai");

const app = express();
const port = process.env.PORT || 3000;

// Set up middleware to parse JSON body
app.use(bodyParser.json());

// Set up OpenAI API credentials
const OPENAI_API_KEY = "<your API key here>";
const openaiClient = new openai.LanguageModelApi(OPENAI_API_KEY);

// Define API endpoint for generating responses to Bhagavad Gita questions
app.post("/api/ask-gpt", async (req, res) => {
  try {
    // Get the question from the request body
    const question = req.body.question;

    // Use the OpenAI API to generate a response
    const response = await openaiClient.generate({
      prompt: question,
      model: "text-davinci-002",
      temperature: 0.7,
      maxTokens: 1024,
      n: 1,
      stop: "\n",
    });

    // Extract the generated text from the API response
    const answer = response.data.choices[0].text.trim();

    // Send the answer back to the client
    res.send({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
