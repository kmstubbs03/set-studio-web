export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const data = await req.json();

    // Basic Validation
    if (!data.fullName || !data.whatsapp || !data.address) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    
    if (data.whatsapp.length < 8) {
      return new Response(JSON.stringify({ error: 'Invalid WhatsApp number' }), { status: 400 });
    }

    // Forward the data to Google Apps Script Web App
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxG1JD2KbEeMHPxF2rsW9j4EiXzGUkHXHEhQntl6dAlPXably_iy5CkIaqyVsE7OQs/exec';
    
    // We send the POST request to the Google Script.
    // The Apps Script expects POST requests, typically with JSON body, but we'll mimic what the frontend did.
    // The frontend did: body: JSON.stringify(formData), headers: {'Content-Type': 'text/plain'} (due to no-cors)
    // To match what the script was successfully receiving, we keep it the same:
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script responded with status: ${res.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Booking Submission Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit booking' }), { status: 500 });
  }
}
