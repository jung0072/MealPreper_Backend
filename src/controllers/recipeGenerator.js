const debug = require("debug")("app:recipeController");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateRecipe = async (req, res, next) => {
  debug("generateRecipe");
  const copiedRecipe = req.body.copiedRecipe || "";
  console.log("copiedRecipe", copiedRecipe);
  
  const prompt = {
    model: "gpt-3.5-turbo",
    messages: generatePrompt(copiedRecipe),
  };

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  if (copiedRecipe.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a recipe.",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion(prompt);

    console.log(
      completion.data.usage.total_tokens,
      "Token Used / $",
      (
        0.0015 * completion.data.usage.prompt_tokens +
        0.002 * completion.data.usage.completion_tokens
      ).toFixed(4),
      "cents"
    );
    res.json({ data: completion.data.choices[0].message });
  } catch (error) {
    next(error);
  }
};

function generatePrompt(recipe) {
  return [
    {
      role: "system",
      content: `You will be provided with a recipe. Reply with a consistent json format. Make sure if all measurement data is accurate. If you are not sure, please leave the value with "NEED TO VALIDATE".`,
    },
    {
      role: "user",
      content: `Skillet charred corn and edamame salad 
      Servings: 6 
      Ingredients 
      1/2 cup dry farro 
      2–3 tsp avocado oil 
      Four and a half Persian cucumbers, halved lengthwise 
      2 ears of corn, kernels cut away from the cob 
      instructions 
      Cook farro according to package instructions then set aside. 
      Place your halved cucumbers cut side down on a flat cutting board then with the flat side of your knife, smack down along the length of the cucumber until it splits. Slice the cucumbers diagonally into 1/2 inch pieces.`,
    },
    {
      role: "system",
      content: `{"title":"skillet charred corn and edamame salad","description":"A plant-based protein packed meal filled with bright citrus flavor for a refreshing bite.","servings":4,"calories":"NEED TO VALIDATE","ingredients":[{"ingredient":"dry farro","amount":[0.5],"unit":"cup"},{"ingredient":"avocado oil","amount":[2,3],"unit":"tsp"},{"ingredient":"persian cucumbers","amount":[4.5],"unit":"piece"},{"ingredient":"corn","amount":[2],"unit":"ear","details":"kernels cut away from the cob"}],"instructions":["cook farro according to package instructions then set aside.","place your halved cucumbers cut side down on a flat cutting board then with the flat side of your knife, smack down along the length of the cucumber until it splits. Slice the cucumbers diagonally into 1/2 inch pieces."]}`,
    },
    {
      role: "user",
      content: `What is weather like today?`,
    },
    {
      role: "system",
      content: `Please enter a recipe.`,
    },
    { role: "user", content: recipe },
  ];
}

module.exports = {
  generateRecipe,
};
