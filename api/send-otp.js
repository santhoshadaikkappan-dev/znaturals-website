export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const apiKey = process.env.FAST2SMS_API_KEY || "JoG25643Fd6u3RRSdQUYtFDO2ZjNfHiGHQrEjjJQw1o3EsLknJCWUpTvkSRGpkorwwjX9uOOpibQYcOL";

    const fast2smsRes = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route: "otp",
        variables_values: String(otp),
        numbers: cleanPhone
      })
    });

    const data = await fast2smsRes.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Fast2SMS API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch SMS' });
  }
}
