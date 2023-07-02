const { Configuration, OpenAIApi } = require("openai");

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

  const copiedRecipe = req.copiedRecipe || "";
  if (copiedRecipe.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid recipe.",
      },
    });
    return;
  }
  const prompt = {
    model: "gpt-3.5-turbo",
    messages: generatePrompt(copiedRecipe),
  };

  try {
    const completion = await openai.createChatCompletion(prompt);

    console.log(
      completion.data.usage.total_tokens,
      "Token Used / $",
      0.0015 * completion.data.usage.prompt_tokens +
        0.002 * completion.data.usage.completion_tokens,
      "cents"
    );
    return completion.data.choices[0].message;
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
  return [
    {
      role: "system",
      content: `You will be provided with a recipe. Reply with a consistent json format:`,
    },
    {
      role: "user",
      content: `Skillet charred corn and edamame salad Enjoy this summer orzo salad warm or at room temperature for an easy, delicious side dish.  5 from 16 votes  Print  Pin  Rate Course: Salad/Side DishCuisine: AmericanDiet: Vegetarian Prep Time: 15 minutes minutesCook Time: 20 minutes minutesTotal Time: 35 minutes minutes Servings: 6 Calories: 300kcal Author: Jamie Vespa MS, RD Equipment ▢ Medium pot Servings: 6 Ingredients 1/2 cup dry farro 2–3 tsp avocado oil Four and a half Persian cucumbers, halved lengthwise 2 ears of corn, kernels cut away from the cob instructions Cook farro according to package instructions then set aside. Place your halved cucumbers cut side down on a flat cutting board then with the flat side of your knife, smack down along the length of the cucumber until it splits. Slice the cucumbers diagonally into 1/2 inch pieces.`,
    },
    {
      role: "system",
      content: `{"title":"skillet charred corn and edamame salad","servings":4,"calories":300,"ingredients":[{"ingredient":"dry farro","amount":[0.5],"unit":"cup"},{"ingredient":"avocado oil","amount":[2,3],"unit":"tsp"},{"ingredient":"persian cucumbers","amount":[4.5],"unit":"piece"},{"ingredient":"corn","amount":[2],"unit":"ear","details":"kernels cut away from the cob"}],"instructions":["cook farro according to package instructions then set aside.","place your halved cucumbers cut side down on a flat cutting board then with the flat side of your knife, smack down along the length of the cucumber until it splits. Slice the cucumbers diagonally into 1/2 inch pieces."]}`,
    },
    { role: "user", content: recipe },
  ];
}

module.exports = {
  generateRecipe,
};
