/**
 * Browser Geolocation & Reverse-Geocoding Utility
 * Resolves GPS coordinates to Postal Code, City, and State.
 */

export interface DetectedLocation {
  pincode: string;
  city: string;
  state: string;
  district?: string;
  formattedAddress?: string;
  latitude: number;
  longitude: number;
}

export const requestBrowserGeolocation = async (): Promise<DetectedLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 1. Attempt high-speed reverse-geocoding via BigDataCloud client API (CORS friendly, no key needed)
          const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const response = await fetch(bdcUrl);
          
          if (response.ok) {
            const data = await response.json();
            let pincode = data.postcode || (data.localityInfo?.administrative?.find((a: any) => /^\d{6}$/.test(a.name))?.name) || '';
            let city = data.city || data.locality || data.principalSubdivision || 'Karaikudi';
            let state = data.principalSubdivision || 'Tamil Nadu';

            pincode = pincode.replace(/\D/g, '').slice(0, 6);

            // Enrich with India Post Official Pincode API if 6-digit pin is found
            if (pincode.length === 6) {
              try {
                const postRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                if (postRes.ok) {
                  const postData = await postRes.json();
                  if (postData?.[0]?.Status === 'Success' && postData[0].PostOffice?.length > 0) {
                    const po = postData[0].PostOffice[0];
                    city = po.District || po.Block || po.Name || city;
                    state = po.State || state;
                  }
                }
              } catch (e) {
                // Ignore fallback to BDC data
              }
            }

            resolve({
              pincode,
              city,
              state,
              district: data.locality,
              formattedAddress: `${city}, ${state}`,
              latitude,
              longitude,
            });
            return;
          }

          // 2. Fallback to OpenStreetMap Nominatim
          const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
          const osmRes = await fetch(osmUrl, {
            headers: { 'Accept': 'application/json' }
          });

          if (osmRes.ok) {
            const osmData = await osmRes.json();
            const address = osmData.address || {};
            let pincode = (address.postcode || '').replace(/\D/g, '').slice(0, 6);
            let city = address.city || address.town || address.village || address.suburb || address.state_district || 'Karaikudi';
            let state = address.state || 'Tamil Nadu';

            if (pincode.length === 6) {
              try {
                const postRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                if (postRes.ok) {
                  const postData = await postRes.json();
                  if (postData?.[0]?.Status === 'Success' && postData[0].PostOffice?.length > 0) {
                    const po = postData[0].PostOffice[0];
                    city = po.District || po.Block || po.Name || city;
                    state = po.State || state;
                  }
                }
              } catch (e) {
                // Ignore fallback
              }
            }

            resolve({
              pincode,
              city,
              state,
              district: address.state_district,
              formattedAddress: osmData.display_name,
              latitude,
              longitude,
            });
            return;
          }

          // If reverse geocoding returns no response, provide coordinates with fallback
          resolve({
            pincode: '630001',
            city: 'Karaikudi',
            state: 'Tamil Nadu',
            latitude,
            longitude,
          });
        } catch (err) {
          // Network failure or CORS block fallback
          resolve({
            pincode: '630001',
            city: 'Karaikudi',
            state: 'Tamil Nadu',
            latitude,
            longitude,
          });
        }
      },
      (error) => {
        let msg = "Could not fetch GPS location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "Location permission was denied. Please enter your Pincode manually.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Location position is currently unavailable.";
            break;
          case error.TIMEOUT:
            msg = "Location request timed out. Please enter your Pincode manually.";
            break;
        }
        reject(new Error(msg));
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  });
};

export const detectCurrentLocation = requestBrowserGeolocation;
