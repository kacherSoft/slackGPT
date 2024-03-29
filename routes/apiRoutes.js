const express = require('express');
const axios = require('axios');
const router = express.Router();
const gptService = require('../services/gptService');

router.post('/correct', async (req, res) => {
  const input = req.body.text;
  const responseURL = req.body.response_url;
  console.log(input)
  if (!input || !responseURL) {
    return res.status(400).json({ error: "Please provide text for correction and response URL." });
  }

  // Step 1: Immediately respond to Slack's incoming request
  res.json({
    text: `\`\`\` ${input}\`\`\`` + "\n\`You are asking for your content to be corrected!\`Your request is currently being processed."
  });


  // Step 2: Process the GPT-3 correction in the background
  try {
    const correctedText = await gptService.correctText(input);

    // Step 3: Send the corrected text result to Slack using the provided response_url
    await axios.post(responseURL, {
      "replace_original": "true",
      text: `${correctedText.content}`
    });
  } catch (error) {
    // console.error('Error processing correction:', error.message);
    await axios.post(responseURL, {
      text: `Error correcting text: ${error.message}`
    });
  }
});

router.post('/rewrite', async (req, res) => {
  const input = req.body.text;
  const responseURL = req.body.response_url;
  console.log(responseURL)
  if (!input || !responseURL) {
    return res.status(400).json({ error: "Please provide text for correction and response URL." });
  }

  // Step 1: Immediately respond to Slack's incoming request
  res.json({
    text: `\`\`\` ${input}\`\`\`` + "\nYou have requested to have your \`sentence/paragraph rewritten!\` We are currently working on processing your request..."
  });


  // Step 2: Process the GPT-3 correction in the background
  try {
    const correctedText = await gptService.rewriteText(input);

    // Step 3: Send the corrected text result to Slack using the provided response_url
    await axios.post(responseURL, {
      "replace_original": "true",
      text: `${correctedText.content}`
    });
  } catch (error) {
    // console.error('Error processing correction:', error.message);
    await axios.post(responseURL, {
      text: `Error correcting text: ${error.message}`
    });
  }
});

router.post('/shorten', async (req, res) => {
  const input = req.body.text;
  const responseURL = req.body.response_url;
  console.log(responseURL)
  if (!input || !responseURL) {
    return res.status(400).json({ error: "Please provide text for correction and response URL." });
  }

  // Step 1: Immediately respond to Slack's incoming request
  res.json({
    text: `\`\`\` ${input}\`\`\`` + "\nYou have requested to have your \`sentence/paragraph shortened!\` We are currently working on processing your request..."
  });


  // Step 2: Process the GPT-3 correction in the background
  try {
    const correctedText = await gptService.shortenText(input);

    // Step 3: Send the corrected text result to Slack using the provided response_url
    await axios.post(responseURL, {
      "replace_original": "true",
      text: `${correctedText.content}`
    });
  } catch (error) {
    // console.error('Error processing correction:', error.message);
    await axios.post(responseURL, {
      text: `Error correcting text: ${error.message}`
    });
  }
});

router.post('/longer', async (req, res) => {
  const input = req.body.text;
  const responseURL = req.body.response_url;
  console.log(responseURL)
  if (!input || !responseURL) {
    return res.status(400).json({ error: "Please provide text for correction and response URL." });
  }

  // Step 1: Immediately respond to Slack's incoming request
  res.json({
    text: `\`\`\` ${input}\`\`\`` + "\nWe are currently working on processing your \`request for a longer sentence/paragraph\` as you have requested."
  });


  // Step 2: Process the GPT-3 correction in the background
  try {
    const correctedText = await gptService.longerText(input);

    // Step 3: Send the corrected text result to Slack using the provided response_url
    await axios.post(responseURL, {
      "replace_original": "true",
      text: `${correctedText.content}`
    });
  } catch (error) {
    // console.error('Error processing correction:', error.message);
    await axios.post(responseURL, {
      text: `Error correcting text: ${error.message}`
    });
  }
});

router.post('/prompt_enhancement', async (req, res) => {
  const input = req.body.text;
  console.log(input)
  if (!input) {
    return res.status(400).json({ error: "Invalid Content" });
  } else {
    enhance = await gptService.promptRefine(input);
    console.log(enhance)
    // check if the enhance text contains false then return json object with status = false, error message: invalid content. If not return json object with status = true, enhance text.
    result = {
      status: true,
      prompt: enhance
    }
    if (enhance.includes("false") || enhance.includes("False") || enhance.includes("Invalid") || enhance.includes("invalid") || enhance.includes("I'm sorry") || enhance.includes("I cannot fulfill that request")) {
      result = {
        status: false,
        message: "Invalid Content"
      }
    }
    console.log(result);
    return res.status(200).json(result);
  }

});

module.exports = router;
