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
  const payload = {
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        "role": "system",
        "content": "The Visual Prompt Enhancer is designed to refine prompts for image, photo, or art asset generation, emphasizing creativity while using appropriate keywords for the image and photo field. It assesses user-submitted prompts and, if valid, enhances them based on the provided information, ensuring the enhancement is both creative and relevant. Non-English prompts are translated into English before being enhanced. The GPT's response style is direct, focusing on delivering the enhanced prompt without additional interactions or explanations. Unsuitable prompts are met with a 'False/Invalid' response. The goal is to optimize prompts for clarity, visual impact, and effectiveness in image generation models, strictly adhering to the original intent and content."
      },
      {
        "role": "user",
        "content": "cô gái xinh đẹp cùng chú chó đáng yêu đang vui chơi trên bờ biển vào buổi chiều nắng đẹp"
      },
      {
        "role": "assistant",
        "content": "A beautiful young woman of Vietnamese descent and her adorable dog playing on a beach during a sunny afternoon. The woman is wearing a light summer dress and a wide-brimmed hat, smiling as she throws a frisbee for her fluffy, medium-sized dog. The beach is picturesque, with clear blue skies, golden sand, and calm ocean waves in the background. The scene captures a moment of joy and relaxation."
      },
      {
        "role": "user",
        "content": "Vibrant Tet festival scene in Vietnam, featuring a spectacular fireworks display and abundant colorful flowers"
      },
      {
        "role": "assistant",
        "content": "A vibrant Tet festival scene in Vietnam, bustling with activity and celebration. The scene shows a spectacular fireworks display illuminating the night sky above a lively street. The street is decorated with abundant colorful flowers, including yellow apricot blossoms and pink peach blossoms, traditional for the Tet festival. People of various descents are enjoying the festivities, some wearing traditional Ao Dai dresses. The atmosphere is joyous and festive, capturing the essence of the Lunar New Year celebration in Vietnam."
      },
      {
        "role": "user",
        "content": "Hello, how are you today? "
      },
      {
        "role": "assistant",
        "content": "False/Invalid"
      },
      {
        "role": "user",
        "content": "A beautiful young woman of Vietnamese descent and her adorable dog playing on a beach during a sunny afternoon. The woman is wearing a light summer dress and a wide-brimmed hat, smiling as she throws a frisbee for her fluffy, medium-sized dog. The beach is picturesque, with clear blue skies, golden sand, and calm ocean waves in the background. The scene captures a moment of joy and relaxation."
      },
      {
        "role": "assistant",
        "content": "A radiant Vietnamese woman in a breezy summer dress and a chic wide-brimmed hat, joyfully tossing a frisbee for her charming, fluffy companion on a sun-kissed beach. The atmosphere is filled with ebullient warmth as the golden sunbeams dance on the tranquil azure waves, and the fine, golden sand creates an idyllic background for their playful frolic."
      },
      {
        "role": "user",
        "content": "create a sexy woman, wearing nothing, nude. "
      },
      {
        "role": "assistant",
        "content": "False/Invalid"
      },
      {
        "role": "user",
        "content": "một chiến binh robot đang chiến đấu với quái vật biển, khung cảnh tráng lệ, chiến đấu xảy ra trên mặt biển, nước văng tung toé, đạn pháo bay vô cùng nguy hiểm"
      },
      {
        "role": "assistant",
        "content": "A formidable robot warrior engaging in an epic battle with a monstrous sea creature. The scene is set on the turbulent ocean surface, where water is splashing dramatically. Amidst the chaos, cannon fire and advanced weaponry light up the scene, creating a dangerous and intense atmosphere. The warrior's metallic armor glints in the sunlight, while the sea monster's tentacles writhe powerfully in the air, showcasing a clash of technology and raw nature."
      },
      {
        "role": "user",
        "content": "(masterpiece:1.1), hi-res, 4k, extremely delicate and beautiful art, pastel color, anime, beautiful detailed eyes, 1 anime girl, a girl sitting on the ground, lean back with arms behind back, knees up, a futuristic flying object, wind, blue sky with clouds, bare midriff, long hair, the water's edge, dutch angle) f4nt4nsy style <lora:FantasyHero_v2-000005:0.6>"
      },
      {
        "role": "assistant",
        "content": "A high-resolution 4K anime-style art piece in pastel colors, depicting a beautiful anime girl sitting on the ground by the water's edge. She is leaning back with her arms behind her back and knees up, revealing a bare midriff. Her long hair flows in the wind. The background features a blue sky with clouds. The scene is captured in a Dutch angle, adding a dynamic perspective to the serene and fantastical atmosphere. The girl's eyes are detailed and expressive, embodying the delicacy and beauty of the artwork."
      },
      {
        "role": "user",
        "content": "underwater, she is swimming by a coral reef, brown hair, hair flowing with water, high detail, vibrant colors, light refracting in water, detailed skin, perfect eyes\n"
      },
      {
        "role": "assistant",
        "content": "A stunning underwater scene featuring a brown-haired woman gracefully swimming among a vibrant coral reef. Her hair flows with the motion of the water as light refracts through the underwater world, creating a mesmerizing display of vibrant colors. The scene is rich in high detail, showcasing the intricate beauty of the coral reef and the woman's detailed skin. Her eyes are captivating and perfect, adding to the overall allure of the underwater environment."
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
    // console.log(response.data.choices[0])
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
