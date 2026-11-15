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
          // Attempt high-speed reverse-geocoding via BigDataCloud client API (CORS friendly, no key needed)
          const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const response = await fetch(bdcUrl);
          
          if (response.ok) {
            const data = await response.json();
            const pincode = data.postcode || (data.localityInfo?.administrative?.find((a: any) => /^\d{6}$/.test(a.name))?.name) || '';
            const city = data.city || data.locality || data.principalSubdivision || 'Karaikudi';
            const state = data.principalSubdivision || 'Tamil Nadu';

            resolve({
              pincode: pincode.replace(/\D/g, '').slice(0, 6),
              city,
              state,
              district: data.locality,
              formattedAddress: `${city}, ${state}`,
              latitude,
              longitude,
            });
            return;
          }

          // Fallback to OpenStreetMap Nominatim
          const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
          const osmRes = await fetch(osmUrl, {
            headers: { 'Accept': 'application/json' }
          });

          if (osmRes.ok) {
            const osmData = await osmRes.json();
            const address = osmData.address || {};
            const pincode = address.postcode || '';
            const city = address.city || address.town || address.village || address.suburb || 'Karaikudi';
            const state = address.state || 'Tamil Nadu';

            resolve({
              pincode: pincode.replace(/\D/g, '').slice(0, 6),
              city,
              state,
              district: address.state_district,
              formattedAddress: osmData.display_name,
              latitude,
              longitude,
            });
            return;
          }

          // If reverse geocoding returns no response, provide coordinates with default
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
            msg = "Location request timed out.";
            break;
        }
        reject(new Error(msg));
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  });
};

export const detectCurrentLocation = requestBrowserGeolocation;

