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
      content: `You will be provided with a recipe. Please reply with the recipe details in a consistent JSON format. Ensure that all measurement data is accurate. If you are unsure, leave the value as "NEED TO VALIDATE". If the user provides an invalid recipe, please reply with an error message.`,
    },
    {
      role: "user",
      content: `Skillet charred corn and edamame salad 
      Servings: 6
      calories: 600kcal
      Ingredients 
      1/2 cup dry farro 
      Four and a half Persian cucumbers, halved lengthwise 
      2 ears of corn, kernels cut away from the cob 
      instructions 
      Cook farro according to package instructions then set aside. 
      Place your halved cucumbers cut side down on a flat cutting board
      With the flat side of your knife, smack down along the length of the cucumber until it splits. 
      Cook corn in a skillet over medium heat until charred, about 5 minutes.`,
    },
    {
      role: "system",
      content: JSON.stringify(outPutExample),
    },
    {
      role: "user",
      content: `Please provide the recipe details in a JSON format.`,
    },
    { role: "user", content: recipe },
  ];
}

module.exports = {
  generateRecipe,
};

const outPutExample = {
  title: "skillet charred corn and edamame salad",
  description:
    "A plant-based protein packed meal filled with bright citrus flavor for a refreshing bite.",
  servings: 4,
  calories: 600,
  ingredients: [
    {
      ingredientName: "farro",
      amount: 0.5,
      unit: "cup",
      process: "dry",
      block: [0],
    },
    {
      ingredientName: "persian cucumbers",
      amount: 4.5,
      unit: "pc",
      process: "halved lengthwise",
      block: [1, 2],
    },
    {
      ingredientName: "corn",
      amount: 2,
      unit: "ear",
      details: "kernels cut away from the cob",
      block: [3],
    },
  ],
  instructions: [
    {
      instructionContent:
        "cook farro according to package instructions then set aside.",
      block: 0,
    },
    {
      instructionContent:
        "place your halved cucumbers cut side down on a flat cutting board",
      block: 1,
    },
    {
      instructionContent:
        "With the flat side of your knife, smack down along the length of the cucumber until it splits. ",
      block: 2,
    },
    {
      instructionContent:
        "Cook corn in a skillet over medium heat until charred, about 5 minutes.",
      block: 3,
    },
  ],
};
