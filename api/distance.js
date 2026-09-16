export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { address } = await req.json();
    if (!address) {
      return new Response(JSON.stringify({ error: 'Address is required' }), { status: 400 });
    }

    // Woodstock Hub coordinates
    const baseLat = -33.9267880;
    const baseLon = 18.4553809;
    
    let cleanAddress = address.replace(/\bcbd\b/gi, '').replace(/\bcity bowl\b/gi, '').replace(/,\s*,/g, ',').trim();
    
    // We will attempt multiple queries until Nominatim finds a match.
    // 1. Raw address
    // 2. Raw address + Cape Town
    // 3. Raw address without house number + Cape Town
    // 4. Just the street (removing house number and suburb) + Cape Town
    
    let queries = [
      cleanAddress,
      cleanAddress + ', Cape Town',
    ];

    // Try to remove house numbers (e.g., "1 Parkzicht Close, Uitzicht" -> "Parkzicht Close, Uitzicht")
    const noHouseNumber = cleanAddress.replace(/^\d+\s+/, '');
    if (noHouseNumber !== cleanAddress) {
      queries.push(noHouseNumber + ', Cape Town');
    }

    // If there is a comma, it means they provided "Street, Suburb". Let's try just "Street, Cape Town"
    if (cleanAddress.includes(',')) {
      const streetOnly = cleanAddress.split(',')[0].trim().replace(/^\d+\s+/, '');
      queries.push(streetOnly + ', Cape Town');
    }

    let geocodeData = null;
    let successfulQuery = '';

    for (const query of queries) {
      let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=za&limit=1`;
      let geocodeRes = await fetch(geocodeUrl, { headers: { 'User-Agent': 'SetStudio-Booking-App' } });
      let data = await geocodeRes.json();
      
      if (data && data.length > 0) {
        geocodeData = data;
        successfulQuery = query;
        break;
      }
    }
    
    if (!geocodeData || geocodeData.length === 0) {
      return new Response(JSON.stringify({ error: 'Address not found on map. Please try entering just your street name and suburb.' }), { status: 404 });
    }

    const clientLat = geocodeData[0].lat;
    const clientLon = geocodeData[0].lon;
    const displayName = geocodeData[0].display_name;

    // 2. Calculate driving distance using OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${baseLon},${baseLat};${clientLon},${clientLat}?overview=false`;
    const osrmRes = await fetch(osrmUrl);
    
    if (!osrmRes.ok) {
      throw new Error('Routing failed');
    }

    const osrmData = await osrmRes.json();
    
    if (!osrmData.routes || osrmData.routes.length === 0) {
      return new Response(JSON.stringify({ error: 'Could not calculate driving route to this address.' }), { status: 404 });
    }

    // Distance in km
    const distanceKm = osrmData.routes[0].distance / 1000;
    
    // Calculation: distance * 2 (round trip) * 12 (R12/km)
    // Using Math.ceil to round up to the nearest Rand
    const travelFee = Math.ceil(distanceKm * 2 * 12);

    return new Response(JSON.stringify({ 
      distanceKm: distanceKm.toFixed(1),
      travelFee,
      foundAddress: displayName
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Distance API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to calculate distance' }), { status: 500 });
  }
}
