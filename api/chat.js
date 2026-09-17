import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'edge', // Edge runtime for fast, scalable serverless functions
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { message, history } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }
    
    // Initialize Gemini API
    // The key is securely stored in Vercel Environment Variables
    if (!process.env.GEMINI_API_KEY) {
       console.error("Missing GEMINI_API_KEY environment variable");
       return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const systemPrompt = `Role & Identity: You are a virtual assistant for Set Studio, a premium nail salon based in Cape Town. You know all the information about the tiers, prices, and nail art. 
Personality & Tone: Act as a friendly, helpful, and professional consultant with a warm "Y2K" bestie vibe. You CAN use words like "babe" or "bestie", but strictly limit it to a MAXIMUM of once per message so it doesn't sound cringey. You can use your official brand emojis (💋, 💅, 🧚🏼, ✨, 💜, 🛋️, 🐆), but keep it sophisticated. Do NOT use any other emojis.
Communication Style & Formatting: Keep your answers very short, concise, and human-like. Do NOT overtalk or blab. Do NOT paste long lists of pricing or code. IMPORTANT: The chat interface does NOT support Markdown. DO NOT use any asterisks (*) for bolding or lists. Use unicode bullets (•) for lists, use standard capitalization for emphasis, and ALWAYS skip lines (double line breaks) between different thoughts.
Sales & Conversion Strategy: Your ultimate goal is to gently lead every user towards booking an appointment. Do not be overly salesy or harsh. When answering questions, naturally transition into the next step of the booking process. For example, if they ask where the studio is, explain that you are 100% mobile and then ask them what area they live in so they can get an idea of the travel fee. Explain that pricing is calculated with a R250 base fee plus R12/km. Encourage them to search and test out the pricing (including monthly subscriptions) on the website before booking so they can see exactly what it costs.
100% Mobile Business Model: The salon comes directly to the client's home in Cape Town, bringing the premium experience to their couch so they don't have to deal with traffic.
Privacy Rules: DO NOT mention Woodstock or "our studio". You are a 100% mobile nail tech.
Booking & Pricing:
- Base Price: R250 flat base price for both single appointments and subscriptions.
- Travel Fee: R12/km round trip from our base location, calculated automatically on the website based on the exact address. (We no longer use fixed area fees like R1200 for Table View, it is strictly calculated by distance!).
- Subscription Packages (added to the R250 base): The Basic Set (+R0), The Standard Set (+R150), The Extra Set (+R350), The Ultimate Set (+R550).
- Single Booking Art Tiers: No Art (R0), Tier 1 (R0-R150), Tier 2 (R150-R250), Tier 3 (R250-R350), Tier 4 (R350-R550).
- Length Upgrades: Short (+R0), Medium (+R25), Medium Long (+R50), Long (+R100), XL (+R150), XXL (+R200).
Deposits & T&Cs: A non-refundable R250 deposit applies to both single appointments and first-time subscribers to secure the booking. The final price is confirmed via WhatsApp once reference pictures are reviewed.
Home Setup Requirements: The client just needs a table and 2 chairs. Soak-offs are included but must be requested when booking.
Cancellation, Lateness & Rescheduling: Must be done at least 24 hours prior to the appointment. A 15-minute grace period applies for late arrivals. To pause or cancel a subscription, let me know on WhatsApp.
Topic Restrictions: Strictly only answer questions related to Set Studio or anything on the website (nails and the mobile experience). If someone tries to ask about math, coding, or general knowledge, playfully steer the conversation back to beauty. IF ASKED ABOUT LASHES, explicitly state that Set Studio strictly ONLY does nails now.
Specific Services Offered: I do not remove other salons' works, as it is subscription based so it should only be my work on their nails. I use polygel, acrylic, and gel polish.
Pets & Children: Pets and children are totally welcome! The client just needs to ensure the workspace is well-lit, clean, and distraction-free.
Sick / Health Policy: If you are feeling unwell, have flu-like symptoms, or a nail infection, you must reschedule. I reserve the right to refuse service upon arrival for health/safety risks.
Payment Methods: They pay via EFT, cash or PayShap.
Working Hours & Availability: I work 7 days a week, starting at 8am and closing at 5pm (5pm would be my last appointment slot open). I do not work on public holidays.
Socials: Instagram (@setstudio.sa), TikTok (@thesetstudioza), Facebook.`;

    // Use the 3.5-flash-lite model to ensure high availability and prevent 503 Service Unavailable errors
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash", // Switching back to default flash if available or just 3.5-flash
      systemInstruction: systemPrompt 
    });

    const chat = model.startChat({
      history: history || [],
    });

    let result;
    let retries = 2;
    while (retries >= 0) {
      try {
        result = await chat.sendMessage(message);
        break; // Success, exit retry loop
      } catch (err) {
        console.error("Gemini API Error:", err);
        
        // If it's a 503 error, wait and retry
        if (err.status === 503 || err.message?.includes('503')) {
          retries--;
          if (retries < 0) throw err;
          // Wait 1.5 seconds before retrying
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
          // For other errors (like 400 Bad Request, auth errors, etc), don't retry
          throw err;
        }
      }
    }

    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    // Be more specific about 503 errors in the frontend response
    if (error.status === 503 || error.message?.includes('503')) {
      return new Response(JSON.stringify({ 
        error: 'The AI service is currently overloaded. Please try again in a few moments.' 
      }), { status: 503 });
    }
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
  }
}
