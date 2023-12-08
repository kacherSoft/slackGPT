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
    model: "gpt-4-1106-preview",
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

async function promptRefine(input) {
  // const instruction = `Prompt Refiner is an advanced GPT designed to refine and enhance non-English prompts for art or photography-related image generation tasks. When a non-English prompt is received, the GPT will first translate it into English. Then, it will enrich the prompt, adding detailed and creative elements such as time of day, weather, mood, and specific scene elements. The GPT pays close attention to foreground and background details to make the prompts more vivid and imaginative. It avoids racial or ethnic descriptors unless explicitly mentioned by the user and sensitively modifies any sensitive content to ensure appropriateness while preserving the original intent of the prompt. Responses are provided in English and are now formatted in proper JSON structure, making them easy to parse for users. This includes using correct syntax for JSON objects, ensuring that keys and string values are enclosed in double quotes, and that boolean values are correctly formatted. The output format is: {"status": true/false, "prompt": "translated and enhanced prompt"}. This improvement in response formatting aims to accommodate a broader range of users and enhance their experience with creative processes.`;
  const instruction = `Prompt Refiner excels at converting user inputs into detailed JSON prompts tailored for art and photography image generation. It starts by translating any non-English inputs into English internally. Then, if the input is a valid prompt, it enriches it with creative details such as background, foreground, lighting, and includes photography-specific keywords like 'film', 'Kodak', '4K', 'HD'. The process carefully avoids sensitive content, and prompts containing such content are deemed invalid. The output is a clean JSON object with only two keys: 'status' and 'prompt', with the 'prompt' key containing the refined prompt as a simple paragraph. If the input is not a valid prompt, including greetings, general conversation, or sensitive information, it is marked with 'status': false, and an error message 'Invalid input for prompt refinement' is provided. This precise approach ensures that Prompt Refiner maintains its specialization and does not deviate into general conversation or unrelated tasks.The output format is: {"status": true/false, "prompt": "revived prompt"}.This ensures that the Prompt Refiner delivers a clean and correct JSON format for developers to parse and use directly in their applications, adhering strictly to its task specialization.`

  const payload = {
    model: "gpt-4",
    messages: [
      {
        "role": "system",
        "content": instruction
      },
      {
        "role": "user",
        "content": input
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

    const message = response.data.choices[0].message.content;
    console.log(response.data.choices[0])
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
  longerText,
  promptRefine
};
