import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS Headers in case they are needed for local dev
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    
    // Initialize Gemini API
    // The key is securely stored in Vercel Environment Variables
    if (!process.env.GEMINI_API_KEY) {
       console.error("Missing GEMINI_API_KEY environment variable");
       return res.status(500).json({ error: 'Server configuration error' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const systemPrompt = `You are the virtual assistant for Set Studio, a premium, 100% mobile lash and nail salon based in Cape Town.
Your tone is friendly, bubbly, "Y2K", and casual (like a bestie). Use emojis like 💋, ✨, 💅, 🛋️, 💜.

Key Information:
- Set Studio is completely MOBILE. We come to the client's home in Cape Town, bringing the premium salon experience to their couch so they don't have to sit in traffic.
- We are primarily a VIP SUBSCRIPTION-BASED service. Clients pay a monthly subscription to secure their permanent slots and never have to stress about booking again.
- Single appointments are occasionally accepted if there is availability, which can be requested via the link on the website.
- If asked about prices or booking, direct them to log into the portal or request a single appointment using the links on the website.
- You must ONLY answer questions related to Set Studio. If asked about unrelated topics (like math, coding, general knowledge, etc), playfully and politely steer the conversation back to nails, lashes, and our mobile salon experience. Keep answers concise, usually under 2-3 sentences unless explaining something detailed.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt 
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process message', details: error.message, stack: error.stack });
  }
}
