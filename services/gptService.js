const axios = require('axios');
const axiosConfig = require('../config/axiosConfig');
const GPT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

async function correctText(input) {
  const instruction = `
    You are my English assistant. You will correct my grammar and vocabulary.
    The answer format should be as something similar below (and in rich text using format that Slack can understand):
    Correct version: (Surround text with backticks to get code format)
    {correct version}
    Exlanation:(Surround text with backticks to get code format) {here you will explain each part you did change to correct}
    (Surround text with backticks to get code format)Giải thích:(Surround text with backticks to get code format) {your explanation in Vietnamese}
  `;

  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: instruction
      },
      {
        role: "assistant",
        content: "Hello! How can I help you today with your English?",
      },
      {
        role: "user",
        content: "Please help me to correct this paragraph: \"" + input + "\""
      }
    ]
  };

  try {
    const response = await axios.post(GPT_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      }
    });

    const message = response.data.choices[0].message;
    // console.log(message)
    return message; // Just return the message

  } catch (error) {
    console.error('Error calling GPT-3 API:', error);
    throw new Error('Failed to call GPT-3 API'); // Throw the error
  }
}

async function rewriteText(input) {
  const instruction = `
    You are my English assistant. You will rewrite my paragraph or sentence that I will send you. The answer format should be very simple, you just need to return the paragraph or sentence that you rewrite. It should be something like this:\nCorrect version:\n{version that you has already rewritten}`;

  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: instruction
      },
      {
        role: "assistant",
        content: "Hello! How can I help you today with your English?",
      },
      {
        role: "user",
        content: "Please help me to rewrite this paragraph: \"" + input + "\""
      }
    ]
  };

  try {
    const response = await axios.post(GPT_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      }
    });

    const message = response.data.choices[0].message;
    // console.log(message)
    return message; // Just return the message

  } catch (error) {
    console.error('Error calling GPT-3 API:', error);
    throw new Error('Failed to call GPT-3 API'); // Throw the error
  }
}

async function shortenText(input) {
  const instruction = `
    You are my English assistant. You will shorten my paragraph or sentence that I will send you. The answer format should be simplified - just return the shortened paragraph or sentence. It should be something like this:\Shorten version:\n{version that you has already shortened}
  `;

  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: instruction
      },
      {
        role: "assistant",
        content: "Hello! How can I help you today with your English?",
      },
      {
        role: "user",
        content: "Please help me to shorten this paragraph or sentence: \"" + input + "\""
      }
    ]
  };

  try {
    const response = await axios.post(GPT_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      }
    });

    const message = response.data.choices[0].message;
    // console.log(message)
    return message; // Just return the message

  } catch (error) {
    console.error('Error calling GPT-3 API:', error);
    throw new Error('Failed to call GPT-3 API'); // Throw the error
  }
}

async function longerText(input) {
  const instruction = `
    You are my English assistant. You will rewrite my paragraph or sentence that I will send you to make it a bit longer but keep the same meaning/ intention. The answer format should be simplified - just return the rewriten paragraph or sentence. It should be something like this:\`New version:\`\n{version that you has already make it longer}
  `;

  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: instruction
      },
      {
        role: "assistant",
        content: "Hello! How can I help you today with your English?",
      },
      {
        role: "user",
        content: "Please help me to make this paragraph or sentence longer and still keep its meaning: \"" + input + "\""
      }
    ]
  };

  try {
    const response = await axios.post(GPT_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      }
    });

    const message = response.data.choices[0].message;
    // console.log(message)
    return message; // Just return the message

  } catch (error) {
    console.error('Error calling GPT-3 API:', error);
    throw new Error('Failed to call GPT-3 API'); // Throw the error
  }
}

module.exports = {
  correctText,
  rewriteText,
  shortenText,
  longerText
};
