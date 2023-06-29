import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateRecipe = async (req) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const copiedRecipe = req.body.copiedRecipe || "";
  if (copiedRecipe.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(copiedRecipe),
      temperature: 0.6,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

function generatePrompt(recipe) {
  return `
Recipe: ${recipe}
Reorganize this recipe into a more readable format.

Format example:
    Title: "Noodle"
    Ingredients: [{
        "name": "noodle",
        "amount": 2,
        "unit": "g"
    }, {
        "name": "water",   
        "amount": 1,
        "unit": "L"
    }]
    Instructions: ["boil water", "cook noodle"]
`;
}

module.exports = {
  generateRecipe,
};
