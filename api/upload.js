export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const data = await req.json();
    
    if (!data.image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey || apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
      return new Response(JSON.stringify({ error: 'ImgBB API key is missing or not configured' }), { status: 500 });
    }

    // Prepare form data for ImgBB
    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('image', data.image); // base64 string without the data URL prefix

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const imgbbData = await res.json();

    if (!res.ok) {
      console.error('ImgBB Error:', imgbbData);
      throw new Error(imgbbData?.error?.message || `ImgBB responded with status: ${res.status}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      url: imgbbData.data.url,
      display_url: imgbbData.data.display_url
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Image Upload Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload image', details: error.message }), { status: 500 });
  }
}
